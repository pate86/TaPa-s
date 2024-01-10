"use strict";

const inputEl = document.querySelector(".input-chat");
const btnEl = document.querySelector(".fa-paper-plane");
const cardBodyEl = document.querySelector(".card-body");

let userMessage;
const OPENAI_API_KEY = "API_KEY"; //  muss eingefüpgt werden !!!
const URL = "https://api.openai.com/v1/chat/completions";

const chatGenerator = () => {
    const requestOption = {
        method : "POST",
        headers: {
            "content-type": "application/json",
            autorization : `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            modal: "gpt-3.5-turbo-16k",
            message: [
                {
                role: "system",
                content : userMessage,
                }
            ],
        }),

    };

    fetch(URL, requestOption)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });

};



// manage chat
function manageChat() {
    userMessage = inputEl.value.trim();

    if (!userMessage) return;
    inputEl.value = "";    

    cardBodyEl.appendChild(messageEl(userMessage, "user"));

    setTimeout(() => {
        cardBodyEl.appendChild(messageEl("Ich schicke dir gleich etwas Köstliches zu, Augenblick bitte. . .", "chat-bot"));
        chatGenerator();
    }, 600);
}


//messages 
const messageEl = (message, className) =>{
    const chatEl = document.createElement("div");
    chatEl.classList.add("chat", `${className}`);
    let chatContent = 
        className === "chat-bot"
            ? `<span class="user-icon"><i class="fa fa-robot"></i></span>
    <p>${message}</p>`
            : ` <span class="user-icon"><i class="fa fa-user"></i></span>
    <p>${message}</p>`;
    chatEl.innerHTML = chatContent;
    return chatEl;
};

btnEl.addEventListener("click", manageChat);
