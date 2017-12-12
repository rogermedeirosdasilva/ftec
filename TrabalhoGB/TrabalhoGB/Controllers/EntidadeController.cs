using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio.Negocio;

namespace TrabalhoGB.Controllers
{
    public class EntidadeController : GBBaseController
    {
        [Authorize]
        public ActionResult Index()
        {
            CarregaUsuario();

            var lista = new PessoaNegocio().PegaEntidadesAprovadas();

            return View(lista);
        }

        [Authorize]
        public ActionResult Aprovar()
        {
            CarregaUsuario();

            var lista = new PessoaNegocio().PegasEntidadesNaoAprovadas();

            return View(lista);
        }

        [Authorize]
        [HttpPost]
        public JsonResult AprovaEntidade(string id)
        {
            return Json(new PessoaNegocio().AprovaONG(id));            
        }
    }
}