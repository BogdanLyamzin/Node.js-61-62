const nodemailer = require("nodemailer");
require("dotenv").config();

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true,
    auth: {
        user: "bogdan.lyamzin.d@meta.ua",
        pass: process.env.META_PASSWORD,
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    to: "mahera1071@syinxun.com",
    from: "bogdan.lyamzin.d@meta.ua",
    subject: "Test email",
    html: `<p>Test email</p>`
};

transport.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))