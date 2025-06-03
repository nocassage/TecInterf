import "./Notificacao.css"
import micro from "../../assets/images/micro.png"
import { useState, useEffect } from "react"
import axios from "axios"

const Notificacao = () => {
    const [content, setContent] = useState([])
    const frases = [
        "Tomei o comprimido",
        "Já tomei o comprimido",
        "Comprimido tomado",
        "Comprimido tomado com sucesso",
    ]
    const [correct, setCorrect] = useState(false)

    const handleClick = () => {
        const recognition = new webkitSpeechRecognition();
        recognition.interimResults = true
        recognition.lang = "pt-PT"
        recognition.continuous = true
        recognition.start()
        recognition.onresult = function (event) {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    console.log(content)
                    console.log(event.results[i][0].transcript.trim())
                    if (event.results[i][0].transcript.trim().toLowerCase() == content.toLowerCase()) {
                        console.log("Correct phrase spoken")
                        setCorrect(true)
                    }
                }
            }
        }
    }

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * frases.length)
        setContent(frases[randomIndex])
    }, [])

    const deactivate = async() => {
        try {
            await axios.post('http://localhost:3001/deactivate')
            
        } catch (error) {
            console.error('Error deactivating alarm:', error)
        }
        setTimeout(() => {
            //window.location.href = "/alarms"
        }, 2000)
    }

    useEffect(() => {
        if (correct) {
            deactivate()
        }
    }, [correct])

    return (
        <div className="notif-page">
            <div className="hora">
                <p>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}</p>
                <h2>Suplemento</h2>
            </div>
            <p>Carrege no microfone e diga: {content}</p>
            <button className="image" onClick={handleClick}>
                <img src={micro} alt="Botão Imagem" className="micro-image" />
            </button>
        </div>
    )
}

export default Notificacao