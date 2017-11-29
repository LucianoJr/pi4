
<?php

// modelo 01 para datagrid de cadastros

$items = array();
$resultado = array();

/* Pega dados de entrada da tela */
$page = isset($_POST['page']) ? intval($_POST['page']) : 1;
$rows = isset($_POST['rows']) ? intval($_POST['rows']) : 10;
$pesquisa = isset($_POST['pesquisa']) ? ($_POST['pesquisa']) : '';

$offset = ($page - 1) * $rows;

$pesquisa = $pesquisa.'%';

$opcao = 'total';
$comando = getConexao()->prepare("CALL sp_Datagrid_MarcaDoVeiculo(:pesquisa, :opcao, :offset, :rows)");
$comando->bindParam(':pesquisa', $pesquisa); 
$comando->bindParam(':opcao', $opcao); 
$comando->bindParam(':offset',$offset);
$comando->bindParam(':rows',$rows);

try 
    {
		$comando->execute();
        $row = $comando->fetchAll(PDO::FETCH_ASSOC);
        $resultado = $row[0];

		$opcao = 'dados';
		$comando = getConexao()->prepare("CALL sp_Datagrid_$tabela(:pesquisa, :opcao, :offset, :rows)");
		$comando->bindParam(':pesquisa',$pesquisa);
		$comando->bindParam(':opcao',$opcao);
		$comando->bindParam(':offset',$offset);
		$comando->bindParam(':rows',$rows);

		try 
		    {
				$comando->execute();
				$row = $comando->fetchAll(PDO::FETCH_ASSOC);
				$resultado["rows"] = $row; 
				echo json_encode($resultado);
		    } 
		catch (PDOException $e2) 
		    { 
		        $error = $e2->getMessage();
				echo $error;
		    }
    } 
catch (PDOException $e1) 
    { 
        $error = $e1->getMessage();
		echo $error;
    }
?>
