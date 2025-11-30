# Email Notification Microservice

This microservice simulates sending an email message using the **text file communication pipe**

It runs in its own process and communicates **only through a text file**

---

## How It Works

The microservice uses a file called `email-service.txt` as the communication pipe.

### Communication flow:

1. Main program writes a command to **email-service.txt**  
   Example:

   send:Your verification code is 932144

   
2. Email microservice detects the command  
3. It simulates sending the email  
4. It clears the file  
5. It writes back a response

    Email sent successfully: Your verification code is 932144



---

## Running the Microservice

Open a terminal and run:  
```
node email-service.js

```


You should see:  

```
[EmailService] Running... waiting for commands.
```


Keep this terminal open.  
The microservice runs continuously.

---

## Testing with the Example Main App

In a second terminal:  

```
node example-deployment-main-app.js

```


You should see output similar to:  

Sending email...
Email Service Response: Email sent successfully: Hello! Your CS361 email service is working.  


---

## File Structure  
```
email-notification-microservice/
│
├── email-service.js # Microservice process
├── email-service.txt # Communication pipe (leave blank)
├── example-deployment-main-app.js # Test UI for demonstration
├── README.md
└── .gitignore  
```

---

## Commands Supported

### `send:<message>`
Sends (simulates) an email.

Example:

send:Welcome to our platform!  



Response:

Email sent successfully: Welcome to our platform!  


---


## Tech Stack

- Node.js 18+
- Text-file communication
- No external libraries

---

## Author

Kristian Guevarra  
Fu Shing Kong (Sam)


