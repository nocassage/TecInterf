#include <RtcDS1302.h>
#include <TimeLib.h>
#include <ArduinoJson.h>

String inputString = "";
bool stringComplete = false;

struct Alarm {
  String weekday;
  String time;
};

const int MAX_ALARMS = 21;
Alarm alarms[MAX_ALARMS];
int alarmCount = 0;
int index = -1;
int controller = -1;

String serialBuffer = "";
bool receiving = false;

const int leds[] = { 2, 3, 4, 5 };
#define closePin 6
#define trigPin 7
#define echoPin 8
#define buzzerPin 9

float distance;
bool asRinged = false;
bool deactivate = true;
String deactivation;
// Define pins: DAT, CLK, RST
ThreeWire myWire(11, 10, 12);  // IO, SCLK, CE
RtcDS1302<ThreeWire> rtc(myWire);

void setup() {
  Serial.begin(9600);  // Start Serial Monitor

  for (int i = 0; i < sizeof(leds); i++) {
    pinMode(leds[i], OUTPUT);
  }

  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(closePin, INPUT_PULLUP);

  Serial.begin(9600);
  rtc.Begin();

  rtc.SetIsWriteProtected(false);
  rtc.SetIsRunning(true);

  rtc.SetDateTime(RtcDateTime(__DATE__, __TIME__));

  delay(100);  // Short delay
}

void loop() {
  int state = digitalRead(closePin);
  RtcDateTime now = rtc.GetDateTime();

  char timeStr[6];
  sprintf(timeStr, "%02d:%02d", now.Hour(), now.Minute());
  String currentTime = String(timeStr);

  const char* weekdays[] = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };
  String currentWeekday = weekdays[now.DayOfWeek()];

  

  if (index == -1) {
    handleSerialInput();
    for (int i = 0; i < sizeof(leds); i++) {
      if (currentTime == alarms[i].time && currentWeekday == alarms[i].weekday && !asRinged) {
        index = i;
        controller = 
        deactivate = false;
        Serial.println(asRinged);
        asRinged = true;
      } 
    }
  } else if (index != -1 && !deactivate) {
    activateAlarm(leds[index]);

    deactivation = Serial.readStringUntil('\n');

    distance = calcDist();

    int close = digitalRead(closePin);

    if (deactivation == "STOP_ALARM") {
      Serial.println("alarm stopped");
      deactivate = true;
      digitalWrite(leds[index], LOW);
    }

    if (distance > 10 && close == LOW) {
      tone(buzzerPin, 4000, 20);
    }
  } else if (index != -1){
    if(currentTime != alarms[index].time || currentWeekday != alarms[index].weekday){
      index = -1;
      asRinged = false;
    }
  }
}

void activateAlarm(int led) {
  digitalWrite(led, HIGH);
}

float calcDist() {
  long duration;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH, 100000);

  return (duration * 0.034) / 2;
}

void handleSerialInput() {
  while (Serial.available()) {
    char c = Serial.read();

    if (c == '<') {
      serialBuffer = "";
      receiving = true;
    } else if (c == '>' && receiving) {
      receiving = false;
      readAlarms(serialBuffer);
    } else if (receiving) {
      serialBuffer += c;
    }
  }
}

void readAlarms(const String& input) {
  Serial.println("Received raw input: " + input);

  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, input);

  if (error) {
    Serial.print("Failed to parse JSON: ");
    Serial.println(error.c_str());
    return;
  }

  JsonArray array = doc.as<JsonArray>();
  alarmCount = 0;

  for (JsonObject alarmObj : array) {
    if (alarmCount >= MAX_ALARMS) break;

    alarms[alarmCount].weekday = alarmObj["weekday"].as<String>();
    alarms[alarmCount].time = alarmObj["time"].as<String>();
    alarmCount++;
  }

  Serial.print("Stored ");
  Serial.print(alarmCount);
  Serial.println(" alarms:");
  for (int i = 0; i < alarmCount; i++) {
    Serial.print("- ");
    Serial.print(alarms[i].weekday);
    Serial.print(" at ");
    Serial.println(alarms[i].time);
  }
}