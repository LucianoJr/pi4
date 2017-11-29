<?php
include 'comum.php';
include 'geral.php';
include 'conexao.php';


//$fp = fopen('data.txt', 'w');
//fwrite($fp,"linha2=".$linhaDeComando.PHP_EOL);
//fclose($fp);



$marca = "100";
$nome = "Outra marca";


$linhaDeComando = "insert into marcadoveiculo (marca,nome) values (:marca, :nome)";
$comando = getConexao()->prepare($linhaDeComando); 
$comando->bindValue(':marca',$marca);
$comando->bindValue(':nome',$nome);

try 
    {
		$comando->execute();
		echo "Registro incluído";
    } 
catch (PDOException $e) 
    { 
        $error = $e->getMessage();
		echo $error;
    }

?>

