const express = require("express");
const app = express();
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const nodemailer = require("nodemailer")

require("dotenv").config();

const PORT = 5000;

const token = process.env.TELEGRAM_BOT_TOKEN;

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const bot = new TelegramBot(token, {polling: true});
const chatId = process.env.TELEGRAM_CHAT_ID;

app.use(express.static(__dirname));

app.post("/", (req, res) => {
    let {score, author} = req.headers
    author = decodeURIComponent(author);
    bot.sendMessage(chatId, `Тест виконав: ${author}\nРезультати: ${score}/10`)

    transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "handriid@ukr.net",
        subject: "Результати тестування",
        html:
          `<h1>Тест виконав: ${author}</h1>
          <h1>Результат: ${score}/10</h1>`,
    }, (error, info) => {
        if (error) {
       console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.listen(PORT, () => {
    console.log("Server started on port: ${PORT}");
})