const express = require('express')
const cors = require('cors')
const { SerialPort } = require('serialport')

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Update this to match your actual COM port or /dev/tty*
const arduinoPort = new SerialPort({
  path: 'COM3', // e.g., '/dev/ttyUSB0' on Linux
  baudRate: 9600,
})

arduinoPort.on('open', () => {
  console.log('Serial connection to Arduino opened.')
})

app.post('/set-alarm', (req, res) => {
    console.log('Received request to set alarm:', req.body)
    const { time } = req.body
    if (!time) {
        return res.status(400).send('Missing time')
    }

  const command = `SET_ALARM ${time}\n`
  arduinoPort.write(command, (err) => {
    if (err) {
      return res.status(500).send('Error sending command to Arduino')
    }
    console.log('Sent to Arduino:', command.trim());
    res.send('Alarm set')
  })
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
