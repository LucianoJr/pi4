
<?php

include '../../comum.php';
include '../../geral.php';
include '../../conexao.php';

include '../../sessao.php';


if (!$statusDaSessao=="OK")
	return;


$tabela = "marcaDoVeiculo"; 
$campoChave = "marca";
$campos = "nome";

include '../../modelos/alterar01.php';

?>
