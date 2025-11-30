const fs = require("fs");
const path = require("path");

const EMAIL_FILE = path.join(__dirname, "email-service.txt");

// Write command to microservice
function writeToEmailService(message) {
  fs.writeFileSync(EMAIL_FILE, message);
}

// Read microservice response
function readFromEmailService() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const data = fs.readFileSync(EMAIL_FILE, "utf8").trim();
      if (data !== "" && !data.startsWith("send:")) {
        clearInterval(interval);
        resolve(data);
      }
    }, 200);
  });
}

// Example usage:
async function runEmailDemo() {
  console.log("Sending email...");

  writeToEmailService("send:Welcome to CS361!");

  const response = await readFromEmailService();

  console.log("Email Service Response:", response);
}

runEmailDemo();
