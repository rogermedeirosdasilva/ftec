using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio.Negocio;

namespace TrabalhoGB.Controllers
{
    public class InteresseController : GBBaseController
    {
        [Authorize]
        public ActionResult Index()
        {
            CarregaUsuario();

            var lista = new DoacaoNegocio().PegaInseridas();

            return View(lista);
        }
    }
}