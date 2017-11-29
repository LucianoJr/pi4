<?php


include '../../comum.php';
include '../../geral.php';
include '../../conexao.php';

include '../../sessao.php';


if (!$statusDaSessao=="OK")
	return;


$tabela = "marcaDoVeiculo";
$campoPesquisa = "nome";
//$camposRetorno = "marca,nome,campoC,campoI,campoD";
$camposRetorno = "marca,nome";


include '../../modelos/datagrid01.php';

?>
   