using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio
{
    public interface IPessoa
    {
        string Codigo { get; set; }
        string Nome { get; set; }
        string Documento { get; set; }
        string Telefone { get; set; }
        Endereco Endereco { get; set; }

        ETipoPessoa TipoPessoa { get; set; }      
    }
}
