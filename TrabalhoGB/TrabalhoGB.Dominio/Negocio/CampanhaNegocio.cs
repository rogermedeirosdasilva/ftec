namespace TrabalhoGB.Dominio.Negocio
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class CampanhaNegocio
    {
        public List<MinhasCampanhas> PegaMinhasCampanhas(string codigo)
        {
            var Dados = Repositorio.PegaInstancia();

            return Dados.MinhasCampanhas.Where(w => w.CodigoPessoa.Equals(codigo))
                .OrderBy(o => o.Nome)
                .ToList();
        }

        public List<Campanha> PegaCampanhasONG()
        {
            var Dados = Repositorio.PegaInstancia();
            return Dados.Campanha.ToList();
        }

        public GBResposta InsereCampanha(string nome, string descricao,
            DateTime inicio, DateTime termino, string afinidade)
        {
            try
            {
                var Dados = Repositorio.PegaInstancia();
                var objeto = Dados.Campanha.Create();
                objeto.CodigoCampanha = Guid.NewGuid().ToString();
                objeto.Nome = nome;
                objeto.Descricao = descricao;
                objeto.DataInicio = inicio;
                objeto.DataTermino = termino;
                objeto.CodigoAfinidade = afinidade;

                Dados.Campanha.Add(objeto);
                Dados.SaveChanges();

                return new GBResposta
                {
                    Sucesso = true,
                    Mensagem = "FEITO"
                };
            }
            catch (Exception ex)
            {
                return new GBResposta
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }

        public GBResposta SalvaCampanha(string codigo, string nome, string descricao,
            DateTime inicio, DateTime termino, string afinidade)
        {
            try
            {
                var Dados = Repositorio.PegaInstancia();
                var objeto = Dados.Campanha.Where(w => w.CodigoCampanha.Equals(codigo)).FirstOrDefault();
                objeto.Nome = nome;
                objeto.Descricao = descricao;
                objeto.DataInicio = inicio;
                objeto.DataTermino = termino;
                objeto.CodigoAfinidade = afinidade;

                Dados.SaveChanges();

                return new GBResposta
                {
                    Sucesso = true,
                    Mensagem = "FEITO"
                };
            }
            catch (Exception ex)
            {
                return new GBResposta
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }

        public Campanha PegaCampanhaPorCodigo(string codigo)
        {
            var Dados = Repositorio.PegaInstancia();

            return Dados.Campanha.Where(w => w.CodigoCampanha.Equals(codigo)).FirstOrDefault();
        }
    }
}
