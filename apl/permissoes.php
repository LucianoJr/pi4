<?php

    include 'comum.php';
    include 'geral.php';
    include 'conexao.php';
    include 'sessao.php';

    global $statusDaSessao;
    global $tipoDoUsuario;


echo "teste";

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
                    else
                        echo "tipo=".$tipoDoUsuario;
           }
?>
