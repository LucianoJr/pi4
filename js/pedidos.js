


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


function funcBtn()
	{
		if (document.form.validacao.value!="erro")
			{
				//var codigo = document.form.produto.value;
				//var str1 = codigo.replace(/\_/g, "");
                //var str2 = str1.replace(/\./g, "");
                //var codigo = str2.replace(/\-/g, "");

                //document.form.produto.value = codigo;
				//console.log(document.form.produto.value);
				if (document.form.btnIncluir.value=="Incluir")
						document.form.opcao.value = "salvarItem";
					else
						document.form.opcao.value = "alterarItem";
				document.form.submit();
			}
	}


function  calculaItem(valor,qtda,ipi,valorST)
	{
		if (qtda.length > 0 || parseFloat(qtda) > 0)
			{
				valor = valor.replace(/\./g, "@");
				valor = valor.replace(/\,/g, ".");
				valor = valor.replace(/\@/g, "");
				ipi   = ipi.replace(/\,/g, ".");

				total = (valor * qtda) + ipi + valorST;

				//var x2 = parseFloat(parseFloat(total).toFixed(2));
				var x2 = parseFloat(total).toFixed(2);
				document.form.totalItem.value = x2.toLocaleString("pt-BR");
			}
	} // function  calculaItem(valor,qtda,ipi)


function processaQtda(op)
	{
		document.form.validacao.value='erro'; 		
		var retorno = valorInteiro(document.form.quantidade,'Quantidade','sim',0,parseInt(document.form.disponivel.value)); 
		if (retorno!='') 
				{ 
					if (op==1)
						{
							mostraErro('Quantida maxima disponivel em estoque e ' + document.form.disponivel.value);
							document.form.quantidade.focus(); 
						}
					document.form.totalItem.value="";				
				} 
			else 
				if (document.form.quantidade.value!="" && parseInt(document.form.quantidade.value) > 0)
					{   
						calculaItem(document.form.precoUnitario.value,document.form.quantidade.value,document.form.valorlIPI.value,document.form.valorST.value); 
						document.form.validacao.value=''; 
						document.form.btnIncluir.disabled = false;
						document.form.btnIncluir.focus();
					}
	} // function processaQtda()


function zeraCampos ()
	{
		document.form.nome.value ="";
		document.form.precoUnitario.value="";
		document.form.quantidade.value="";
		document.form.percentualIPI.value="";
		document.form.valorST.value="";
		document.form.valorIPI.value="";
		document.form.totalItem.value="";
		document.form.disponivel.value="";
		$("#imgSituacao").html("&nbsp;");
		$("#imgSituacao").attr("title","");
		document.form.validacao.value="erro";
		document.form.quantidade.disabled = true;
	} // function zeraCampos ()


function pesquisaProduto(codigo)
	{
 		zeraCampos();

		var str1 = codigo.replace(/\_/g, "");
        var str2 = str1.replace(/\./g, "");
        var codigo = str2.replace(/\-/g, "");


       // console.log(codigo);

        if (codigo!="")
	        	{
					if (codigo.length < 7 || codigo=="0000000")
						{
							zeraCampos();
							document.form.nome.value = "Codigo do produto invalido";
							document.form.produto.focus();
						}
					else
						{
							document.form.nome.value = "Pesquisando produto... Aguarde...";
							console.log(getUrlDaAplicacao() + "web/pesquisa?usarPF2=sim&op=produto&produto=" + codigo + "&pedido=" + document.form.pedido.value);

							$.get(getUrlDaAplicacao() + "web/pesquisa?usarPF2=sim&op=produto&produto=" + codigo + "&pedido=" + document.form.pedido.value,
								{ },
								function(data,status,xhr)
										{
											zeraCampos();
											retorno = data.split("|"); 
											console.log(retorno);
											if (retorno[0]!="OK")
													{
														document.form.nome.value = retorno[1];
														document.form.produto.focus();
													}
												else
													{   
														document.form.nome.value = retorno[1];
														document.form.precoUnitario.value = retorno[2];
														document.form.percentualIPI.value = retorno[3];
														document.form.valorST.value = retorno[7];
														document.form.valorIPI.value = retorno[8];


														$("#imgSituacao").html(retorno[6]);
														$("#imgSituacao").attr("title",retorno[5]);
														document.form.disponivel.value = retorno[4];

														//console.log(document.form.disponivel.value);

														document.form.quantidade.disabled = false;
														document.form.quantidade.focus();
													}
										//	console.log(itensDaCategoria);
										},
									'html')
									.fail(function() 
										{
											mostraErro("<li>Erro no acesso ao servidor de dados</li>"); 
										})
						}
				}
			else
				{
					zeraCampos();
					document.form.btnIncluir.disabled = true;
				}
	} // function pesquisaProduto(codigo)
		

function alterarItem(codigo,qtda)
	{
		document.form.produto.disabled = true;


		document.form.produto.value=codigo;
		document.form.btnIncluir.value = "Alterar";

		var str1 = codigo.replace(/\_/g, "");
        var str2 = str1.replace(/\./g, "");
        var codigo = str2.replace(/\-/g, "");

		document.form.nome.value = "Pesquisando produto... Aguarde...";
		$.get(getUrlDaAplicacao() + "web/pesquisa?usarPF2=sim&op=produto&produto=" + codigo,
			{ },
			function(data,status,xhr)
					{
						zeraCampos();
						retorno = data.split("|"); 
						if (retorno[0]!="OK")
								{
									document.form.nome.value = retorno[1];
									document.form.produto.focus();
								}
							else
								{
									document.form.nome.value = retorno[1];
									document.form.precoUnitario.value = retorno[2];
									document.form.percentualIPI.value = retorno[3];
									document.form.valorST.value = retorno[7];
									document.form.valorIPI.value = retorno[8];


									$("#imgSituacao").html(retorno[6]);
									$("#imgSituacao").attr("title",retorno[5]);
									document.form.disponivel.value = parseInt(retorno[4]) + parseInt(qtda);

									//console.log(document.form.disponivel.value);

									document.form.quantidade.disabled = false;
									document.form.quantidade.value = qtda;

									calculaItem(document.form.precoUnitario.value,document.form.quantidade.value,document.form.valorIPI.value,document.form.valorST.value); 

									document.form.produto.disabled = false;
									document.form.btnIncluir.disabled = false;
									document.form.quantidade.focus();
								}
					//	console.log(itensDaCategoria);
					},
				'html')
				.fail(function() 
					{
						mostraErro("<li>Erro no acesso ao servidor de dados</li>"); 
					})
		
	} // function alterarItem(produto)


function excluirItem(produto,ponteiro)
	{
		if (confirm("Confirma que deseja remover o produto " + produto + "?"))
			{
				document.form.opcao.value = "ExcluirItem";
				document.form.ponteiro.value = ponteiro;
				document.form.submit();
			}
	} // function excluirItem(produto)


$(document).ready(function ()
	{
		jQuery(function ($)
			{
       			$("[name='produto']").mask("99-99999");
     		});

		document.form.produto.focus();
	})


