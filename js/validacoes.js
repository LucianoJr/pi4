

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
}


function mostraMsgErro (msg)
    {       
        var posX, posY; //position of popup
        var w=600, h=200; //size of popup
        var offsetX=200, offsetY=150; //x and y offset relative to the parent window
        if (typeof window.screenLeft != "undefined")
                { //IE
                    posX = window.screenLeft/2 + offsetX;
                    posY = window.screenTop/2 + offsetY; 
                }
            else 
                if (typeof window.screenX != "undefined")
                        { //NS/Moz
                            posX = window.screenX/2 + offsetX;
                            posY = window.screenY/2 + offsetY;
                        }
                    else 
                        { //default - center of screen
                            posX = screen.availWidth/2 - w/2;
                            posY = screen.availHeight/2 - h/2;
                        }

          janErros = window.open('','janErros','toolbar=0,location=0,diretories=0,status=0,menubar=0,scrollbars=1,resizable=0,width=' + w + ',height=' + h + ',left=' + posX + ',top=' + posY );
          janErros.document.open(); 
          janErros.document.writeln('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">'); 
          janErros.document.writeln('<html>'); 
          janErros.document.writeln('<head>'); 
          janErros.document.writeln('<title>Mensagens de Erro</title>'); 
          janErros.document.writeln('<style type="text/css"> body, td { background-color: #FFFFF4; border: 0px solid #ECEDFF; color: #800000; font-family: Helvetica, Geneva, Arial, sans-serif; font-size: 12px; font-style: normal; font-weight: bold; border-style: solid; } </style>');
          janErros.document.writeln('</head>');
          janErros.document.writeln('<body>');       
          janErros.document.writeln('<form name="formMsg" method="post">');       
          janErros.document.writeln('<table border="0" width="100%">');
          janErros.document.writeln('   <tr>');
          janErros.document.writeln('      <td align="center"><img src="/website/images/x96.png"></td>');
          janErros.document.writeln('      <td>');
          janErros.document.writeln('         <table width="100%">');
          janErros.document.writeln(             msg);
          janErros.document.writeln('         </table>');
          janErros.document.writeln('      </td>');
          janErros.document.writeln('   </tr>');
          janErros.document.writeln('   <tr>');       
          janErros.document.writeln('      <td colspan="2" align="right"><input type="button" name="fechar" value="Fechar" onclick="window.close()"></td>');
          janErros.document.writeln('   </tr>');
          janErros.document.writeln('</table>');
          janErros.document.writeln('</form>');
          janErros.document.writeln('</body>');
          janErros.document.writeln('</html>');
          janErros.document.close();
          janErros.focus();
    }




function valorInteiro(campo,labelDoCampo,permiteNulo,valorMinimo,valorMaximo)
    {
        var msg = "";
        var charValido = "-0123456789";
        var flag1 = 1;
        var flag2 = 1;

        /* remove os caracteres em branco gerados pela formatacao do banco */ 
        var conteudo = "";
        conteudo = campo.value;
        conteudo = conteudo.trim();
        campo.value = conteudo;


        if (permiteNulo != "sim")
           { 
              if (campo.value == "")
                 msg = "<li>" + labelDoCampo + " n&#227;o pode ser nulo.</li>";
           }

        for (var x = 0; x < campo.value.length; x++) 
            {
               if (charValido.indexOf(campo.value.substring(x,x+1)) == -1)
                  flag1 = 0;
               if ((campo.value.substring(x,x+1) == "-") && (x!=0))
                  flag2 = 0;     
           } 

        if (flag1 == 0)
           msg = msg + "<li>" + labelDoCampo + " deve possuir apenas n&#250;meros.</li>";  

        if (flag2 == 0)
           msg = msg + "<li>" + labelDoCampo + " possui o sinal negativo fora de posiç&#227;o.</li>";  

        if (msg == "")
           {  
              if (campo.value < valorMinimo)
                 msg = msg + "<li>" + labelDoCampo + " deve ser maior que " + (valorMinimo - 1) + ".</li>";
              if (campo.value > valorMaximo)
                 msg = msg + "<li>" + labelDoCampo + " deve ser menor que " + (valorMaximo + 1) + ".</li>";                                                   
           }
    
        return  msg;

    } // function valorInteiro(campo,labelDoCampo,permiteNulo,valorMaximo,valorMinimo)

function valorData(campo,labelDoCampo,permiteNulo)
    {   
        var msg = "";
        var p = "";
        var fcont = "nao";
        var z = 1;
        var x = 0; 
        var cv = 0;
        var cv1 = 0;
        var dia = 0;
        var mes = 0;
        var ano = 0;
        var anoChar = "";
        var auxvar = "";
        permiteNulo.toLowerCase();


    p = "0123456789/";
    if (permiteNulo == "sim")
            {  
                if (campo.value == "")
                        {}
                    else    
                        fcont = "sim";
            }           
        else
            {
                if (campo.value == "")
                        msg = msg + "<li>" + labelDoCampo  + " n&#227;o pode ser nula.</li>";
                    else    
                        fcont = "sim";
            }            
    if (fcont == "sim")                            
            {
                for (var x = 0; x < campo.value.length; x++) 
                    {
                        if (p.indexOf(campo.value.substring(x,x+1)) == -1)
                                z = 0;
                        if (campo.value.substring(x,x+1) == "/")
                                cv = cv + 1;
                    } 
                if (cv != 2)
                        z = 0;
                if (z == 0)
                        msg = msg + "<li>" + labelDoCampo  + " possui caracteres que n&#227;o s&#227;o validos.</li>";  
                if (msg == "")
                        {
                            p1 = campo.value.indexOf("/") ;
                            p2 = campo.value.lastIndexOf("/") ;
                            if ((p2 == (p1 + 1)) || (campo.value.substring(0,p1).length == 0) || (campo.value.substring(p1+1,p2).length == 0) || (campo.value.substring(p2+1,campo.value.length).length == 0))
                                    msg = msg + "<li>" + labelDoCampo  + " possui os separadores fora de lugar.</li>";
                                else
                                    {
                                        anoChar = campo.value.substring(p2+1,campo.value.length);                                                                        
                                        if (anoChar.length == 1) anoChar = "200" + anoChar;                                                                        
                                        if (anoChar.length == 2) anoChar = "20" + anoChar;                                                                        
                                        if (anoChar.length == 3) anoChar = "2" + anoChar;                                                                        
                                        campo.value = campo.value.substring(0,p1) + "/" + campo.value.substring(p1+1,p2) + "/" + anoChar;
                                        
                                        dia = parseInt(campo.value.substring(0,p1),10);
                                        mes = parseInt(campo.value.substring(p1+1,p2),10);
                                        ano = parseInt(campo.value.substring(p2+1,campo.value.length),10);
                                        
                                        
                                        if ((mes < 1) || (mes > 12))
                                                msg = msg + "<li>" + labelDoCampo  + " deve possuir o m&#234;s entre 1 e 12.</li>";
                                        if ((mes==1) || (mes==3) || (mes==5) || (mes==7) || (mes==8) || (mes==10) || (mes==12)) 
                                                {
                                                    if ((dia < 1) || (dia > 31))
                                                            msg = msg + "<li>" + labelDoCampo  + " deve possuir o dia entre 1 e 31.</li>";
                                                }
                                            else
                                                {    
                                                    if (mes!=2)
                                                            {
                                                                if ((dia < 1) || (dia > 30))
                                                                        msg = msg + "<li>" + labelDoCampo  + " deve possuir o dia entre 1 e 30.</li>";
                                                            }
                                                        else
                                                            {
                                                                if (mes==2)
                                                                        {
                                                                            if ((ano % 4) == 0)
                                                                                    { 
                                                                                        if ((dia < 1) || (dia > 29))
                                                                                                msg = msg + "</li>" + labelDoCampo  + " deve possuir o dia entre 1 e 29.</li>";
                                                                                    }
                                                                                else
                                                                                    {
                                                                                        if ((dia < 1) || (dia > 28))
                                                                                                msg = msg + "<li>" + labelDoCampo  + " deve possuir o dia entre 1 e 28.</li>";
                                                                                    }
                                                                        }
                                                            }
                                                }
                                    }
                        }
            }
        return msg;
    } // function valorData(campo,labelDoCampo,permiteNulo)
