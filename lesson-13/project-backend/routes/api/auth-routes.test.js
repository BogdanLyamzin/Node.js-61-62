const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const {User} = require("../../models/user");

const {DB_HOST_TEST, PORT} = process.env;

describe("test /api/auth/register route", ()=> {
    let server = null;
    beforeAll(async ()=> {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    })

    afterAll(async ()=> {
        server.close();
        await mongoose.connection.close();
    });

    beforeEach(()=> {

    })

    afterEach(async()=> {
        await User.deleteMany({});
    })

    test("test register route with correct data", async()=> {
        const registerData = {
            name: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const res = await request(app).post("/api/auth/register").send(registerData);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(registerData.name);
        expect(res.body.email).toBe(registerData.email);

        const user = await User.findOne({email: registerData.email});
        expect(user.name).toBe(registerData.name);
    })

    test("test login route with correct data", async()=> {
        const registerData = {
            name: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const loginData = {
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const user = await User.create(registerData);

        const res = await request(app).post("/api/auth/login").send(loginData);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(loginData.name);
        expect(res.body.email).toBe(loginData.email);

        const {token} = await User.findOne({email: registerData.email});
        expect(res.body.email).toBe(token);
    })
})