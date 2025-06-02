import React, { useState } from "react";
import "./Mensagens.css";
import mensage from "../../assets/images/mensage.png"
import clock from "../../assets/images/clock.png"
import person from "../../assets/images/person.png"
import send from "../../assets/images/send.png"

const Mensagens = () => {
    const [messages, setMessages] = useState([
        { from: "Cuidador 1", to: "Utente 1", text: "Olá, já tomaste o comprimido das 16?", date: "02/06/2025", time: "16:11" },
        { from: "Utente 1", to: "Cuidador 1", text: "Sim o alarme tocou e tomei logo.", date: "02/06/2025", time: "16:11" },
    ]);

    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessageObject = {
                text: newMessage,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessageObject]);
            setNewMessage("");
        }
    };

    return (
        <div className="mensagens-page">
            <div className="top">
                <p><strong>Data:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="name">
                <h1>Avó</h1>
            </div>
            <div className="mensagens-content">
                {messages.map((message, index) => (
                    <div
                        className={`mensagem-item ${message.from === "Cuidador 1" ? "left" : "right"
                            }`}
                        key={index}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="mensagens-input">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="..."
                ></textarea>
                <button className="send-button" onClick={handleSendMessage}>
                    <img src={send} alt="Send Icon" className="button-send" />
                </button>
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