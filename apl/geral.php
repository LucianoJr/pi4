<?php


function getIdDaSessao()
    {
        global $idEmUsoNaSessao;
        
        if (!isset($_COOKIE["idDaSessao"])) 
                $idEmUsoNaSessao = "";
            else
                $idEmUsoNaSessao = $_COOKIE["idDaSessao"];    

        return $idEmUsoNaSessao;
    } // function getIdDaSessao()


function getUsuario()
    {
        global $nomeDoUsuario;

        return $nomeDoUsuario;
    } // function getUsuario()


function getTipoDeBancoDeDados()
    {
        global $tipoDeBancoDeDadosDaSessao;

        return $tipoDeBancoDeDadosDaSessao;
    } // function getUsuarioDaSessao()


function getConexao()
    {
        global $conexaoEmUsoNaSessao;

        return $conexaoEmUsoNaSessao;
    } // function getConexao()


function getSuportaLimit()
    {
        global $suportaUsoDeLimit;

        return $suportaUsoDeLimit;
    } // function getConexao()


function sessaoValida($idDaSessao)
    {
        global $idEmUsoNaSessao;
        global $nomeDoUsuario;
        global $tipoDoUsuario;

        $ip = $_SERVER['REMOTE_ADDR'];

        $comando = getConexao()->prepare("CALL sp_usuarioDaSessao(:idDaSessao, :ip)");
        $comando->bindParam(':idDaSessao', $idEmUsoNaSessao); 
        $comando->bindParam(':ip',$ip); 

        try 
            {
                $comando->execute();
                $row = $comando->fetch(PDO::FETCH_ASSOC);
                if (array_key_exists("usuario", $row))
                        {
                            $nomeDoUsuario = $row['usuario'];
                            $msg = "OK";
                            if (array_key_exists("tipo", $row))
                                $tipoDoUsuario = $row['tipo'];

                           // echo $tipoDoUsuario."-".$nomeDoUsuario;
                        }
                    else
                        {
                            if (array_key_exists("erro", $row))
                                    $msg = $row['erro'];
                                else
                                    $msg = "Erro de login";
                        }
            }
        catch (PDOException $e) 
            { 
                $error = $e->getMessage();
                echo $error;
            }

        return $msg;
    }

function gravaLogDeEventos($_tabela,$_operacao,$_acao)
    {
        $retorno = '';
        /* 
        $hoje = date('Y-m-d H:i:s');
        $usuario = getUsuarioDaSessao();

        $linhaDeComandoLog = "insert into logdeevento (tabela,evento,dataHora,operador,acao) values (:tabela, :evento, :dataHora, :operador, :acao)";
        $comandoLog = getConexao()->prepare($linhaDeComandoLog); 
        $comandoLog->bindValue(':tabela',$_tabela);
        $comandoLog->bindValue(':evento',$_operacao);
        $comandoLog->bindValue(':dataHora',$hoje);
        $comandoLog->bindValue(':operador',$usuario);
        $comandoLog->bindValue(':acao',$_acao);

        try 
            {
                $comandoLog->execute();
                $retorno = "OK";
            } 
        catch (PDOException $eLog) 
            { 
                $errorLog = $eLog->getMessage();
                $retorno = $errorLog; 
            }

        */
        return $retorno;

    } // function gravaLogDeEventos($tabela,$operacao,$acao)

?>
  