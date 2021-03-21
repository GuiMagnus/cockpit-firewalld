
var result = document.getElementById("textResult");//text area responsável por exibir os dados
const base = "firewall-cmd";//base dos comandos
const prompt = "Firewall-Cmd : ";//promtp
const pathLog = "/usr/share/cockpit/my_packages/log.txt";
const pathLastCommands = "/usr/share/cockpit/my_packages/lastCommands.txt";

/**
 * inicar serviço de firewall
 */
var buttonStartFirewall = document.getElementById("startFirewall");
buttonStartFirewall.onclick = function(){
    
    let command = ["systemctl","start", "firewalld"];
    
    executeCommand(command, "firewalld started");
}

/**
 * Parar serviço de firewall
 */
var buttonStopFirewall = document.getElementById("stopFirewall");
buttonStopFirewall.onclick = function(){
    
    let command = ["systemctl","stop", "firewalld"];
    
    executeCommand(command, "firewalld stoped");
}

/**
 * Habilitar serviço Udp
 */
var buttonEnableUdp = document.getElementById("serviceUdp");
buttonEnableUdp.onclick = function(){
    
    let command1 = [base,"--permanent", "--add-port=3000/udp"];
    let command2 = ["systemctl","restart", "firewalld"];
    let command3 = ["firewall-cmd","--zone=public", "--list-ports"];

    executeCommand(command1);
    executeCommand(command2);
    executeCommand(command3);
    
    let save = [base,"--reload"];
    executeCommand(save);
}

/**
 * Habilitar serviço Tcp
 */
var buttonEnableTcp = document.getElementById("serviceTcp");
buttonEnableTcp.onclick = function(){
    
    let command1 = [base,"--permanent", "--add-port=5000/tcp"];
    let command2 = ["systemctl","restart", "firewalld"];
    let command3 = ["firewall-cmd","--zone=public", "--list-ports"];

    executeCommand(command1);
    executeCommand(command2);
    executeCommand(command3);
    
    let save = [base,"--reload"];
    executeCommand(save);
    
}

/**
 * Habilitar serviço ICMP.
 */
var buttonEnableIcmp = document.getElementById("serviceIcmp");
buttonEnableIcmp.onclick = function(){
    
    let command = [base,"--permanent","--get-icmptypes"];

    executeCommand(command);
    
    let save = [base,"--reload"];
    executeCommand(save);

}

/**
 * Listar todas as Interfaces.
 */
var buttonListInterface = document.getElementById("listInterface");
buttonListInterface.onclick = function(){
    
    let command = [base, "--zone=public", "--list-interfaces"];
    
    executeCommand(command);
}

/**
 * Configurar tráfego(permissao).
 */
var buttonConfigureTraffic = document.getElementById("permitTraffic");
buttonConfigureTraffic.onclick = function(){
    let command = [base,"--panic-of"];
    executeCommand(command);
    let save = [base,"--reload"];
    executeCommand(save);

}

/*
 *Configurar Tráfego(negar)
 * */
var buttonConfigureTrafficN = document.getElementById("negateTraffic");
buttonConfigureTrafficN.onclick = function(){
	let command = [base,"--panic-on"];
	executeCommand(command);
}
/**
 * Obter o status do serviço de firewall.
 */
var buttonStatusFirewall = document.getElementById("statusFirewall");
buttonStatusFirewall.onclick = function(){
    
    let command = [base, "--state"];
    
    executeCommand(command);
}

/**
 * Listar todas as portas.
 */
var buttonListPort = document.getElementById("listPort");
buttonListPort.onclick = function(){
    
    let command = [base, "--list-ports"];
    
    executeCommand(command);
}


/*
 * Inserir Regra
 * */
var ruleInput = document.getElementById("inputInsertRule");
var buttonInsertRule = document.getElementById("insertRule");
buttonInsertRule.onclick = function(){
	let command = [base,"--zone=public","--add-service="+ruleInput.value,"--permanent"];
	executeCommand(command);

    let save = [base,"--reload"];
    executeCommand(save);
    
}

/*
 * Inserir Regra na posição. Aqui deve ser inserido a zona e a regra.
 * */
var ruleInputPosition = document.getElementById("inputInsertRulePosition");
var buttonInsertRulePosition = document.getElementById("insertRule");
buttonInsertRulePosition.onclick = function(){
	let command = [base,"--zone=public","--add-service="+ruleInputPosition.value,"--permanent"];
	executeCommand(command);

    let save = [base,"--reload"];
    executeCommand(save);

}

/*
 * Deletar regra.
 * */
var ruleDelete = document.getElementById("inputDeleteRule");
var buttonDeleteRule = document.getElementById("deleteRule");
buttonDeleteRule.onclick = function(){
	let command = [base,"--zone=public","--remove-service="+ruleDelete.value,"--permanent"];
	executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/*
 * Inserir Porta
 * */
var inputAddPort = document.getElementById("inputAddPort");
var buttonInputAddPort = document.getElementById("addPort");
buttonInputAddPort.onclick = function(){
    
    var port = Number(inputAddPort.value.split('/')[0]);
    
    if(port < 1 || port > 65535){
        alert("Porta fora do Invervalo (1  - 65535)");
        return;
    }
	let command = [base,"--zone=public","--permanent","--add-port="+inputAddPort.value];
	executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/*
 * Remover Porta
 * */
var inputRemovePort = document.getElementById("inputRemovePort");
var buttonInputRemovePort = document.getElementById("removePort");
buttonInputRemovePort.onclick = function(){
    
    var port = Number(inputAddPort.value.split('/')[0]);
    
    if(port < 1 || port > 65535){
        alert("Porta fora do Invervalo (1  - 65535)");
        return;
    }
	let command = [base,"--zone=public","--permanent","--remove-port="+inputAddPort.value];
	executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/**
 * Listar todas as regras de firewall habilitadas.
 */
var buttonListRules = document.getElementById("listRule");
buttonListRules.onclick = function(){
    
    let command = [base, "--list-all"];
    
    executeCommand(command);
}

/**
 * Habilitar mascaramento na interface Interna.
 */
var buttonInAccept = document.getElementById("inAceppt");
buttonInAccept.onclick = function(){
    
    let command = [base,"--permanent", "--zone=internal", "--add-masquerade"];
    
    executeCommand(command);
    let save = [base,"--reload"];
    executeCommand(save);
}

/**
 * Habilitar mascaramento na interface externa.
 */
var buttonOutAccept = document.getElementById("outAceppt");
buttonOutAccept.onclick = function(){
    
    let command = [base,"--permanent","--zone=external", "--add-masquerade"];
    
    executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/**
 * Negar mascaramento na interface interna.
 */
var buttonInDeny = document.getElementById("inDeny");
buttonInDeny.onclick = function(){
    
    let command = [base,"--permanent","--zone=internal", "--remove-masquerade"];
    
    executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/**
 * Negar mascaramento na interface externa. 
 */
var buttonOutDeny = document.getElementById("outDeny");
buttonOutDeny.onclick = function(){
    
    let command = [base,"--permanent","--zone=external", "--remove-masquerade"];
    
    executeCommand(command);

    let save = [base, "--reload"];
    executeCommand(save);
}

/**
 * Exibe uma lista com todos os comandos executados. 
 */
 var buttonLastCommands = document.getElementById("listCommands");
 buttonLastCommands.onclick = function(){
     
    let command = ["cat", pathLastCommands];
    
    executeCommand(command, "\n\n##############################ÚLTIMOS COMANDOS DIGITADOS##############################\n");

 }//buttonLog


/**
 * Exibe um log de acesso do usuário.
 */
 var buttonLog = document.getElementById("log");
 buttonLog.onclick = function(){
     
    let command = ["cat", pathLog];
    
    executeCommand(command, "\n\n##############################LOG DE ACESSO##############################\n");

 }//buttonLog

  /**
  * Gera um log contendo o comando digitado pelo usuário do serviço o status e a data hora do mesmo.
  */
   function saveLastCommands(cmdExecute){

    let tempCommands = " " + prompt; 
    for(var pos =1; pos < cmdExecute.length;pos++){
        tempCommands += " " + cmdExecute[pos];
    }
        
    
    var writeCommands = "echo" + tempCommands +" >> " +pathLastCommands;

    console.log(writeCommands);

    cockpit.script(writeCommands);
 }//generateLog

 /**
  * Gera um log contendo o comando digitado pelo usuário do serviço o status e a data hora do mesmo.
  * @param {A relação de comandos executados} log 
  */
 function generateLog(log){

    let data = new Date(); 
    log += " - " + data;
    var myLog = JSON.stringify(log);

    let tempWriteLog = myLog.replace(',', ' ');
    var writeLog = "echo " + tempWriteLog +" >> " +pathLog;

    cockpit.script(writeLog);
 }//generateLog

/**
 * 
 * @param {*Deve ser passado como parâmetro um vetor de Strings} parameteers 
 */
function executeCommand(parameters, optionalMessage){

    if(parameters[0] != 'cat'){
        saveLastCommands(parameters);
    }

    result.style.color = "white";
    result.value += "\n" + prompt + optionalMessage;

    cockpit.spawn(parameters).stream(
        res => 
        {           
            result.style.color = "white";
            result.value += "\n" + prompt + res;

            parameters.push(" - Success");

            if(parameters[0] != 'cat'){
                generateLog(parameters);//Armazena o comando, o resultado e a data/hora no Log.
            }
        
            

        }
        ).catch( err =>
            {
                result.value += prompt + err;
                result.value += "\n";    
                
                parameters.push(" - Error");

                if(parameters[0] != 'cat'){
                    generateLog(parameters);//Armazena o comando, o resultado e a data/hora no Log.
                }

            }
        );
}//executeCommand


// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
