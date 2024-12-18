const tmi = require("tmi.js");
const player = require("play-sound")({});

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ["metashi12"],
});

client.connect();

const keyword = "!key";
const spamThreshold = 8;
const spamTimeWindow = 10000;

const messageTracker = [];

client.on("message", (__, tags, message, self) => {
  if (self) return;

  if (message.toLowerCase().includes(keyword.toLowerCase())) {
    messageTracker.push({ time: Date.now(), user: tags["display-name"] });
  }

  const recentMessages = messageTracker.filter(
    (msg) => Date.now() - msg.time <= spamTimeWindow
  );

  if (recentMessages.length >= spamThreshold) {
    console.log(`SPAM DETECTED: The keyword \"${keyword}\" is being spammed!`);

    player.play("alert-109578.mp3", function (err) {
      if (err) console.error("Error playing sound:", err);
    });

    messageTracker.length = 0;
  }

  console.log(`[${tags["display-name"]}] ${message}`);
});
