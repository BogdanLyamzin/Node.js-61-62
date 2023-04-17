const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const {nanoid} = require("nanoid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

const books = [];

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb)=> {
        // const date = new Date();
        // const time = date.getTime();
        // const filename = `${time}_${file.originalname}`;
        // cb(null, filename)
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
})

app.get("/api/books", (req, res)=> {
    res.json(books);
});
// upload.fields([{name: "cover", maxCount: 8}, {name: "subcover", maxCount: 1}])
// upload.array("cover", 8)
const booksDir = path.join(__dirname, "public", "books");
app.post("/api/books", upload.single("cover"), async(req, res)=> {
    const {path: tempUpload, filename} = req.file;
    const resultUpload = path.join(booksDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const cover = path.join("books", filename);
    const newBook = {
        id: nanoid(),
        ...req.body,
        cover,
    };
    books.push(newBook);

    res.status(201).json(newBook)
})

app.listen(3000);