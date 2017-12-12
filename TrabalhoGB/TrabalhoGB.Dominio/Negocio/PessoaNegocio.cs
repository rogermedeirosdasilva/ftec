namespace TrabalhoGB.Dominio.Negocio
{
    using System;
    using Interacao.Framework;
    using System.Linq;
    using System.Collections.Generic;
    using System.Data.Entity.Validation;

    public class PessoaNegocio
    {
        private const string ChaveSecreta = "VOL*2017@";

        private bool ExisteEmail(string email)
        {
            var Dados = Repositorio.PegaInstancia();
            var obj = Dados.Pessoa.Where(w => w.Email.Equals(email)).FirstOrDefault();

            return obj != null;
        }

        private bool ExisteDocumento(string doc)
        {
            var Dados = Repositorio.PegaInstancia();
            var obj = Dados.Pessoa.Where(w => w.Documento.Equals(doc)).FirstOrDefault();

            return obj != null;
        }

        public Pessoa PegaPessoaPorCodigo(string codigo)
        {
            var Dados = Repositorio.PegaInstancia();

            return Dados.Pessoa.Where(w => w.CodigoPessoa.Equals(codigo)).FirstOrDefault();
        }

        public GBResposta InsereVoluntario(string nome, string email, string cpf, string senha)
        {
            var Dados = Repositorio.PegaInstancia();
            Pessoa obj = Dados.Pessoa.Create();
            obj.CodigoPessoa = Guid.NewGuid().ToString();
            obj.Nome = nome.Trim();
            obj.Email = email.ToLower().Trim();
            obj.Documento = cpf.Trim().RemoveMascaraCNPJCPF();
            obj.Senha = senha.GeraSHA1(ChaveSecreta);
            obj.Tipo = (int)ETipoPessoa.VOLUNTARIO;
            obj.Aprovado = "S";

            var resposta = InserePessoa(obj, Dados);

            return resposta;
        }

        private GBResposta InserePessoa(Pessoa obj, DBContext Dados)
        {
            if (!string.IsNullOrEmpty(obj.Documento) && ExisteDocumento(obj.Documento))
            {
                return new GBResposta()
                {
                    Sucesso = false,
                    Mensagem = "Já existe um cadastro com este documento."
                };
            }

            if (!string.IsNullOrEmpty(obj.Email) && ExisteEmail(obj.Email))
            {
                return new GBResposta()
                {
                    Sucesso = false,
                    Mensagem = "Já existe um cadastro com este E-mail."
                };
            }

            GBResposta resposta = new GBResposta()
            {
                Sucesso = true,
                Mensagem = "FEITO",
                Old = obj,
                New = Dados.Pessoa.Add(obj)
            };

            try
            { 
                Dados.SaveChanges();
            }
            catch(DbEntityValidationException ex)
            {
                resposta.Mensagem = ex.Message;
            }

            return resposta;
        }

        public GBResposta InsereONG(
            string nome, 
            string email, 
            string documento, 
            string senha, 
            string telefone, 
            string cep, 
            string rua,
            string numero, 
            string bairro, 
            string cidade,
            string uf)
        {
            var Dados = Repositorio.PegaInstancia();
            Pessoa obj = Dados.Pessoa.Create();
            obj.CodigoPessoa = Guid.NewGuid().ToString();
            obj.Nome = nome.Trim();
            obj.Email = email.ToLower().Trim();
            obj.Documento = documento.Trim().RemoveMascaraCNPJCPF();
            obj.Senha = senha.GeraSHA1(ChaveSecreta);
            obj.Tipo = (int)ETipoPessoa.ONG;
            obj.CEP = cep;
            obj.Telefone = telefone;
            obj.Logradouro = rua;
            obj.Cidade = cidade;
            obj.Bairro = bairro;
            obj.UF = uf;
            obj.Aprovado = "N";

            var resposta = InserePessoa(obj, Dados);

            return resposta;
        }

        public GBResposta Autenticacao(string email, string senha)
        {
            var Dados = Repositorio.PegaInstancia();

            Pessoa pessoa = Dados.Pessoa.Where(w => w.Email.Equals(email)).FirstOrDefault();
            if (pessoa == null)
            {
                return new GBResposta()
                {
                    Sucesso = false,
                    Mensagem = "Usuário não encontrado."
                };
            }

            if (!pessoa.Aprovado.Equals("S"))
            {
                return new GBResposta()
                {
                    Sucesso = false,
                    Mensagem = "Cadastro em avaliação. Aguarde e-mail de confirmação."
                };
            }

            if (!pessoa.Senha.Equals(senha.GeraSHA1(ChaveSecreta)))
            {
                return new GBResposta()
                {
                    Sucesso = false,
                    Mensagem = "Senha inválida."
                };
            }

            return new GBResposta()
            {
                Sucesso = true,
                Mensagem = "FEITO",
                New = pessoa
            };
        }

        public List<Pessoa> ListaONGPendentes()
        {
            var Dados = Repositorio.PegaInstancia();
            int tipo = (int)ETipoPessoa.ONG;

            return Dados.Pessoa.Where(w => w.Tipo.Equals(tipo) && w.Aprovado.Equals("N")).ToList();
        }

        public List<MinhasAfinidades> MinhasAfinidades(string codigo)
        {
            var Dados = Repositorio.PegaInstancia();
            var afinidades = Afinidades();

            var retorno = new List<MinhasAfinidades>();

            var minhas = Dados.Pessoa.Where(w => w.CodigoPessoa.Equals(codigo))
                .SingleOrDefault()
                .Afinidade
                .ToList();

            foreach(var afinidade in afinidades)
            {
                var m = new MinhasAfinidades
                {
                    Descricao = afinidade.Descricao,
                    Nome = afinidade.Nome,
                    CodigoAfinidade = afinidade.CodigoAfinidade,
                    Selecionada = (minhas.Where(w => w.CodigoAfinidade.Equals(afinidade.CodigoAfinidade)).Count() > 0)
                };

                retorno.Add(m);
            }

            return retorno;
        }

        public void AtualizaAfinidade(string codigo, string afinidade, bool selecionado)
        {
            var Dados = Repositorio.PegaInstancia();
            try
            {
                var voluntario = Dados.Pessoa.Where(w => w.CodigoPessoa.Equals(codigo)).FirstOrDefault();
                var objeto = voluntario.Afinidade.Where(w => w.CodigoAfinidade.Equals(afinidade)).FirstOrDefault();
                    
                if (objeto != null)
                {
                    voluntario.Afinidade.Remove(objeto);
                }

                if (selecionado)
                {
                    objeto = Dados.Afinidade.Where(w => w.CodigoAfinidade.Equals(afinidade)).FirstOrDefault();
                    voluntario.Afinidade.Add(objeto);
                }

                Dados.SaveChanges();
            }
            finally
            {
            }
        }

        public List<Afinidade> Afinidades()
        {
            var Dados = Repositorio.PegaInstancia();

            return Dados.Afinidade
                .ToList();
        }

        public List<Pessoa> PegaEntidadesAprovadas()
        {
            var Dados = Repositorio.PegaInstancia();

            var tipo = (int)ETipoPessoa.ONG;

            return Dados.Pessoa.Where(w => w.Tipo.Equals(tipo) && w.Aprovado.Equals("S"))
                .OrderBy(o => o.Nome)
                .ToList();
        }

        public List<Pessoa> PegasEntidadesNaoAprovadas()
        {
            var Dados = Repositorio.PegaInstancia();

            var tipo = (int)ETipoPessoa.ONG;

            return Dados.Pessoa.Where(w => w.Tipo.Equals(tipo) && !w.Aprovado.Equals("S"))
                .OrderBy(o => o.Nome)
                .ToList();
        }

        public GBResposta AprovaONG(string id)
        {
            var Dados = Repositorio.PegaInstancia();
            var obj = Dados.Pessoa.Where(w => w.CodigoPessoa.Equals(id)).SingleOrDefault();

            if (obj == null)
            {
                throw new Exception("ONG não encontrada.");
            }

            obj.Aprovado = "S";

            Dados.SaveChanges();

            return new GBResposta()
            {
                Sucesso = true,
                Mensagem = "FEITO"
            };

        }
    }
}
