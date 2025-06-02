import "./Alarms.css"

const Alarms = () => {
    return (
        <div className="alarms-page">
           <h1>ALARMES DEFINIDOS</h1>

           <div className="alarmes">

           <h2>Segunda, Quarta e Sexta</h2>
           <div className="linha"></div>
           <div className="info">
           <h2>Hora</h2>
           <p className="tipo">Tipo de dose</p>
           <p className="desc">Descrição do comprimido lorem ipsum </p>
           </div>
           </div>
        </div>
    )
}

export default Alarms