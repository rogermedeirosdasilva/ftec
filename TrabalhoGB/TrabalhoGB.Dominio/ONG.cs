namespace TrabalhoGB.Dominio
{
    using System.ComponentModel.DataAnnotations;

    public class ONG : IPessoa
    {
        [Required]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "Nome deve ser preenchido.")]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Required(ErrorMessage = "CPF deve ser preenchido.")]
        [MaxLength(11)]
        public string Documento { get; set; }

        [Required(ErrorMessage = "E-mail deve ser preenchido.")]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha deve ser preenchida.")]
        [MaxLength(15)]
        public string Senha { get; set; }

        public string Telefone { get; set; }

        public Endereco Endereco { get; set; }

        public ETipoPessoa TipoPessoa { get; set; }
    }
}
