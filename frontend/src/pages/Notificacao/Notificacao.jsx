import "./Notificacao.css"
import micro from "../../assets/images/micro.png"

const Notificacao = () => {
    return (
        <div className="notif-page">
            <div className="hora">
                <h1>17:30</h1>
                <h2>Suplemento</h2>
            </div>
            <button class="image" onclick="alert('Fale agora!')">
                <img src={micro} alt="Botão Imagem" className="micro-image" />
            </button>
        </div>
    )
}

export default Notificacao