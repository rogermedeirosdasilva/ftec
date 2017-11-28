using System.Web.Mvc;

namespace TrabalhoGB.Controllers
{
    public class HomeController : GBBaseController
    {
        [Authorize]
        public ActionResult Index()
        {
            ViewBag.Title = "Dashboard";

            CarregaUsuario();

            return View();
        }
    }
}