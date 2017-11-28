using Interacao.Framework.MVC;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using TrabalhoGB.Dominio;
using TrabalhoGB.Dominio.Negocio;

namespace TrabalhoGB.Controllers
{
    public class PessoaController : Controller
    {
        // GET: Voluntario
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ONG()
        {
            return View();
        }

        [HttpPost]
        public JsonResult InsereVoluntario(Pessoa pessoa)
        {
            var core = new PessoaNegocio();
            var resposta = core.InsereVoluntario(pessoa.Nome, pessoa.Email, pessoa.Documento, pessoa.Senha);

            return Json(resposta);
        }

        [HttpPost]
        public JsonResult InsereONG(Pessoa pessoa)
        {
            var core = new PessoaNegocio();
            var resposta = core.InsereONG(pessoa.Nome, pessoa.Email, pessoa.Documento, pessoa.Senha,
                pessoa.Telefone, pessoa.CEP, pessoa.Logradouro, pessoa.Numero, pessoa.Bairro, pessoa.Cidade,
                pessoa.UF);

            return Json(resposta);
        }

        protected void Autentica(string Email, bool manterConectado)
        {
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                    1,
                    "Email",
                    DateTime.Now,
                    DateTime.Now.AddYears(1),
                    manterConectado,
                    Email,
                    FormsAuthentication.FormsCookiePath);

            string hash = FormsAuthentication.Encrypt(ticket);
            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, hash);
            if (ticket.IsPersistent) cookie.Expires = ticket.Expiration;

            Response.Cookies.Add(cookie);
        }

        protected void Logoff()
        {
            try
            {
                FormsAuthentication.SignOut();

                IMHelper.SetaCookie(this, "UID", string.Empty);
            }
            catch
            {
            }
        }

        [HttpPost]
        public JsonResult Logout(string id)
        {
            try
            {
                Logoff();
                return Json(new { situacao = true, mensagem = "FEITO" });
            }
            catch
            {
                return Json(new { situacao = false, mensagem = "FEITO" });
            }
        }

        [HttpGet]
        public ActionResult Logout()
        {
            Logoff();

            return RedirectToAction("Login", "Usuario");
        }

        [HttpPost]
        public JsonResult DoLogin(string Email, string Senha, bool manterConectado)
        {
            var usuario = new PessoaNegocio();
            var resultado = usuario.Autenticacao(Email, Senha);

            if (resultado.Sucesso)
            {
                IMHelper.SetaCookie(this, "UID", ((Pessoa)resultado.New).CodigoPessoa);

                Autentica(Email, manterConectado);
            }

            return Json(new { situacao = resultado.Sucesso, mensagem = resultado.Mensagem });
        }
    }
}