
<?php

// modelo 01 para rotina de alteração de cadastros

$items = array();
$resultado = array();
$row = array();

/* Pega dados de entrada da tela */
/* Pega chave primária */
$chave = isset($_POST["$campoChave"]) ? ($_POST["$campoChave"]) : '';
$chave = trim($chave);


$msg = '';
if ($chave=='')
		$msg = "Campo chave esta vazio";
	else
		{
			if (ctype_digit($chave)!=1)
				$msg = "O campo chave deve ter apenas números";
		}

if ($msg=='')
	{
		// Atribui o campo chave
		$linha = '$'.$campoChave.' = \''.$chave.'\';';
		eval($linha);

		// Lê e valida demais campos
		$listaDeCampos = explode(",", $campos);
		foreach($listaDeCampos as $item)
			{
				$linha = '$'.$item.' = isset($_POST["'.$item.'"]) ? ($_POST["'.$item.'"]) : \'\';';
				eval($linha);
			}

        $op = ALTERAR;
        include '../validacao/'.$tabela.'.php';
	}

if ($msg!='')
		$resultado["erro"] = $msg;
	else
		{
			$linhaDeComando = "CALL sp_update_$tabela(:usuario, :$campoChave,";
			$listaDeCampos = explode(",", $campos);
			$i = 0;
			foreach($listaDeCampos as $item)
				{
					$i++;
					$linhaDeComando = $linhaDeComando." :".$item;
					if ($i!=count($listaDeCampos))
						$linhaDeComando = $linhaDeComando.",";
				}
			$linhaDeComando = $linhaDeComando.")";

			$comando = getConexao()->prepare($linhaDeComando);

			$usuario = getUsuario();
			$comando->bindParam(':usuario', $usuario); 
			$comando->bindParam(":".$campoChave, $chave); 
			foreach($listaDeCampos as $item)
				{
					$linha = '$comando->bindValue(\':'.$item.'\',$'.$item.');';
					eval($linha);
				}

			try 
			    {
					$comando->execute();				
					$row = $comando->fetch(PDO::FETCH_ASSOC);
					$resultado = $row; 
			    } 
			catch (PDOException $e) 
			    { 
			        $error = $e->getMessage();
					$resultado["erro"] = $error;
			    }
		}

// Retonar dados para a interface
echo json_encode($resultado);

?>

