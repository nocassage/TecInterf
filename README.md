# Pill Alarms using a Arduino UNO, a node server and a React web app

## Pill Alarm
This project is a simple pill alarm system that uses an Arduino UNO to control a buzzer, LED, HC-SR04 sensor, a RTC and a Reed Switch, a Node.js server to manage the alarms, and a React web app to interact with the user.

## Components
- **Arduino UNO**: Controls the buzzer, LED, HC-SR04 sensor, RTC, and Reed Switch.
- **Node.js Server**: Manages the alarms and communicates with the Arduino.
- **React Web App**: Provides a user interface to set and manage alarms.

![Pill Alarm System]("rmImgs/Diagrama.png")

## Installation
1. **Arduino UNO**:  Mount the buzzer, LED, HC-SR04 sensor, RTC, and Reed Switch as per the schematic. Connect you arduino to your computer and upload the Arduino sketch to the Arduino UNO. Check the `Projeto` folder in this repository for the sketch file. You can use the Arduino IDE to upload the sketch.

    - **Buzzer**: Connect to pin 8.
    - **LED**: Connect to pin 9.
    - **HC-SR04**: Connect the trigger pin to pin 10 and echo pin to pin 11.
    - **RTC**: Connect SDA to A4 and SCL to A5.
    - **Reed Switch**: Connect one end to pin 2 and the other end to ground.

   Make sure you have the necessary libraries installed in your Arduino IDE:
   - `RtcDS1302` for RTC functionality
   - `ArduinoJson` for JSON handling

2. **Node.js Server**: Clone the repository and install the dependencies.
Open the project on your preferred IDE and open a terminal in the project directory. Run the following commands:
    ```bash
    cd backend
    npm install
    npm start
    ```
    The server will start on port 3000 by default. You can change the port in the `server.js` file if needed. You also need to change the Arduino port in line 14 of the `server.js` file to match your Arduino's port (e.g., `/dev/ttyUSB0` on Linux or `COM3` on Windows).

3. **React Web App**: Open another terminal in the project directory and run the following commands:
    ```bash
    cd frontend
    npm install
    npm start
    ```

4. **Access the Web App**: Open your web browser and navigate to `http://localhost:5173` to access the React web app.

Available pages:
    - **Home**: Forms to create you account.
    - **Alarms**: Lists all the set alarms and allows you to create them.
    - **Notif**: Allows you to deactivate the alams.
    - **SMS**: Allows you to send SMS messages to the phone number set in the alarms.
    - **User**: Allows you to change your user information.
    - **Bliste**: Allows you to see if the user has taken the pills or not.



    