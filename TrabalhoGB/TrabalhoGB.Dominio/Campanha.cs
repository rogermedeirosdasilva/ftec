//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TrabalhoGB.Dominio
{
    using System;
    using System.Collections.Generic;
    
    public partial class Campanha
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Campanha()
        {
            this.Doacao = new HashSet<Doacao>();
        }
    
        public string CodigoCampanha { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public System.DateTime DataInicio { get; set; }
        public System.DateTime DataTermino { get; set; }
        public string CodigoAfinidade { get; set; }
    
        public virtual Afinidade Afinidade { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Doacao> Doacao { get; set; }
    }
}
