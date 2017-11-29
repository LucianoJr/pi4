

		
		function mostraErro (msg)
			{		
				var posX, posY; //position of popup
				var w=500, h=200; //size of popup
				var offsetX=300, offsetY=200; //x and y offset relative to the parent window
				if (typeof window.screenLeft != "undefined")
						{ //IE
							posX = window.screenLeft + offsetX;
							posY = window.screenTop + offsetY; 
						}
					else 
						if (typeof window.screenX != "undefined")
								{ //NS/Moz
									posX = window.screenX + offsetX;
									posY = window.screenY + offsetY;
								}
							else 
								{ //default - center of screen
									posX = screen.availWidth/2 - w/2;
									posY = screen.availHeight/2 - h/2;
								}

				  janErros = window.open('','janErros','toolbar=0,location=0,diretories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=' + w + ',height=' + h + ',left=' + posX + ',top=' + posY );
				  janErros.document.open(); 
				  janErros.document.writeln('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">'); 
				  janErros.document.writeln('<html>'); 
				  janErros.document.writeln('<head>'); 
				  janErros.document.writeln('<title>Mensagens de Erro</title>'); 
				  janErros.document.writeln('<style type="text/css"> body, td { background-color: #FFFFF4; border: 0px solid #ECEDFF; color: #800000; font-family: Helvetica, Geneva, Arial, sans-serif; font-size: 12px; font-style: normal; font-weight: bold; border-style: solid; } .td1 { background-color: #FFFFF4; border: 1px; color: red; font-family: wingdings; font-size: 120px; font-style: normal; font-weight: normal;} </style>');
				  janErros.document.writeln('</head>');
				  janErros.document.writeln('<body>');       
				  janErros.document.writeln('<form name="formMsg" method="post">');       
				  janErros.document.writeln('<table border="0" width="100%">');
				  janErros.document.writeln('   <tr>');
				  janErros.document.writeln('      <td class="td1" align="center">ý</td>');
				  janErros.document.writeln('      <td>');
				  janErros.document.writeln('         <table width="100%">');
				  janErros.document.writeln(             msg);
				  janErros.document.writeln('         </table>');
				  janErros.document.writeln('      </td>');
				  janErros.document.writeln('   </tr>');
				  janErros.document.writeln('   <tr>');       
				  janErros.document.writeln('      <td colspan="2" align="right"><input type="button" name="fechar" value="Fechar" onclick="window.close()"></td>');
				  janErros.document.writeln('   </tr>');
				  janErros.document.writeln('</table>');
				  janErros.document.writeln('</form>');
				  janErros.document.writeln('</body>');
				  janErros.document.writeln('</html>');
				  janErros.document.close();
				  janErros.focus();
			}
			
			
		function mostraMensagens (texto)
			{
				
				linha = '<table cellpadding="1" border="0" cellspacing="0">';
				
                                var itens = texto.split("|");
                                for (var i in itens) 
				 	{
						if (itens[i]!="")
						    linha = linha + '<tr><td><span style="font-family: Wingdings; font-size: 16px; color: #990000">&#x00e8;</span>&nbsp;&nbsp;' + itens[i] + '</td></tr>'
               		                }				
				
				linha = linha + '</table>';
				
				$("#divListaMsg").html(linha);
			}



		function estaLogado(idDiv)
			{
				var id = '#loginMaster';
				var maskHeight = $(document).height();
				var maskWidth = $(window).width();
				var winH = $(window).height();
				var winW = $(window).width();
				
				$.get(getUrlDaAplicacao() + "web/website?op=estaLogado&tp=testar",
					{ },
					function(data,status,xhr)
							{
								sucesso = data;
								if (sucesso=="OK")
										{
											if (idDiv=='#loginMaster')
													document.location.href = "areaRestrita.html"
												else
													document.location.href = "areaRestrita.html?acao=pedido"
										}
									else
										{
											try 
												{
													$('#mask').css({ 'width': maskWidth, 'height': maskHeight });
													$('#mask').fadeIn(1);
													$('#mask').fadeTo("fast", 0.8);
													$(id).css('top', winH / 2 - $(id).height() / 2);
													$(id).css('left', winW / 2 - $(id).width() / 2);
													$(id).fadeIn(500);
												} 
											catch (e) 
												{
													mostraErro(e);
												}
										}
							},
						'html')
						.fail(function() 
							{
								try 
									{
										$('#mask').css({ 'width': maskWidth, 'height': maskHeight });
										$('#mask').fadeIn(1);
										$('#mask').fadeTo("fast", 0.8);
										$(id).css('top', winH / 2 - $(id).height() / 2);
										$(id).css('left', winW / 2 - $(id).width() / 2);
										$(id).fadeIn(500);
									} 
								catch (e) 
									{
										mostraErro(e);
									}
							})
			} // function estaLogado()
			

		function fecharMask()
			{
				$('#mask, .window').hide();
			} // function fecharMask()
			

		function mostrarModal(idDiv) 
			{
				try 
					{

						if (idDiv=='#loginMaster' || idDiv=='#loginPedido')
  						        estaLogado(idDiv)
							else	  
 							    {	   
									var id = idDiv;
				
									//armazena a largura e a altura da tela
									var maskHeight = $(document).height();
									var maskWidth = $(window).width();
									//Define largura e altura do div#mask iguais ás dimensões da tela
									$('#mask').css({ 'width': maskWidth, 'height': maskHeight });
				
									//efeito de transição
									$('#mask').fadeIn(1);
									$('#mask').fadeTo("fast", 0.8);
				
									//armazena a largura e a altura da janela
									var winH = $(window).height();
									var winW = $(window).width();
									//centraliza na tela a janela popup
									$(id).css('top', winH / 2 - $(id).height() / 2);
									$(id).css('left', winW / 2 - $(id).width() / 2);
									//efeito de transição
									$(id).fadeIn(500);
							    }
					} 
				catch (e) 
					{
						mostraErro(e);
					}
			} // mostraModal			 


		/* ****************************************************************************************** */				
		function fnSolicitarCadastro ()
			{
				var msg = "";
				if (document.form.txtCNPJCadastro.value=="")
					msg = "<li>O CNPJ deve ser informado</li>";
				if (document.form.txtRazaoCadastro.value=="")
					msg = msg + "<li>A razão social deve ser informada</li>";
				if (document.form.txtContatoCadastro.value=="")
					msg = msg + "<li>O nome do contato deve ser informado</li>";
				if (document.form.txtTelefoneCadastro.value=="")
					msg = msg + "<li>O telefone de contato deve ser informado</li>";
				if (document.form.txtCepCadastro.value=="")
					msg = msg + "<li>O CEP do endereço de contato deve ser informado</li>";
				if (document.form.txtEmailCadastro.value=="")
					msg = msg + "<li>O email para contato deve ser informado</li>";
				if (document.form.txtCidadeCadastro.value=="")
					msg = msg + "<li>A cidade do contato deve ser informado</li>";
					
				if (msg!="")
						{   
							mostraErro('<ul>' + msg + '</ul>'); 
						}
					else
						$.ajax(
							{
								type: "POST",
								url: getUrlDaAplicacao() + "web/website?op=solicitarCadastro",
								data: $('#form').serialize(), 
								dataType: 'html',
								error: function(erro)
									{
										mostrarModal('#mostraErroServidor');
									},
								success: function(sucesso)
									{
										mostrarModal('#mostraOK');
										document.form.txtCNPJCadastro.value = "";
										document.form.txtRasaoCadastro.value = "";
										document.form.txtContatoCadastro.value = "";
										document.form.txtTelefoneCadastro.value = "";
										document.form.txtCepCadastro.value = "";
										document.form.txtCidadeCadastro.value = "";
										document.form.txtEmailCadastro.value = "";
									}
							}); // $.ajax
			}
		
		
		/* ****************************************************************************************** */
		function fnEnviarLogin()
			{
				var msg = "";
				if (document.form.txtUsuarioLogin.value=="")
					msg = "<li>A identificação do login deve ser informada</li>";
				if (document.form.txtSenhaLogin.value=="")
					msg = msg + "<li>A senha de acesso deve ser informada</li>";
					
				if (msg!="")
						mostraErro('<ul>' + msg + '</ul>'); 
					else
						$.ajax(
							{
								type: "POST",
								url: getUrlDaAplicacao() + "web/website?op=login",
								data: $('#form').serialize(), 
								dataType: 'html',
								error: function(erro)
									{
										mostrarModal('#mostraErroServidor');
									},
								success: function(sucesso)
									{
										if (sucesso=="OK")
												{
													document.form.txtUsuarioLogin.value = "";
													document.form.txtSenhaLogin.value   = "";
													document.location.href = "areaRestrita.html";
												}
											else
												{
													console.log(sucesso);
													mostraErro(sucesso);
												}
									}
							}); // $.ajax
			} // function fnEnviarLogin()
			

		/* ****************************************************************************************** */
		$("#enviarEsqueciSenha").click(function()
			{  
				var msg = "";
				if (document.form.txtUsuarioEsqueciSenha.value=="")
					msg = "<li>A identificação do login deve ser informada</li>";
					
				if (msg!="")
						mostraErro('<ul>' + msg + '</ul>'); 
					else
						{
							$("#msgEsqueciSenha").html("Aguarde...");
							$.ajax(
								{
									type: "POST",
									url: getUrlDaAplicacao() + "web/website?op=esqueciSenha",
									data: $('#form').serialize(), 
									dataType: 'html',
									error: function(erro)
										{
											$("#msgEsqueciSenha").html(" ");													
											mostrarModal('#mostraErroServidor');
										},
									success: function(sucesso)
										{
											retorno = sucesso.split(",");
											if (retorno[0]=="OK")
													{
														alert(retorno[1]);
														document.form.txtUsuarioEsqueciSenha.value = "";
														fecharMask();
													}
												else
													{
														$("#msgEsqueciSenha").html(" ");													
														mostraErro(retorno[1]);
													}
										}
								}); // $.ajax
						}
			})


		/* ****************************************************************************************** */
		$("#enviarPesquisaProduto").click(function()
			{
				var msg = "";
				if (document.form.txtPesquisaProduto.value=="")
					msg = "<li>Informe o código ou nome do produto a pesquisar</li>";
					
				if (msg!="")
						mostraErro('<ul>' + msg + '</ul>')
					else
						$.ajax(
							{
								type: "POST",
								url: getUrlDaAplicacao() + "web/website?op=pesquisaProduto",
								data: $('#form').serialize(), 
								dataType: 'html',
								error: function(erro)
									{
										alert("Erro no acesso ao servidor de dados\n"); 
									},
								success: function(sucesso)
									{
										if (sucesso=="OK")
												{
													alert("Produto encontrado ...");
												}
											else
												{
													alert(sucesso);
												}
									}
							}); // $.ajax
			})
					
		
		/* ****************************************************************************************** */
		$("#categorias").html("");
		$.get(getUrlDaAplicacao() + "web/website?op=categoria",
			{ },
			function(data,status,xhr)
					{
						itensDaCat = data;
						$("#categorias").html(itensDaCat);
					},
				'html')
				.fail(function() 
					{
						mostrarModal('#mostraErroServidor'); 
						$("#categorias").html("");
					})



		//var arrayListaEquiPecas = [];

		if (typeof paginaIndexAtiva != "undefined") 
			$("#divBusca").css("visibility","visible");

		 if (typeof paginaIndexAtiva != "undefined") 
		 	{
				$.get(getUrlDaAplicacao() + "web/website?op=listaEquipPecas",
					{ },
					function(data,status,xhr)
							{   //console.log(data);
								//arrayListaEquiPecas = data.split(",");
								var arrayListaEquipPecas = JSON.parse(data);
		                        var listaEquipPecas = new Bloodhound({
		  												datumTokenizer: Bloodhound.tokenizers.obj.whitespace("n"),
		  												queryTokenizer: Bloodhound.tokenizers.whitespace,
		  												local: arrayListaEquipPecas
													});

								//console.log(listaEquipPecas);

								$("#txtPesquisaProduto").attr("placeholder","Nome do equipamento que deseja pesquisar ...");
								$('#scrollable-dropdown-menu .typeahead').typeahead({highlight: true}, {
		  							name: 'listaEquipPecas',
		  							valueKey: 'n',
		  							displayKey: "n",
					  				source: listaEquipPecas,
					  				templates: {
					  								suggestion: function(data) {
					  									var ret='';
					  									/* **
					  									if (data.t == "E")
					  											return '<p>' + data.n + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Grupo: ' + data.g + '<br>' + 
		    											       		   '<i>Código CCM: ' + data.c + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tipo: Equipamento</i></p>';
		    											    else   		   
					  											return '<p>' + data.n + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Grupo: ' + data.g + '<br>' + 
		    											       		   '<i>Código CCM: ' + data.c + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tipo: Peça<br>' + 
		    											       		   'Usado em: ' + data.x + '</i></p>';
		    											** */       		   
					  									if (data.t == "E")
					  											return '<p>' +
					  											       'Grupo: ' + data.g + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>' + 
					  											       'Descrição: ' + data.n + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>' + 
		    											       		   '<i>Código CCM: ' + data.c + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tipo: Equipamento</i></p>';
		    											    else   		   
					  											return '<p>' + 
					  											       'Grupo: ' + data.g + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>' + 
					  											       'Descrição: ' + data.n + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>' + 
					  										           '<i>Código CCM: ' + data.c + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tipo: Peça<br>' + 
		    											       		   'Usado em: ' + data.x + '</i></p>';
													}
					  					       }, 
					  				limit: 1000
									}
									
								).on('typeahead:selected', function (obj, datum) {
		    						//console.log(obj);
		    						
		    						//console.log(datum);
		    						
									if (datum.t=="E")
											document.location.href = "http://www.ccmdobrasil.com.br/website/produto.html?produto=" + datum.c;
										else
											document.location.href = "http://www.ccmdobrasil.com.br/website/vistaExplodida.html?produto=" + datum.e + "&vista=" + datum.v + "&peca=" + datum.c;
										
								});
							},
						'html')
						.fail(function() 
							{
								arrayListaEquiPecas = "erro";
								$("#txtPesquisaProduto").attr("placeholder","Pesquisa não disponivel");
								//console.log("X=" + arrayListaEquiPecas);
							}
				)
		 	}







		/* ****************************************************************************************** */
		//seleciona os elementos a com atributo name="modal" se o botãoo fechar for clicado
	//	$('.window .close').click(function (e) 
	//		{
	//			//cancela o comportamento padrão do link
	//			e.preventDefault();
	//			$('#mask, .window').hide();
	//		});


		/* ****************************************************************************************** */
		//se div#mask for clicado
	//	$('#mask').click(function () 
	//		{
	//			$(this).hide();
	//			$('.window').hide();
	//		});


		/* ****************************************************************************************** */
	   jQuery(function ($) 
			{
				$("[name='txtCNPJCadastro']").mask("99.999.999/9999-99");            
				$("[name='txtCepCadastro']").mask("99.999-999");            
				$("[name='txtCpfContato']").mask("999.999.999-99");            
				$("[name='txtCepContato']").mask("99.999-999");            
			});


