import ChatBot from "react-chatbotify";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatBotFooter from "./ChatBotFooter";
import axios from 'axios';
import React, { useState } from 'react';

const MyChatBot = () => {
    const [dynopt, setopt] = useState([]);
    async function run(prompt) {
        const data = { 'ques': prompt };
        try {
            const resp = await axios.post('http://localhost:5001/getAIResponse/data', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const respob = JSON.parse(resp.data)
            console.log(respob)
            setTimeout(() => {
                setopt(respob.options);
            }, 1000);
            console.log(dynopt);
            return respob.answer;
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    const options = {
        theme: { primaryColor: 'black', secondaryColor: '#608CFE' },
        chatHistory: { storageKey: "playground", chatHistoryLineBreakText: "Previous Messages" },
        botBubble: { simStream: true },
        botBubbleStyle: { color: '#000' },
        userBubbleStyle: { color: "#fff" },
        tooltip: { text: "Talk to me!" },
        tooltipStyle: { color: "#000" },
        sendButtonStyle: { background: "#608CFE" },
        sendButtonHoveredStyle: { opacity: 0.9 },
        headerStyle: { fontWeight: "bold", background: "#608CFE", color: "#000" },
        header: { title: "Kavach AI" },
        footer: { text: <ChatBotFooter name="Kavach" /> },
        footerStyle: {
            paddingBottom: "10px",
        },
        notification: { disabled: true },
        fileattachment: { disabled: true }
    }
    const flow = {
        start: {
            message: "Hello 👋, I am Kavach AI, a personalised chatbot prepared to enhance your eKYC process and solve your queries regarding this initiative. Ask me anything!",
            path: "model_loop",
        },
        model_loop: {
            message: async (params) => {
                return await run(params.userInput);
            },
            transition: { duration: 500 },
            path: "show_options"
        },
        show_options: {
            options: dynopt,
            path: "model_loop"
        }
    }

    return (
        <ChatBot options={options} flow={flow} />
    );
};
export default MyChatBot;