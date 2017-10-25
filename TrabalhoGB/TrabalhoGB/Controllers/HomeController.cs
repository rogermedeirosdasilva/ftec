using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio;

namespace TrabalhoGB.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Teste()
        {
            var pessoa = new Pessoa();

            return View(pessoa);
        }


    }
}
