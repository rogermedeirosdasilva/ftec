using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio
{
    public class GBResposta
    {
        public bool Sucesso { get; set; }
        public string Mensagem { get; set; }
        public object New { get; set; }
        public object Old { get; set; }
    }
}
