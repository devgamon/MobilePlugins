function Mostar(){
    var Nome = document.getElementById("name").value;
    function alertDismissed(){
}

    navigator.notification.alert('Bem vindo '+Nome,alertDismissed,'Seja bem vindo','Ok');
}

function MostraIdade(){
    var Idade = parseInt(document.getElementById("IdadeHtml").value);
    if (Idade >= 18 ){
        function onConfirm(buttonIndex) {
            if(buttonIndex == 1 ){
                alert('Você é obrigado a se alistar!');
            }else{
                 alert('Você pode tirar sua habilitação!');
            }
        } 
        navigator.notification.confirm('Qual seu sexo?',onConfirm,'Alerta',['Homem','Mulher']); 
    }
}

function Sair(){
    navigator.vibrate(3000);
    navigator.app.exitApp();
}