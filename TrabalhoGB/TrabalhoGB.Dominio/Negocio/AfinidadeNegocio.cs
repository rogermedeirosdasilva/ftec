using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio.Negocio
{
    public class AfinidadeNegocio
    {
        public List<Afinidade> PegaAfinidades()
        {
            var Dados = Repositorio.PegaInstancia();

            return Dados.Afinidade.OrderBy(o => o.Descricao).ToList();
        }
    }
}
