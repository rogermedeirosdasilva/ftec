using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrabalhoGB.Dominio
{
    public static class Repositorio
    {
        private static DBContext repositorio;

        public static DBContext PegaInstancia()
        {
            if (repositorio == null)
            {
                repositorio = PegaNovaInstancia();
            }

            return repositorio;
        }

        public static DBContext PegaNovaInstancia()
        {
            return new DBContext();
        }
    }
}
