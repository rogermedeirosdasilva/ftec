using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio
{
    public class Pessoa
    {
        [Required]
        public string Codigo { get; set; }
        [Required(ErrorMessage = "Campo Obrigatório")]
        [MaxLength(100)]
        public string Nome { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
