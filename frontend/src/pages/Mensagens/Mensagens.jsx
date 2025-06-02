import React, { useState } from "react";
import "./Mensagens.css";
import mensage from "../../assets/images/mensage.png"
import clock from "../../assets/images/clock.png"
import person from "../../assets/images/person.png"

const Mensagens = () => {
    const [messages, setMessages] = useState([
        { from: "Cuidador 1", to: "Utente 1", text: "Olá, como está?", date: "01/01/2023" },
    ]);

    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessageObject = {
                text: newMessage,
            };
            setMessages([...messages, newMessageObject]);
            setNewMessage("");
        }
    };

    return (
        <div className="mensagens-page">
            <div className="name">
                <h1>Nome</h1>
            </div>
            <div className="mensagens-content">
                {messages.map((message, index) => (
                    <div className="mensagem-item" key={index}>
                        <p><strong>Mensagem:</strong> {message.text}</p>
                    </div>
                ))}
            </div>
            <div className="mensagens-input">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="..."
                ></textarea>
                <button onClick={handleSendMessage}>Enviar</button>
            </div>

            <div className="menu-buttons">
                <button className="image-button">
                    <img src={mensage} alt="Message Icon" className="button-image" />
                </button>
                <button className="image-button">
                    <img src={clock} alt="Clock Icon" className="button-image" />
                </button>
                <button className="image-button">
                    <img src={person} alt="User Icon" className="button-image" />
                </button>
            </div>
        </div>
    );
};

export default Mensagens