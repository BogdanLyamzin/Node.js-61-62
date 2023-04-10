const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "643448fcba76f8a797abab50"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, SECRET_KEY);
    console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzQ0OGZjYmE3NmY4YTc5N2FiYWI1MCIsImlhdCI6MTY4MTE0OTA5MCwiZXhwIjoxNjgxMjMxODkwfQ.bdi4qQ1c869QdNl_fLlBc4WAF-XDBShfY1sFHAYIpbe";
    jwt.verify(invalidToken, SECRET_KEY);
}
catch(error) {
    console.log(error.message);
}