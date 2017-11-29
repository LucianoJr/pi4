<?php

// Variaveis gerais / globais

define('INCLUIR', 'incluir'); 
define('ALTERAR', 'alterar'); 
define('EXCLUIR', 'excluir'); 

$idEmUsoNaSessao = "";
$nomeDoUsuario   = "";
$tipoDoUsuario   = "";
$statusDaSesssao = "";

$conexaoEmUsoNaSessao = null;

$tipoDeBancoDeDadosDaSessao = "MySQL"; // Progress, MySQL

$suportaUsoDeLimit = false;

date_default_timezone_set('America/Sao_Paulo');

?>
