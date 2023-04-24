const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY, EMAIL_FROM} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
    to: "mahera1071@syinxun.com",
    from: EMAIL_FROM,
    subject: "Test email",
    html: `<p>Test email</p>`
};

sgMail.send(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))