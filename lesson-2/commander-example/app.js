const {program} = require("commander");

const books = require("./books");

const invokeAction = async({action, id, title, author})=> {
    switch(action) {
        case "list":
            const allBooks = await books.getAll();
            return console.log(allBooks);
        case "readById":
            const oneBook = await books.getById(id);
            return console.log(oneBook);
        case "add":
            const newBook = await books.add({title, author});
            return console.log(newBook);
        case "updateById":
            const updateBook = await books.updateById(id, {title, author});
            return console.log(updateBook);
        case "deleteById":
            const deleteBook = await books.deleteById(id);
            return console.log(deleteBook);
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-t, --title <type>")
    .option("-at, --author <type>");

program.parse();

const options = program.opts();
invokeAction(options)
