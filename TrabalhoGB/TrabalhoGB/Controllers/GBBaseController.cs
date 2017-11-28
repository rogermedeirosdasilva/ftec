using Interacao.Framework.MVC;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrabalhoGB.Dominio.Negocio;
using Interacao.Framework;

namespace TrabalhoGB.Controllers
{
    public class GBBaseController : Controller
    {
        public void CarregaUsuario()
        {
            var codigo = IMHelper.GetCookie(this, "UID");

            var pessoa = new PessoaNegocio().PegaPessoaPorCodigo(codigo);
            ViewBag.emailmd5 = pessoa.Email.GeraMD5().ToLower();
            ViewBag.Usuario = pessoa;
        }
    }
}