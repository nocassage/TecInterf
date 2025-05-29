import "./Profile.css"
import user from "../../assets/images/user.png"

const Profile = () => {
    return (
        <div className="profile-page">
            <img src={user} alt="User" className="profile-image" />
            <div className="content">
                
                <div className="profile-info">
                    <label>Nome do Cuidador:</label> 
                    <input type="text" className="input" placeholder="Nome"/> {/*value={roomID} onChange={(e) =>  setRoomID(e.target.value)}*/}
                </div>
                <div className="profile-info">
                    <label>Nome do Utente:</label> 
                    <input type="text" className="input" placeholder="Nome"/> {/*value={roomID} onChange={(e) =>  setRoomID(e.target.value)}*/}
                </div>
                <div className="profile-info">
                    <label>ID do Utente:</label> 
                    <input type="text" className="input" placeholder="ID"/> {/*value={roomID} onChange={(e) =>  setRoomID(e.target.value)}*/}
                </div>
            </div>
            <button className="enter"><p>ENTRAR</p> </button>
        </div>
    )
}

export default Profile