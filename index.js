const tmi = require("tmi.js");
const player = require("play-sound")({});
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .option("channel", {
    alias: "c",
    type: "string",
    description: "Twitch channel name",
    demandOption: true,
  })
  .option("keyword", {
    alias: "k",
    type: "string",
    description: "Keyword to monitor",
    default: "!key",
  })
  .option("spamThreshold", {
    alias: "t",
    type: "number",
    description: "Number of occurrences to detect spam",
    default: 8,
  })
  .option("timeWindow", {
    alias: "w",
    type: "number",
    description: "Time window in milliseconds",
    default: 10000,
  })
  .help().argv;

const client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: [argv.channel],
});

client.connect();

const keyword = argv.keyword;
const spamThreshold = argv.spamThreshold;
const spamTimeWindow = argv.timeWindow;

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
