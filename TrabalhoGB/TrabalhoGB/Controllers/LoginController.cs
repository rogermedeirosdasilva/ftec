using Interacao.Framework.MVC;
using System.Web.Mvc;

namespace TrabalhoGB.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index(string ReturnUrl)
        {
            if (System.Web.HttpContext.Current.User.Identity.IsAuthenticated && !string.IsNullOrEmpty(IMHelper.GetCookie(this, "UID")))
                return RedirectToAction("Index", "Home");

            ViewBag.ReturnUrl = ReturnUrl;

            return View();
        }
    }
}