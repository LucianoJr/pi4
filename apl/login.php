<?php

include 'comum.php';
include 'geral.php';
include 'conexao.php';

$usuarioOK = false;
if (isset($_POST["btnLogin"]))
	{
		// Le valores
		$usuario  = strtoupper($_POST["usuario"]);
		$senha    = $_POST["senha"];
		$ip       = $_SERVER['REMOTE_ADDR'];

        $senha = MD5($senha);

		$comando = getConexao()->prepare("CALL sp_login(:usuario, :senha, :ip)");
		$comando->bindParam(':usuario', $usuario); 
		$comando->bindParam(':senha', $senha); 
		$comando->bindParam(':ip',$ip); 

		try 
    		{
				$comando->execute();
        		$row = $comando->fetch(PDO::FETCH_ASSOC);
        		if (array_key_exists("idDaSessao", $row))
        				{
        					setcookie("idDaSessao",$row['idDaSessao']);
        		   			$usuarioOK = true;
        				}
        			else
        				{
        		   			if (array_key_exists("erro", $row))
        		   					$msg = $row['erro'];
        		   				else
        		   					$msg = "Usuário e/ou senha incorretos";
        				}
        	}
		catch (PDOException $e) 
		    { 
		        $error = $e->getMessage();
				echo $error;
		    }
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		<title>estarUTP - Login</title>
        <link rel="stylesheet" type="text/css" href="../css/login.css">
    </head>
    <body topmargin="0" leftmargin="0">
		<img src="../imagens/logoUTP.jpg">
		<br><br>
		<div id="divPrincipal" class="divPrincipal" align="center">			
			<form name="form" id="form" method="post">
				<input type="hidden" name="btnLogin" value="OK">
				<table cellpadding="2" cellspacing="0" width="300px">
		        	<tr class="trCabecalho">'
		        		<td> Login</td>
		            	<td align="right"><img src="../imagens/cadeado.png" border="0"> 
		            </tr>
		            <tr>
		           		<td colspan="2">&nbsp;</td>
		            </tr>
           			<tr>
           				<td align="right" width="35%"><span id="labelUsuario">Usuário</span>:</td>
           				<td width="65%"><input type="text" size="20" maxlength="30" name="usuario" value="" onKeypress="if (event.keyCode==13) document.form.senha.focus();"></td>
           			</tr>
           			<tr>
           				<td align="right" width="35%"><span id="labelSenha">Senha</span>:</td>
           				<td width="65%"><input type="password" size="20" maxlength="30" name="senha" value="" onKeypress="if (event.keyCode==13) document.form.submit();"></td>
           			</tr>
					<tr>
						<td colspan="2" align="center"><a href="Javascript:document.form.submit();"><img src="../imagens/login.png" border="0"></a></td>
					</tr>
				</table>
			</form>			
			<div align="left">
			<?php
				if (isset($_POST["btnLogin"]))
					{			
						echo "<br><hr>";
						if ($usuarioOK)
								{
									echo 'Bem vindo '.$usuario;
									echo '<script language="Javascript"> document.location.href="estarUTP.php"; </script>';
								}
							else
								{
									echo $msg; //"Usuário e/ou senha incorretos";
								}
					}
			?>
	<script language="Javascript">
		document.form.usuario.focus();
	</script>
	</body>
</html>
