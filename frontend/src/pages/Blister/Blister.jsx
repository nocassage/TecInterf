import "./Blister.css"
import mensage from "../../assets/images/mensage.png"
import pill from "../../assets/images/pill.png"
import person from "../../assets/images/person.png"

const Blister = () => {
    return (
        <div className="blister-page">
            <h1>TRACK DE MEDICAÇÃO</h1>
            <div className="info">
                <div className="ponto">
                <div className="check"></div> <p>Por Tomar</p></div>
                <div className="ponto">
                <div className="check"></div> <p>Esquecido</p></div>
                <div className="ponto">
                <div className="check"></div> <p>Tomado</p></div>
            </div>
            <div className="verificacao">
                <h2>15/03/2025</h2>
                     <div className="linha"></div>
                        <div className="pontoAlt">
                            <p>Hora</p>
                            <p>Nome</p>
                            <div className="check"></div>
                        </div>
            </div>
          <div className="menu-buttons">
                          <button className="image-button">
                              <img src={mensage} alt="Message Icon" className="button-image" />
                          </button>
                          <button className="image-button">
                              <img src={pill} alt="Pill Icon" className="button-image" />
                          </button>
                          <button className="image-button">
                              <img src={person} alt="User Icon" className="button-image" />
                          </button>
           </div>
        </div>
    )
}

export default Blister