$("#ms-bt-login").click(function () {
    if ($('form').parsley().validate()) {
        MSLogin($("#email").val(), $("#senha").val(), $("#ms-cb-manterconectado").is(":checked"), $("#ms-returnurl").val());
    }
});

/**tela de redefinir senha, enviar email**/
$("#ms-bt-confirmar-envia").click(function() {
	MSEnviaEmailSenha();
});

/**tela de redefinir senha,confirmar alteracao**/
$("#ms-bt-senha").click(function () {
	MSRedefinirSenha();
});

MSLogin = function (Email, Senha, manterConectado, ReturnUrl) {
    $.ajax({
        type: 'post',
        url: '/Pessoa/DoLogin',
        data: { Email: Email, Senha: Senha, manterConectado: manterConectado },
        beforeSend: function () {
            MSConfirmaForm($("#ms-bt-login"), false);
        },
        complete: function () {
            MSConfirmaForm($("#ms-bt-login"), true);
        },
        success: function (data) {
            console.log(data);
            if (data.situacao == false) {
                MSAlerta("warning", "Atenção!", data.mensagem, $("#ms-alerta"));
            } else {
                if (ReturnUrl === "")
                    window.location = "/";
                else
                    window.location = ReturnUrl;
            }
        }
    });
};

MSConfirmaForm = function (componente, habilita) {
    if (habilita) {
        componente.attr("disabled", false);
        componente.css("cursor", "pointer");
    } else {
        componente.closest("body").find("#ms-alerta").empty();
        componente.attr("disabled", true);
        componente.css("cursor", "wait");
    }
};

MSEnviaEmailSenha = function () {
	var linkenviarnovamente = "<a href='javascript:' onClick='MSEnviaEmailSenha();'>aqui</a>";
	if ($('form').parsley().validate()) {
		$.ajax({
			type: 'post',
			url: '/Usuario/EnviaEmailRedefinirSenha/',
			async: true,
			data: { Email: $("#email").val() },
			beforeSend: function () {
				MSConfirmaForm($("#ms-bt-confirmar-envia"), false);
			},
			complete: function () {
				MSConfirmaForm($("#ms-bt-confirmar-envia"), true);
			},
			success: function (data) {
				if (data.situacao === false) {
					MSAlerta("warning", "Atenção!", data.mensagem, $("#ms-alerta"));
				} else {
					$("#ms-sm-msg-email").html("E-mail enviado com sucesso para <i>" + $("#email").val() + "</i>. Siga as instruções para recuperar sua senha. Clique " + linkenviarnovamente + " para enviar novamente.");
					$("#ms-dv-email").hide();
					$("#ms-dv-msg2-email").hide();
					$("#ms-dv-bt-senha").hide();
				}
			}
		});
	}
};

MSRedefinirSenha = function () {
	if ($('form').parsley().validate()) {
		$.ajax({
			type: 'post',
			url: '/Usuario/RedefinirSenha/',
			async: true,
			beforeSend: function () {
				MSConfirmaForm($("#ms-bt-senha"), false);
			},
			complete: function () {
				MSConfirmaForm($("#ms-bt-senha"), true);
			},
			data: {
				UsuarioID: $("#ms-hd-usuarioid").val(),
				ChaveAtivarSenha: $("#ms-hd-chave").val(),
				Email: $("#ms-hd-email").val(),
				Senha: $("#senha").val()
			},
			success: function (data) {
				if (data.situacao === false) {
					MSAlerta("warning", "Atenção!", data.mensagem, $("#ms-alerta"));
				} else {
					MSLogin($("#email").val(), $("#senha").val(), false, "");
				}
			}
		});
	}
};

MSEnviaEmailRegistro = function () {
	var linkenviarnovamente = "<a href='javascript:' onClick='MSEnviaEmailRegistro();'>aqui</a>";
	$.ajax({
		type: 'post',
		url: '/Registro/DoRegistro/',
		async: true,
		data: $("form").serialize(),
		datatype: 'json',
		beforeSend: function () {
			MSConfirmaForm($("#ms-bt-registro"), false);
		},
		complete: function () {
			MSConfirmaForm($("#ms-bt-registro"), true);
		},
		success: function (data) {
			if (data.situacao === false) {
				MSAlerta("warning", "Atenção!", data.mensagem, $("#ms-alerta"));
			} else {
				$("#ms-sm-msg-email").html("E-mail enviado com sucesso para <i>" + $("#email").val() + "</i>. Siga as instruções para ativar seu registro. Clique " + linkenviarnovamente + " para enviar novamente.");
				$("form").hide();
			}
		}
	});
}

SalvarUsuario = function () {
    if ($('#form').parsley().validate()) {
        $.ajax({
            type: 'post',
            url: '/Usuario/DoSave',
            data: {
                usuarioid: $("#usuarioid").val(),
                nome: $("#nome").val(),
                sigla: $("#sigla").val(),
                email: $("#email").val(),
                situacao: $("#situacao").val(),
                senha : $("#senha").val()
            },
            beforeSend: function () {
            },
            complete: function () {

            },
            success: function (data) {
                if (data.Sucesso = true) {
                    location.href = "/Usuario";
                }
            }
        });
    }
};