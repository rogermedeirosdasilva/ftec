﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TrabalhoGB.Controllers
{
    public class VoluntarioController : GBBaseController
    {
        // GET: Voluntario
        public ActionResult Index()
        {
            CarregaUsuario();

            return View();
        }

        public ActionResult Afinidades()
        {
            return View();
        }

        public ActionResult Campanhas()
        {
            return View();
        }

        public ActionResult Doacao()
        {
            return View();
        }
    }
}