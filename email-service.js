const fs = require("fs");
const path = require("path");

// Communication pipe file
const FILE_PATH = path.join(__dirname, "email-service.txt");

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
  // Expected format: send:<message>
  if (!command.startsWith("send:")) {
    return "ERROR: Invalid command format";
  }

  const messageBody = command.replace("send:", "").trim();

  // Simulate sending email
  console.log(`[EmailService] Sending email: "${messageBody}"`);

  return `Email sent successfully: ${messageBody}`;
}

function main() {
  console.log("[EmailService] Running... waiting for commands.");

  setInterval(() => {
    const content = readFile();

    if (content === "") return; // nothing to do

    console.log(`[EmailService] Detected command: ${content}`);

    const response = processEmailRequest(content);

    // Clear old content and write new response
    clearFile();
    writeFile(response);

    console.log(`[EmailService] Wrote response: ${response}`);
  }, 400); // Check file every 0.4 seconds
}

main();
