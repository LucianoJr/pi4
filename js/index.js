


// Retorna a URL do script da aplicação que atenderá às requisições
function getUrlDaAplicacao()
	{
		var swfwServidor = "http://www2.ccmdobrasil.com.br/cgi-bin/pecas2.pl/";
		return swfwServidor;
	} // function getUrlDaAplicacao()


function carregaAccordion ()
	{
		var linha = "";
		$("#accordion").html("Carregando...");
		$.get(getUrlDaAplicacao() + "listaDeGrupos",
			{ },
			function(data,status,xhr)
					{
						linha = data;
						$("#accordion").html(data);

						//$("#daccordion").append(linha);
                       // $("#accordion").trigger("create");
					},
				'html')
				.fail(function() 
					{
						linha = "erro";
						$("#accordion").html("Erro");
					}
		)

	} // function carregaAccordion ()


$(document).ready(function()
   {
		$("#conteudo").html("");
		$("#corpo").html("<h1>Conteúdo</h1>");

		carregaAccordion();

		var states = [];
		$.get(getUrlDaAplicacao() + "geraListaDePecas",
			{ },
			function(data,status,xhr)
					{
						states = data.split(",");
						var countries = new Bloodhound({
  												datumTokenizer: Bloodhound.tokenizers.whitespace,
  												queryTokenizer: Bloodhound.tokenizers.whitespace,
  												local: states
											});

						$('#scrollable-dropdown-menu .typeahead').typeahead({highlight: true}, {
  							name: 'countries',
			  				source: countries,
  							limit: 1000
							}
						);
					},
				'html')
				.fail(function() 
					{
						states = "erro";
						console.log("X=" + states);
					}
		)



      	$("#btnPesquisar").click(function() 
      		{
      			/*
      			var texto = document.form.filtro.value
      			if length(texto) < 3
      				    alert("Infome pelo menos 3 letras")
      				else
      					{
							$("#conteudo").html("Pesquisando...");
							$.get(getUrlDaAplicacao() + "pesquisarPeca?peca=" + texto ,
								{ },
								function(data,status,xhr)
										{
											linha = data;
											$("#conteudo").html(data);

											//$("#daccordion").append(linha);
					                       // $("#accordion").trigger("create");
										},
									'html')
									.fail(function() 
										{
											linha = "erro";
											$("#conteudo").html("Erro");
										})
      					}
      					*/
      		});



   }) // $(document).ready(function()