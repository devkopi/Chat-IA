const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        sendMessage();
    }
});


function sendMessage(){
    const message = userInput.value.trim();
    // Este if reconoce que el mensaje está vacio
    if(message === ''){
        return;
    }
    
    // Mensaje = developer/desarrollador
    else if(message === 'developer'){
        // Eliminar el Valor del input
        userInput.value = '';
        // Anexar el mensaje como usuario y será codificado como función
        appendMessage('user', message);
        // Se está estableciendo un tiempo de carga falso.
        setTimeout(() => {
            appendMessage('bot', 'Hecho por @sxnnt1ago.l\nBasado en AsmrProg');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    appendMessage('user', message);
    userInput.value = '';


    const options = {
        method: 'POST',
	    headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': 'b96a471d0bmsh899b79ef312e74bp1edf0djsn566309c7f9b3',
		'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
	    },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    };
    fetch('https://chat-gpt26.p.rapidapi.com/', options).then((Response) => Response.json()).then((Response) =>{
        appendMessage('bot', Response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if(err.name === 'TypeError'){
            appendMessage('bot', 'Error : Revisa la key de tu API');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}


function appendMessage(sender, message){
    info.style.display = "none";
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');


    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');



    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // Se agregan los respectivos iconos tanto de usuario como del robot
    if(sender === 'user'){
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    }else{
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}