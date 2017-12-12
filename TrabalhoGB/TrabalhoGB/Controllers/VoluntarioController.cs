using Interacao.Framework.MVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio.Negocio;
using TrabalhoGB.Dominio;

namespace TrabalhoGB.Controllers
{
    public class VoluntarioController : GBBaseController
    {
        [Authorize]
        // GET: Voluntario
        public ActionResult Index()
        {
            CarregaUsuario();

            return View();
        }

        [Authorize]
        public ActionResult Afinidades()
        {
            CarregaUsuario();

            var dados = new PessoaNegocio().MinhasAfinidades(IMHelper.GetCookie(this, "UID"));

            return View(dados);
        }

        [Authorize]
        public ActionResult Campanhas()
        {
            CarregaUsuario();

            return View();
        }

        [Authorize]
        public ActionResult Doacao()
        {
            CarregaUsuario();

            return View();
        }

        [HttpPost]
        [Authorize]
        public JsonResult AtualizaAfinidade(string afinidade, string selecionado)
        {
            new PessoaNegocio().AtualizaAfinidade(IMHelper.GetCookie(this, "UID"), afinidade, selecionado.Equals("S"));

            return Json(new { ok = true });
        }

        [Authorize]
        [HttpPost]
        public JsonResult InsereDoacao(Doacao doacao)
        {
            return Json(new DoacaoNegocio().InsereDoacao(
                IMHelper.GetCookie(this, "UID"),
                doacao.CodigoCampanha,
                doacao.Descricao,
                doacao.Quantidade
            )
            );
        }
    }
}