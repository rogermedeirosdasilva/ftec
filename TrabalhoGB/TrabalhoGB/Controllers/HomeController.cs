using System.Web.Mvc;

namespace TrabalhoGB.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Dashboard";

            return View();
        }
    }
}
