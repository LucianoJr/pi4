/*
 *
 *  ambiente.js
 *  seta as variaveis necessárias para o ambiente do usuário
 *  fornece as funções para retorno as mesmas
 *  
 */


// URL do script do StarWeb FrameWork que atenderá às requisições
var swfwServidor = "http://www.ccmdobrasil.com.br/cgi-bin/webSite.pl/"; 
//swfwServidor = window.location.origin + "/cgi-bin/webSite.pl/"; 






// Retorna a URL do script da aplicação que atenderá às requisições
function getUrlDaAplicacao()
	{
		return swfwServidor;
	}