const fs = require("fs");
const path = require("path");

// Communication pipe file
//const FILE_PATH = path.join(__dirname, "email-service.txt");
const FILE_PATH = "C:\\Users\\graph\\Documents\\osu\\CS361 - Software Engineering I\\Team-Project\\Microservices\\cs361-email-notification\\email-service.txt";

function readFile() {
  if (!fs.existsSync(FILE_PATH)) return "";
  return fs.readFileSync(FILE_PATH, "utf8").trim();
}

function clearFile() {
  fs.writeFileSync(FILE_PATH, "");
}

function writeFile(message) {
  fs.writeFileSync(FILE_PATH, message);
}

function processEmailRequest(command) {

  // require "send:" prefix
  if (!command.startsWith("send:")) {
    console.log("[EmailService] Ignoring non-email command:", command);
    return "";  // ignore instead of sending error
  }

  const messageBody = command.replace("send:", "").trim();

  console.log(`[EmailService] Sending email: "${messageBody}"`);

  return `Email sent successfully: ${messageBody}`;
}


function main() {
  console.log("[EmailService] Running... waiting for commands.");

  setInterval(() => {
    const content = readFile();

    if (content === "") return;   // nothing to do

    // process command
    const response = processEmailRequest(content);

    // write response only if there is a valid response
    if (response && response.length > 0) {
      writeFile(response);
    } else {
      // clear file to prevent loops
      clearFile();
    }

  }, 300);

}

main();
