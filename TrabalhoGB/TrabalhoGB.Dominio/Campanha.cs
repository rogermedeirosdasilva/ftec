namespace TrabalhoGB.Dominio
{
    using System;

    public class Campanha
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
        public Afinidade Afinidade { get; set; }
    }
}
