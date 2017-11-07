using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio;

namespace TrabalhoGB.Controllers
{
    public class CampanhaController : Controller
    {
        // GET: Campanha
        public ActionResult Index()
        {
            var fakeData = new List<Campanha>();

            return View(fakeData);
        }

        public ActionResult New()
        {
            return View();
        }
    }
}