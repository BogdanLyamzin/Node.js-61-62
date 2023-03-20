const fs = require("fs/promises");

const func = async () => {
    // const text = await fs.readFile("./files/file.txt", "utf-8");
    // console.log(text);
    // const buffer = await fs.readFile("./files/file.txt");
    // const text = buffer.toString();
    // console.log(text);

    // const result = await fs.appendFile("./files/file.txt", "\nНе плюйся - никто не носит золота во рту");
    // console.log(result);
    // const result = await fs.writeFile("./files/file.txt", "Кодекс Ванталы");
    // console.log(result);
    // await fs.appendFile("./files/file2.txt", "\nНе плюйся - никто не носит золота во рту");
    // await fs.writeFile("./files/file3.txt", "Кодекс Ванталы");
}

func();

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })