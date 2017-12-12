using Interacao.Framework.MVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio;
using TrabalhoGB.Dominio.Negocio;

namespace TrabalhoGB.Controllers
{
    public class CampanhaController : GBBaseController
    {
        [Authorize]
        public ActionResult Index()
        {
            CarregaUsuario();

            var dados = new CampanhaNegocio().PegaCampanhasONG();

            return View(dados);
        }

        [Authorize]
        public ActionResult New()
        {
            CarregaUsuario();

            return View();
        }

        [Authorize]
        public ActionResult Edit(string id)
        {
            CarregaUsuario();

            var dados = new CampanhaNegocio().PegaCampanhaPorCodigo(id);

            return View(dados);
        }

        [HttpPost]
        public JsonResult ComboCampanha()
        {
            var lista = new CampanhaNegocio().PegaMinhasCampanhas(IMHelper.GetCookie(this, "UID"));

            return Json(lista);
        }

        [HttpPost]
        public JsonResult ComboAfinidade()
        {
            var lista = new AfinidadeNegocio().PegaAfinidades()
                .Select(s => new
                {
                    s.CodigoAfinidade,
                    s.Nome
                }).ToList();

            return Json(lista);
        }


        [Authorize]
        [HttpPost]
        public JsonResult InsereCampanha(Campanha c)
        {
            return Json(new CampanhaNegocio().InsereCampanha(
                    c.Nome,
                    c.Descricao,
                    c.DataInicio,
                    c.DataTermino,
                    c.CodigoAfinidade
                )
            );
        }

        [Authorize]
        [HttpPost]
        public JsonResult SalvaCampanha(Campanha c)
        {
            return Json(new CampanhaNegocio().SalvaCampanha(
                    c.CodigoCampanha,
                    c.Nome,
                    c.Descricao,
                    c.DataInicio,
                    c.DataTermino,
                    c.CodigoAfinidade
                )
            );
        }
    }
}