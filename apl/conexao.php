<?php

switch (getTipoDeBancoDeDados()) 
    {
        case 'Progress':
            //Progress ODBC
            $servername = "172.16.4.60"; 
            $dbname     = "sports"; 
            $dbusername = "SYSPROGRESS"; 
            $dbpassword = "SYSPROGRESS"; 
            $suportaUsoDeLimit = false;        
            break;
        case 'MySQL':
            //MySql
            $server1 = "172.16.10.59:3306";
            $server2 = "ccm_142:3306";
            $server3 = "localhost:3306"; 

            $servername = $server2;
            $dbname     = "ed"; 
            $dbusername = "root"; 
            $dbpassword = "1qaz2wsx"; 
            $suportaUsoDeLimit = true;
            break;
    } // switch

try 
    {
        switch (getTipoDeBancoDeDados()) 
            {
                case 'Progress':
                    //Progress ODBC
                    $conexaoEmUsoNaSessao = new PDO("odbc:sports", $dbusername, $dbpassword); 
                    break;
                case 'MySQL':
                    //MySQL
                    $conexaoEmUsoNaSessao = new PDO("mysql:host=$servername;dbname=$dbname", $dbusername, $dbpassword); 
                    break;
            } // switch        
        $conexaoEmUsoNaSessao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        $conexaoOK = true;
    } 
catch (PDOException $e) 
    { 
        $conexaoOK = false;
        $error = $e->getMessage();
        printf($error);
    }

if (!$conexaoOK) return;    

?>
  