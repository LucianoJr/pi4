<?php

$server1 = "172.16.10.59:3306";
$server2 = "ccm_142:3306";
$server3 = "localhost:3306"; 

$servername = $server2;
$dbname     = "ed"; 
$dbusername = "root"; 
$dbpassword = "1qaz2wsx"; 

//Connect to database
$conexao = mysqli_connect($servername,$dbusername,$dbpassword);
mysqli_select_db($conexao, $dbname);


require('../../fpdf/mysql_table.php');

class PDF extends PDF_MySQL_Table
	{
		function Header()
			{
		        global $titulo1;
		        global $titulo2;

				$this->moldura(5,5,292,205); // lin, col1, lin2, col2)   
				$this->SetFont('Arial','B',16);
				$this->Cell(40,10,$titulo1);
				$this->Ln(8);
				$this->Cell(40,10,$titulo2);

				$this->Ln(8);
				parent::Header();
			}
	}

$pdf = new PDF();
$pdf->AddPage();
$pdf->Table($conexao,"select $campos from $tabela $ordem");
$pdf->Output();

?>

