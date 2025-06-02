import "./Alarms.css"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Alarms = () => {
    const [alarms, setAlarms] = useState([
        { time: '08:00', weekday: 'Segunda' },
        { time: '12:00', weekday: 'Quarta' },
        { time: '18:00', weekday: 'Sexta' }
    ])
    const [time, setTime] = useState('')
    const [weekday, setWeekday] = useState('')

    const setAlarm = async () => {
        try {
            await axios.post('http://localhost:3001/set-alarm', { time, weekday })
            alert('Alarm set successfully!')
            setAlarms([...alarms, { time, weekday }])
        } catch (error) {
            alert('Failed to set alarm.')
        }
    }

    const fetchAlarms = async () => {
        try {
            const response = await axios.get('http://localhost:3001/alarms')
            setAlarms(response.data.alarms || [])
        } catch (error) {
            console.error('Error fetching alarms:', error)
            alert('Failed to fetch alarms.')
        }
    }

    useEffect(() => {
        fetchAlarms()
    }, [])

    return (
        <div className="alarms-page">
            <h1>ALARMES DEFINIDOS</h1>
            <div className="alarmes">
                {alarms.map((alarm, index) => (
                    <div className="alarme" key={index}>
                        <h2 className="dia">{alarm.weekday}</h2>
                        <div className="linha"></div>
                        <div className="info">
                            <h2>Hora</h2>
                            <p className="hora">{alarm.time}</p>
                            <p className="tipo">Dose</p>
                            <p className="desc">Comprimido {index + 1}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
                <h2>Set Alarm</h2>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <select
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value)}
                    style={{ marginLeft: '1rem' }}
                >
                    <option value="">Select Weekday</option>
                    <option value="Monday">Segunda</option>
                    <option value="Tuesday">Terça</option>
                    <option value="Wednesday">Quarta</option>
                    <option value="Thursday">Quinta</option>
                    <option value="Friday">Sexta</option>
                    <option value="Saturday">Sábado</option>
                    <option value="Sunday">Domingo</option>
                </select>
                <button onClick={setAlarm} style={{ marginLeft: '1rem' }}>
                    Set Alarm
                </button>
            </div>
        </div>
    )
}

export default Alarms