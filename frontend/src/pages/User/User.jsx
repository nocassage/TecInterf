import "./User.css"
import user from "../../assets/images/user.png"
import mensage from "../../assets/images/mensage.png"
import clock from "../../assets/images/clock.png"
import person from "../../assets/images/person.png"


const User = () => {
    return (
        <div className="user-page">
            <div className="user-header">
                <img src={user} alt="User" className="prof-image" />
                <span className="user-name">Nome do Idoso</span>
            </div>

            <div className="user-content">

                <div className="user-info">
                    <label>Nome:</label>
                    <input type="text" className="input" placeholder="Nome" />
                </div>
                <div className="user-info">
                    <label>E-mail:</label>
                    <input type="email" className="input" placeholder="e-mail" />
                </div>
                <div className="user-info">
                    <label>CC:</label>
                    <input type="text" className="input" placeholder="CC" />
                </div>
                <div className="user-info">
                    <label>NIF:</label>
                    <input type="text" className="input" placeholder="NIF" />
                </div>
                <div className="user-info">
                    <label>NUS:</label>
                    <input type="number" className="input" placeholder="NUS" />
                </div>
                <div className="user-info">
                    <label>Tipo Sanguíneo:</label>
                    <input type="text" className="input" placeholder="sangue" />
                </div>
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
    )
}

export default User
