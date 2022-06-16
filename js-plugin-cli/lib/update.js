const updateNotifier = require("update-notifier");
const chalk = require("chalk"); // kolorist
const pkg = require("../package.json");

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000,
});

function updateChk() {
  if (notifier.update) {
    console.log(
      `new version available:${chalk.cyan(
        notifier.update.latest
      )},it's recommended that you update before using!`
    );
  } else {
    console.log("no new version is available");
  }
}


module.exports = updateChk;
