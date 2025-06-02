import "./Notificacao.css"
import micro from "../../assets/images/micro.png"
import { useState, useEffect } from "react";

const Notificacao = () => {
    const [content, setContent] = useState([]);
    const frases = [
        "Tomei o comprimido",
        "Já tomei o comprimido",
        "Comprimido tomado",
        "Comprimido tomado com sucesso",
    ]

    function handleClick() {
        const recognition = new webkitSpeechRecognition();
        recognition.interimResults = true
        recognition.lang = "pt-PT"
        recognition.continuous = true
        recognition.start()
        recognition.onresult = function (event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    console.log(event.results[i][0].transcript.trim())
                    if (event.results[i][0].transcript.trim() == content) {
                        console.log('Olá! Como posso ajudar?')
                    }
                }
            }
        }
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * frases.length)
        setContent(frases[randomIndex])
    }, [])

    return (
        <div className="notif-page">
            <div className="hora">
                <p>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}</p>
                <h2>Suplemento</h2>
            </div>
            <p>Carrege no microfone e diga: {content}</p>
            <button class="image" onClick={handleClick}>
                <img src={micro} alt="Botão Imagem" className="micro-image" />
            </button>
        </div>
    )
}

export default Notificacao