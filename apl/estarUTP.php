<?php

    include 'comum.php';
    include 'geral.php';
    include 'conexao.php';

    $idLogin = "";
    $hora    = "";
    $msg     = "";
    if (getIdDaSessao()=="") 
            {
                echo '<body>';
                echo '<h2>Falha na identifica&ccedil;&atilde;o de acesso</h2>';
                echo 'Clique <a href="/edbd/index.html">aqui</a> para fazer o login no sistema';
                return;
            }             
        else 
            {   
                $idLogin = getIdDaSessao();         
                $msg = sessaoValida($idLogin);

                if ($msg!="OK")
                    {
                        echo '<body>';
                        echo '<h2>Falha na identifica&ccedil;&atilde;o de acesso</h2>';
                        echo $msg."<BR>";
                        echo 'Clique <a href="/edbd/index.html">aqui</a> para fazer o login no sistema';
                        return;
                    }
           }
?>

<!DOCTYPE html>
<html>
<title>CCM do Brasil</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="../jquery-easyui/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../jquery-easyui/themes/icon.css">
<link rel="stylesheet" type="text/css" href="../jquery-easyui/themes/color.css">
<!--<link rel="stylesheet" type="text/css" href="jquery-easyui/demo/demo.css">-->

<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../jquery-easyui/jquery.easyui.min.js"></script>

<!--
<script type="text/javascript" src="js/jquery.include.js"></script>
<script type="text/javascript" src="js/jquery.purl.js"></script>
-->

<link rel="stylesheet" href="../css/w3.css">
<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->

<style>
   @media screen and (max-width: 455px) 
      {
          h2 { font-size:18px; }
          h3 { font-size:16px; }
		}

</style>

<style type="text/css">
    .textbox-readonly .textbox-text
    	{
        	background: #E8E8E8;
    	}
</style>


<body style="background:#e6e6e6; color:black;">

<div class="w3-sidebar w3-light-grey w3-card-4 w3-animate-left" style="width:200px" id="mySidebar">
    <div class="w3-bar w3-dark-grey">
        <span class="w3-bar-item w3-padding-16">Conte&uacute;do</span>
        <button onclick="w3_close()" class="w3-bar-item w3-button w3-right w3-padding-16" title="Fechar o menu de conte&uacute;do">&times;</button>
    </div>
    <div class="w3-bar-block">
        <a class="w3-bar-item w3-button" href="javascript:carregar('../html/home.html')">Home</a>
        <a class="w3-bar-item w3-button" href="javascript:void(0)">Sobre</a>
        <div class="w3-dropdown-hover">
            <a class="w3-button" href="javascript:void(0)">Cadastros <i class="fa fa-caret-down"></i></a>
            <div class="w3-dropdown-content w3-bar-block w3-card-4">
                <a class="w3-bar-item w3-button" href="javascript:carregar('cadastroDeUsuarios.html')">Usu&aacute;rios</a>
                <a class="w3-bar-item w3-button" href="javascript:carregar('teste.html')">Teste</a>
                <a class="w3-bar-item w3-button" href="javascript:carregar('cadastroCustomer.html')">Customer</a>
                <a class="w3-bar-item w3-button" href="javascript:carregar('../html/cadastro/marcaDoVeiculo.html')">Marcas de veiculos</a>
            </div>
        </div>
        <a class="w3-bar-item w3-button" href="javascript:load('ag2.html')">Suporte</a>
    </div>
</div>

<div id="main" style="background-color: #C0C0C0;">
    <div class="w3-container w3-display-container">
	    <div class="w3-center"><h2>CCM do Brasil</h2></div>
        <span title="open Sidebar" style="display:none" id="openNav" class="w3-button w3-transparent w3-display-topleft w3-xlarge" onclick="w3_open()">&#9776;</span>
    </div>
</div>
<div align="center" id="conteudo" class="easyui-panel" title="Conteúdo" data-options="fit:true,border:false" noheader="true" style="background-color: #FFFFFF;">
    teste
</div>


<script>

function w3_open() 
    {
        document.getElementById("main").style.marginLeft = "180px";
        document.getElementById("mySidebar").style.width = "180px";
        document.getElementById("mySidebar").style.display = "block";
        document.getElementById("openNav").style.display = 'none';
    } // function w3_open() 

function w3_close() 
    {
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("mySidebar").style.display = "none";
        document.getElementById("openNav").style.display = "inline-block";
    } // function w3_close() 

function carregar(caminho)
    {

    	$('#conteudo').panel('refresh',caminho);
    	w3_close();
    } // function load()


$(document).ready(function()
    {
		w3_close();
    	$('#conteudo').panel('refresh','../html/home.html');
    });


</script>
      
</body>
</html> 

