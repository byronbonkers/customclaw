// Set up MQTT client
const clientId = "myclientid_" + parseInt(Math.random() * 100000);
const brokerUrl = "ws://192.168.0.65:9001/";
const username = "omar";
const password = "fuckomar";





const client = new Paho.MQTT.Client(brokerUrl, clientId);
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
try{
// Connect to MQTT broker
client.connect({
    onSuccess: onConnect,
    userName: username,
    password: password,
    useSSL: true
});
} catch(error){
console.log(error);
}

// Handle connection events
function onConnect() {
    console.log("Connected to MQTT broker");
    client.subscribe("claw_machine_control");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Connection lost: " + responseObject.errorMessage);
    }
}

// Handle incoming messages
function onMessageArrived(message) {
    console.log("Received message: " + message.payloadString);
}

// Handle button clicks
const upButton = document.getElementById("up");
upButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("x");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});

const downButton = document.getElementById("down");
downButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("z");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});

const leftButton = document.getElementById("left");
leftButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("l");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});

const rightButton = document.getElementById("right");
rightButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("r");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});

const backButton = document.getElementById("backward");
backButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("w");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});

const forwardButton = document.getElementById("forward");
forwardButton.addEventListener("click", function () {
    const message = new Paho.MQTT.Message("s");
    message.destinationName = "clawmachine/controls";
    client.send(message);
});