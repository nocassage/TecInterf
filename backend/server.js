const express = require('express')
const cors = require('cors')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Update this to match your actual COM port or /dev/tty*
const arduinoPort = new SerialPort({
  path: '/dev/tty.usbmodem21401', // e.g., '/dev/ttyUSB0' on Linux
  baudRate: 9600,
})

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Print Arduino output to the Node.js console
parser.on('data', (line) => {
  console.log('[Arduino]', line.trim());
});

arduinoPort.on('open', () => {
  console.log('Serial connection to Arduino opened.')
})

app.post('/set-alarm', (req, res) => {
    console.log('Received request to set alarm:', req.body)
    const time = req.body.time ? req.body.time : null
    const weekday = req.body.weekday ? req.body.weekday : null

    if (!time) return res.status(400).send('Missing time')
    else if (!weekday) return res.status(400).send('Missing weekday')

    // Save the alarm to alarms.json
    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(__dirname, 'alarms.json')
    if (!fs.existsSync(filePath)) return res.status(404).send('No alarms found')

    let alarms = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    alarms.alarms.push({ time, weekday })
    // Sort alarms by weekday and time
    // alarms.alarms.sort((a, b) => {
    //     const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    //     const dayA = daysOfWeek.indexOf(a.weekday)
    //     const dayB = daysOfWeek.indexOf(b.weekday)
    //     if (dayA !== dayB) return dayA - dayB
    //     return a.time.localeCompare(b.time)
    // })
    
    fs.writeFileSync(filePath, JSON.stringify(alarms, null, 2), 'utf8')

    const jsonData = JSON.stringify(alarms.alarms)
    arduinoPort.write(jsonData, (err) => {
        if (err) return res.status(500).send('Error sending command to Arduino')
        console.log('Sent to Arduino:', jsonData.trim());
        res.send('Alarm set')
    })
})

app.get('/alarms', (req, res) => {
    console.log('Received request for alarms')

    const fs = require('fs')
    const path = require('path')
    const filePath = path.join(__dirname, 'alarms.json')
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('No alarms found')
    }
    const alarms = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!alarms || alarms.length === 0) {
        return res.status(404).send('No alarms found')
    } else {
        console.log('Alarms found:', alarms)
        const jsonData = '<' + JSON.stringify(alarms.alarms) + '>'
        arduinoPort.write(jsonData, (err) => {
            if (err) return res.status(500).send('Error sending command to Arduino')
            console.log('Sent to Arduino:', jsonData.trim());
        })
        res.json(alarms)
    }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

