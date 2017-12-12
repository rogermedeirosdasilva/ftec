using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio.Negocio
{
    public class DoacaoNegocio
    {
        public GBResposta InsereDoacao(string doador, string campanha, string texto, decimal quantidade)
        {
            try
            {
                var Dados = Repositorio.PegaInstancia();
                var doacao = Dados.Doacao.Create();
                doacao.CodigoCampanha = campanha;
                doacao.CodigoDoacao = Guid.NewGuid().ToString();
                doacao.CodigoPessoa = doador;
                doacao.Descricao = texto;
                doacao.Quantidade = quantidade;
                doacao.Situacao = ((int)ESituacaoDoacao.INSERIDA).ToString();

                Dados.Doacao.Add(doacao);
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

        public List<Doacao> PegaInseridas()
        {
            var Dados = Repositorio.PegaInstancia();
            var inseridas = ((int)ESituacaoDoacao.INSERIDA).ToString();

            return Dados.Doacao.Where(w => w.Situacao.Equals(inseridas))
                .OrderBy(o => o.Descricao).ToList();
        }
    }
}
