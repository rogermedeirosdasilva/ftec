/// <reference path="D:\Projetos\Qualidade\Qualidade.WebApp\assets/plugins/jquery/jquery-1.9.1.js" />
var MSData = [];
var bar1 = null;
var textbar2 = null;
var bar2 = null;

MSAlerta = function (tipo, titulo, texto, area) {
    var html =
        "<div class='alert alert-" + tipo + " alert-dismissible' role='alert'>" +
        "   <strong>" + titulo + "</strong> " + texto +
        "</div>";
    area.html(html);
};

var IMTreeDefault = function () {
    $('#jstree-default').jstree({
        "core": {
            "themes": {
                "responsive": true
            }
        },
        "types": {
            "default": {
                "icon": "fa fa-folder text-warning fa-lg"
            },
            "file": {
                "icon": "fa fa-file text-inverse fa-lg"
            }
        },
        "plugins": ["types"]
    });

    $('#jstree-default').on('select_node.jstree', function (e, data) {
        var link = $('#' + data.selected).find('a');
        if (link.attr("href") != "#" && link.attr("href") != "javascript:;" && link.attr("href") != "") {
            if (link.attr("target") == "_blank") {
                link.attr("href").target = "_blank";
            }
            document.location.href = link.attr("href");
            return false;
        }
    });
};

StatusRelatorio = function (c, t) {
    $("#db-status").removeClass("label-success").removeClass("label-warning").removeClass("label-info").removeClass("label-danger");
    $("#db-status").addClass("label-" + c).text(t);
};

$("#ms-logout").click(function () {
    $.ajax({
        type: 'post',
        url: '/Pessoa/Logout/',
        async: false,
        success: function (data) {
            if (data.situacao === true) {
                window.location = "/Login";
            }
        }
    });
});

SalvarRegistro = function (cController) {
    if ($('#form').parsley().validate()) {
        $.ajax({
            type: 'post',
            url: '/' + cController + '/DoSave',
            data: $("#form").serialize(),
            beforeSend: function () {
            	$("#ms-alerta").empty();
            	Carregando(true);
            },
            complete: function () {
            	Carregando(false);
            },
            success: function (data) {
                if (data.Sucesso == true) {
                    location.href = "/" + cController;
                } else {
                    alert(data.Mensagem);
                	MSAlerta("danger", "Atenção!", data.Mensagem, $("#ms-alerta"));
                }
            }
        });
    }
};

ExcluiRegistro = function (cController) {
    if (!confirm("Confirma a Exclusão da Ficha?")) {
        return;
    }

    if ($('#form').parsley().validate()) {
        $.ajax({
            type: 'post',
            url: '/' + cController + '/DoDelete',
            data: $("#form").serialize(),
            beforeSend: function () {
                $("#ms-alerta").empty();
                Carregando(true);
            },
            complete: function () {
                Carregando(false);
            },
            success: function (data) {
                if (data.Sucesso == true) {
                    location.href = "/" + cController;
                } else {
                    MSAlerta("danger", "Atenção!", data.Mensagem, $("#ms-alerta"));
                }
            }
        });
    }
};

SalvarRegistroEditar = function (cController) {
	if ($('#form').parsley().validate()) {
		$.ajax({
			type: 'post',
			url: '/' + cController + '/DoSave',
			data: $("#form").serialize(),
			beforeSend: function () {
				$("#ms-alerta").empty();
				Carregando(true);
			},
			complete: function () {
				Carregando(false);
			},
			success: function (data) {
				if (data.Sucesso == true) {
					location.href = "/" + cController + "/Edit/" + data.Id;		
				} else {
					MSAlerta("danger", "Atenção!", data.Mensagem, $("#ms-alerta"));
				}
			}
		});
	}
};

SalvarFichaTecnica = function (cController) {
	if ($('#form').parsley().validate()) {
		$.ajax({
			type: 'post',
			url: '/' + cController + '/DoSave',
			data: $("#form").serialize(),
			beforeSend: function () {
				Carregando(true);
			},
			complete: function () {
				Carregando(false);
			},
			success: function (data) {
				if (data.Sucesso == true) {
					location.href = "/" + cController + "/Edit/" + data.Id;
				}
			}
		});
	}
};

SalvarFichaTecnicaDetalhe = function (cController) {
	if ($('#form2').parsley().validate()) {

		$.ajax({
			type: 'post',
			url: '/FichaTecnica/AddMaterial',
			data: {
                fichaid: $("#ID").val(),
				materialid: $("#MaterialID").val(),
				observacao: $("#Observacao2").val()
			},
			beforeSend: function () {
				Carregando(true);
			},
			complete: function () {
				Carregando(false);
			},
			success: function (data) {
				if (data.Sucesso == true) {
					$("#add-material").modal('hide');
					location.reload();
				}
			}
		});
	}
};

SalvarItemPedido = function (cController) {
	if ($('#form2').parsley().validate()) {
        var grade = "";

        BuscaAjusteGrade($("#fichatecnica\\.ID").val());

		for (var i = 1; i < 15; i++) {
			grade += $("#GM_" + i).val() + "@";
			grade += $("#GP_" + i).val() + "@";
			grade += $("#GQ_" + i).val() + "@";
			grade += "|";
		}

		$("#Grade").val(grade);
		var dado = $("#form2").serialize();
		dado += "&PedidoID=" + $("#ID").val();

		$.ajax({
			type: 'post',
			url: '/Pedido/AddItem',
			data: dado,
			beforeSend: function () {
				Carregando(true);
			},
			complete: function () {
				Carregando(false);
			},
			success: function (data) {
				if (data.Sucesso == true) {
					$("#add-material").modal('hide');
					location.reload();
				}
			}
		});
	}
};

RemoveFichaTecnicaDetalhe = function (Id) {
	$.ajax({
		type: 'post',
		url: '/FichaTecnica/RemoveMaterial',
		data: {
			fichaid: Id
		},
		beforeSend: function () {
		},
		complete: function () {

		},
		success: function (data) {
			if (data.Sucesso == true) {
				$("#ID_" + Id).fadeOut();
			}
		}
	});
};

RemovePedidoItem = function (Id) {
	$.ajax({
		type: 'post',
		url: '/Pedido/RemoveItem',
		data: {
			fichaid: Id
		},
		beforeSend: function () {
		},
		complete: function () {

		},
		success: function (data) {
			if (data.Sucesso == true) {
				$("#ID_" + Id).fadeOut();
			}
		}
	});
};

RemoveFoto = function (Id) {
	$.ajax({
		type: 'post',
		url: '/Util/ApagaFoto',
		data: {
			ID: Id
		},
		beforeSend: function () {
		},
		complete: function () {

		},
		success: function (data) {
			$("#ID_" + Id).fadeOut();
		}
	});
};

getCEP = function (cep, callback) {
    var result;

    $.ajax({
        type: 'post',
        url: '/Util/getCEP',
        async: false,
        data: { cep: cep },
        beforeSend: function () {
            MSCarregando(true);
        },
        complete: callback,
        success: function (data) {
            MSCarregando(false);
            if (data.situacao === false) {
                MSAlerta("warning", "Atenção!", "CEP inválido ou Serviço indisponível. Verifique o CEP informado e Tente Novamente.", $("#ms-alerta"));
                result = null;
            } else {
                result = data;
            }

            MSData = result;
        }
    });

    return result;
}

MSCarregando = function (state) {
    if (state) {
        $("#page-loader").show();
        $("#ms-alerta").hide();
        Carregando(true);
    } else {
    	$("#page-loader").hide();
    	Carregando(false);
    }
};

BindComboModelo = function (obj) {
	$(obj).selectize({
		valueField: 'ModeloID',
		labelField: 'Descricao',
		searchField: 'Descricao',
		options: [],
		create: false,
		render: {
			option: function (item, escape) {
				return '<div class="tabPesquisa">' +
						'<div class="popTitle">' +
						'<span>' + escape(item.Descricao) + '</span>' +
						'</div>' +
						'<div><strong>Fábrica: </strong>' + escape(item.RazaoSocial) + '</div>' +
						'</div>';
			}
		},
		load: function (query, callback) {
			if (!query.length) return callback();
			$.ajax({
				url: '/Modelo/Filtro',
				type: 'POST',
				dataType: 'JSON',
				data: {
					q: query,
					page_limit: 10
				},
				error: function (e) {
					if (e.status == 200) {
						callback(JSON.parse(e.responseText));
					} else {
						callback();
					}
				},
				success: function (res) {
					callback(res.pessoas);
				}
			});
		}
	});
}

BindComboMaterial = function (obj) {
	$(obj).selectize({
		valueField: 'MaterialID',
		labelField: 'Descricao',
		searchField: 'Descricao',
		options: [],
		create: false,
		render: {
			option: function (item, escape) {
				return '<div class="tabPesquisa">' +
						'<div class="popTitle">' +
						'<span>' + escape(item.Descricao) + '</span>' +
						'</div>' +
						'<div><strong>Tipo: </strong>' + escape(item.Tipo) + '</div>' +
						'</div>';
			}
		},
		load: function (query, callback) {
			if (!query.length) return callback();
			$.ajax({
				url: '/Material/Filtro',
				type: 'POST',
				dataType: 'JSON',
				data: {
					q: query,
					page_limit: 10
				},
				error: function (e) {
					if (e.status == 200) {
						callback(JSON.parse(e.responseText));
					} else {
						callback();
					}
				},
				success: function (res) {
					callback(res.pessoas);
				}
			});
		}
	});
};

BindComboFichaTecnica = function (obj) {
	$(obj).selectize({
		valueField: 'ID',
        labelField: 'Descricao',
		searchField: ['Descricao', 'Cor', 'ModeloID'],
		options: [],
		create: false,
		render: {
			option: function (item, escape) {
				return '<div class="tabPesquisa">' +
						'<div class="popTitle">' +
						'<span>' + escape(item.Descricao) + '</span>' +
						'</div>' +
						'<div><strong>Cor: </strong>' + escape(item.Cor) + '</div>' +
						'</div>';
			}
		},
		load: function (query, callback) {
			if (!query.length) return callback();
			$.ajax({
				url: '/FichaTecnica/Filtro',
				type: 'POST',
				dataType: 'JSON',
				data: {
					q: query,
					page_limit: 10
				},
				error: function (e) {
					if (e.status == 200) {
						callback(JSON.parse(e.responseText));
					} else {
						callback();
					}
				},
				success: function (res) {
					callback(res.ft);
				}
			});
		}
	});
}

BindComboPessoa = function (obj) {
	$(obj).selectize({
		valueField: 'PessoaID',
		labelField: 'RazaoSocial',
		searchField: 'RazaoSocial',
		options: [],
		create: false,
		render: {
			option: function (item, escape) {
				var html = '<div class="tabPesquisa">' +
					'<div class="popTitle">' +
						'<span>Razão Social: ' + escape(item.RazaoSocial) + '</span>' +
						'</div>';

				if (item.Fantasia != undefined) {
					html += '<div><strong>Fantasia: </strong>' + escape(item.Fantasia) + '</div>';
				}

				if (item.Endereco != undefined) {
					html += '<div><strong>Endereço: </strong>' + escape(item.Endereco) + '</div>';
				}

				if (item.Telefone != undefined) {
					html += '<div><strong>Telefone: </strong>' + escape(item.Telefone) + '</div>';
				}

				html += '</div>';

				return html;
			}
		},
		load: function (query, callback) {
			if (!query.length) return callback();
			$.ajax({
				url: '/Pessoa/FiltraPessoa',
				type: 'POST',
				dataType: 'JSON',
				data: {
					q: query,
					page_limit: 10
				},
				error: function (e) {
					if (e.status == 200) {
						callback(JSON.parse(e.responseText));
					} else {
						callback();
					}
				},
				success: function (res) {
					callback(res.pessoas);
				}
			});
		}
	});
};

function EnviaFoto(obj) {
	$("#cadproduto").modal('show');

	var cod = $(obj).attr('data-codigo');

	//setCookie('codigo_transfer', $(obj).attr('data-codigo'));

	$('#foto').fileupload({
		dataType: 'json',
		url: '/Util/UploadFiles',
		autoUpload: true,
		done: function (e, data) {
			$("#cadproduto").modal('hide');
			$('.progress .progress-bar').css('width', 0 + '%');

			location.reload();
		}
	}).on('fileuploadprogressall', function (e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('.progress .progress-bar').css('width', progress + '%');
	});
}

function EnviaAnexoItem(obj) {
	$("#cadproduto").modal('show');

	$('#foto').fileupload({
		dataType: 'json',
		url: '/Util/UploadFilesPedido',
		autoUpload: true,
		done: function (e, data) {
			$("#cadproduto").modal('hide');
			$('.progress .progress-bar').css('width', 0 + '%');

			location.reload();
		}
	}).on('fileuploadprogressall', function (e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('.progress .progress-bar').css('width', progress + '%');
	});
}

function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
	if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
	var sExpires = "";
	if (vEnd) {
		switch (vEnd.constructor) {
			case Number:
				sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
				break;
			case String:
				sExpires = "; expires=" + vEnd;
				break;
			case Date:
				sExpires = "; expires=" + vEnd.toGMTString();
				break;
		}
	}
	document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
}

Carregando = function (status) {
	if (!status) {
		$('body').addClass('loaded');
	} else {
		$('body').removeClass('loaded');
	}
};

Loader = function () {
	setTimeout(function () {
		Carregando(false);
	}, 500);
};

CarregaTiposDeItem = function () {
	$.ajax({
		type: 'post',
		url: '/CheckItem/getAll',
		dataType: "json",
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			var tabela = $("#itens-checklist");
			tabela.empty();

			$.map(data.dados, function (item) {
				tabela.append(
					"<tr>" +
                        "<td><a href=\"javascript:InsereItemNoCheckList('" + item.codigo + "');\">" + item.codigo + "</a></td>" +
					    "<td>" + item.descricao + "</td>" +
					    "<td>" + item.tipo + "</td>" +
					"</tr>"
                );
			});

			$("#myModal").modal("show");
		}
	});
};

InsereItemNoCheckList = function (codigo) {
	$.ajax({
		type: 'post',
		url: '/CheckList/AddItem',
		data: { ID: $("#ID").val(), Item: codigo },
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			location.reload();
		}
	});
};

ExcluiItemDoCheckList = function (codigo) {
	$.ajax({
		type: 'post',
		url: '/CheckList/RemoveItem',
		data: { id: codigo },
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			location.reload();
		}
	});
};

SalvarItemAmostragem = function () {
	var dados = $("#form2").serialize();
	$.ajax({
		type: 'post',
		url: '/Amostragem/AddCriticidade',
		data: dados,
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			location.reload();
		}
	});
};

RemoveItemCriticidade = function (ID) {
	$.ajax({
		type: 'post',
		url: '/Amostragem/RemoveCriticidade',
		data: { ID: ID },
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			if (data.Sucesso == true) {
				$("#ID_" + ID).fadeOut();
			}
		}
	});
};

MarcaInspecaoRevisada = function (Id) {
    if (!confirm("Deseja realmente marcar esta Inspeção como Revisada?")) {
        return;
    }

    $.ajax({
        type: 'post',
        url: '/CheckList/MarcaInspecaoComoRevisada',
        data: {
            id: Id,
            acao: $("#acao").val()
        },
        beforeSend: function () {
            Carregando(true);
        },
        complete: function () {
            Carregando(false);
        },
        success: function (data) {
            if (data.Sucesso == true) {
                location.href = "/CheckList/Revisar";
            }
        }
    });
};

BuscaAjusteGrade = function (id) {
    $.ajax({
        type: 'post',
        url: '/FichaTecnica/PegaGrade',
        data: {
            id: id
        },
        async: false,
        success: function (data) {
            if (data != null && data.ficha != null) {
                $("#AjusteGrade").val(data.ficha);
            }
        }
    });
};

CalculaGrade = function () {
    var total = 0;
    var packs = $("#Packs").val();

    for (var i = 1; i < 15; i++) {
        var q = $("#GQ_" + i).val();

        // Ajusta Grade Marcar
        var nId = "#GP_" + i.toString();
        var mId = "#GM_" + i.toString();
        if ($(mId).val() != "") {
            $(nId).val(parseFloat($(mId).val().replace(',', '.')) - parseFloat($("#AjusteGrade").val()));
        }

        if (q != "") {
            if (packs != "") {
                total += (parseInt(packs) * parseInt(q));
                $("#TG_" + i).val(parseInt(packs) * parseInt(q));
            } else {
                total += parseInt(q);
                $("#TG_" + i).val(parseInt(1) * parseInt(q));
            }
        }     
    }
    $("#Qty").val(total);
};

LimpaGrade = function () {
    for (var i = 1; i < 15; i++) {
        $("#GM_" + i).val("");
        $("#GP_" + i).val("");
        $("#GQ_" + i).val("");
    }
};

PegaDadosAcompanhamento = function () {
    $.ajax({
        type: 'post',
        url: '/Pedido/DadosAcompanhamento',
        data: {
            fabrica: $("#fabrica").val(),
            status: $("#tipo").val(),
			cliente: $("#cliente").val(),
			dataini: $("#dataini").val(),
			datafim: $("#datafim").val()
        },
        beforeSend: function () {
            Carregando(true);
        },
        complete: function () {
            Carregando(false);
        },
        success: function (data) {
            if (data != null) {
                $("#tb-acompanhamento").html(data.dados);
                $('[data-toggle="tooltip"]').tooltip();

                $(".ope-acomp").click(function () {
                    var ope = $(this).attr("data-ope");
                    var item = $(this).attr("data-item");
                    var tipo = $(this).attr("data-tipo");
					var valor = $(this).attr("data-valor");
					var texto = $(this).attr("data-texto");

                    $("#ope").val(ope);
                    $("#tipo").val(tipo);
					$("#item").val(item);

					$("#Data2").val("");
					$("#Texto2").val("");

                    if (tipo == "1") {
                        if (valor != "") {
                            $("#Data").val(valor);
                        }
                        $("#modal-data").modal('show');
                    }
                    if (tipo == "4") {
                        if (valor != "") {
                            $("#Texto").val(valor);
                        }
                        $("#modal-texto").modal('show');
					}
					if (tipo == "5") {
						if (valor != "") {
							$("#Data2").val(valor);
						}
						if (texto != null) {
							$("#Texto2").val(texto);
						}
						$("#modal-data-texto").modal('show');
					}
					if (tipo == "6") {
						if (valor != "") {
							$("#Data3").val(valor);
						}
						if (texto != null) {
							$("#Texto3").val(texto);
						}
						$("#modal-data-cor").modal('show');
					}						
				});

				$('.editable').editable('enable');
            }
        }
    });
};

ExcelAcompanhamento = function () {
	$.ajax({
		type: 'post',
		url: '/Pedido/XlsAcompanhamento',
		data: {
			fabrica: $("#fabrica").val(),
			status: $("#tipo").val(),
			cliente: $("#cliente").val(),
			dataini: $("#dataini").val(),
			datafim: $("#datafim").val()
		},
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			console.log(data);
			location.href = data.arquivo;    
		}
	});
};

SalvaDataItem = function () {
    $.ajax({
        type: 'post',
        url: '/Pedido/SalvaDataItem',
        data: {
            operacao: $("#ope").val(),
            item: $("#item").val(),
            data: $("#Data").val()
        },
        beforeSend: function () {
            Carregando(true);
        },
        complete: function () {
            Carregando(false);
        },
        success: function (data) {
            if (data != null) {
                PegaDadosAcompanhamento();
                $("#modal-data").modal('hide');
            }
        }
    });
};

SalvaDataComTextoItem = function () {
	$.ajax({
		type: 'post',
		url: '/Pedido/SalvaDataComTextoItem',
		data: {
			operacao: $("#ope").val(),
			item: $("#item").val(),
			data: $("#Data2").val(),
			texto: $("#Texto2").val()
		},
		beforeSend: function () {
			alert('')
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			if (data != null) {
				PegaDadosAcompanhamento();
				$("#modal-data-texto").modal('hide');
				$("#modal-data-cor").modal('hide');
			}
		}
	});
};

SalvaDataComCorItem = function () {
	$.ajax({
		type: 'post',
		url: '/Pedido/SalvaDataComTextoItem',
		data: {
			operacao: $("#ope").val(),
			item: $("#item").val(),
			data: $("#Data3").val(),
			texto: $("#Texto3").val()
		},
		beforeSend: function () {
			Carregando(true);
		},
		complete: function () {
			Carregando(false);
		},
		success: function (data) {
			if (data != null) {
				PegaDadosAcompanhamento();
				$("#modal-data-texto").modal('hide');
				$("#modal-data-cor").modal('hide');
			}
		}
	});
};

SalvaTextoItem = function () {
    $.ajax({
        type: 'post',
        url: '/Pedido/SalvaTextoItem',
        data: {
            operacao: $("#ope").val(),
            item: $("#item").val(),
            data: $("#Texto").val()
        },
        beforeSend: function () {
            Carregando(true);
        },
        complete: function () {
            Carregando(false);
        },
        success: function (data) {
            if (data != null) {
                PegaDadosAcompanhamento();
                $("#modal-texto").modal('hide');
            }
        }
    });
};

EditaPedidoItem = function (Id) {
	$.ajax({
		type: 'post',
		url: '/Pedido/PegaItemEdicao',
		data: {
			Id: Id
		},
		beforeSend: function () {
		},
		complete: function () {

		},
		success: function (data) {
			if (data.Sucesso == true) {
				$("#add-material").modal('show');

				var $select = $('#fichatecnica\\.ID').selectize();
                var control = $select[0].selectize;
                control.disable();

                $("#ft").hide();

				$("#Price").val(data.objeto.Price);
				$("#Qty").val(data.objeto.Qty);
				$("#Notes").val(data.objeto.Notes);
                $("#Packs").val(data.objeto.Packs);
                $("#Solido").val(data.objeto.Solido);
                $("#DataFabrica").val(data.objeto.DataFabricaFormatada);
				$("#ID2").val(data.objeto.ID);
                $("#fichatecnica\\.ID").val(data.objeto.fichatecnica.ID);

                $("#ft-2").text(data.objeto.fichatecnica.modelo.ID + " " + data.objeto.fichatecnica.modelo.Descricao);

				var grades = data.objeto.Grade.split("|");
				for (var i = 1; i < grades.length; i++) {
					var conjuntos = grades[i-1].split("@");
					$("#GM_" + i).val(conjuntos[0]);
					$("#GP_" + i).val(conjuntos[1]);
					$("#GQ_" + i).val(conjuntos[2]);
				}				
			}
		}
	});	
};


function PrintElem(elem) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=800');

    mywindow.document.write('<html><head><title>' + document.title + '</title>');

    mywindow.document.write('</head><body>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();

    return true;
}

function printDiv(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
        "<html><head><title></title></head><body>" +
        divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;
}

function PrintElem(elem, title, css) {
    var tmpWindow = window.open('', 'PRINT', 'height=500,width=800');
    var tmpDoc = tmpWindow.document;

    title = title || document.title;
    css = css || "";

    this.setTitle = function (newTitle) {
        title = newTitle || document.title;
    };

    this.setCSS = function (newCSS) {
        css = newCSS || "";
    };

    this.basicHtml5 = function (innerHTML) {
        return '<!doctype html><html>' + (innerHTML || "") + '</html>';
    };

    this.htmlHead = function (innerHTML) {
        return '<head>' + (innerHTML || "") + '</head>';
    };

    this.htmlTitle = function (title) {
        return '<title>' + (title || "") + '</title>';
    };

    this.styleTag = function (innerHTML) {
        var style = '';
        style += '<link href="/Assets/plugins/bootstrap/css/bootstrap.min.css")" rel="stylesheet" />';
        style += '<link href="/Assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />';
        style += '<link href="/Assets/css/style.min.css" rel="stylesheet" />';
        style += '<link href="/Assets/css/style-responsive.css" rel="stylesheet" />';
        style += '<link href="/Assets/css/theme/blue.min.css" rel="stylesheet" id="theme" />';
        style += '<link href="/Assets/css/SIG.min.css" rel="stylesheet" />';
        style += '<style>body { background-color:#fff; }';
        style += (innerHTML || "") + '</style>';

        return style;
    };

    this.htmlBody = function (innerHTML) {
        return '<body>' + (innerHTML || "") + '</body>';
    };

    this.build = function () {
        tmpDoc.write(
            this.basicHtml5(
                this.htmlHead(
                    this.htmlTitle(title) + this.styleTag(css)
                ) + this.htmlBody(
                    document.querySelector(elem).innerHTML
                )
            )
        );
        tmpDoc.close(); // necessary for IE >= 10
    };

    this.print = function () {
        tmpWindow.focus(); // necessary for IE >= 10*/
        tmpWindow.print();
        //tmpWindow.close();
    };

    this.build();

    return this;
}

InsereVoluntario = function () {
    if ($('#form').parsley().validate()) {
        $.ajax({
            type: 'post',
            url: '/Pessoa/InsereVoluntario',
            data: $("#form").serialize(),
            beforeSend: function () {
                $("#ms-alerta").empty();
                Carregando(true);
            },
            complete: function () {
                Carregando(false);
            },
            success: function (data) {
                if (data.Sucesso == true) {
                    alert("Voluntário cadastrado com sucesso.");

                    location.href = "/Login";
                } else {
                    MSAlerta("danger", "Atenção!", data.Mensagem, $("#ms-alerta"));
                }
            }
        });
    }
};

InsereONG = function () {
    if ($('#form').parsley().validate()) {
        $.ajax({
            type: 'post',
            url: '/Pessoa/InsereONG',
            data: $("#form").serialize(),
            beforeSend: function () {
                $("#ms-alerta").empty();
                Carregando(true);
            },
            complete: function () {
                Carregando(false);
            },
            success: function (data) {
                if (data.Sucesso == true) {
                    alert("ONG cadastrada com sucesso. Aguarde aprovação de cadastro.");

                    location.href = "/Login";
                } else {
                    MSAlerta("danger", "Atenção!", data.Mensagem, $("#ms-alerta"));
                }
            }
        });
    }
};