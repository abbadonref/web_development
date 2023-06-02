const express = require('express')
const fs = require("fs");
const pug = require('pug');
const path = require("path");
let id_needed = 0

const JsonParser = express.json();
const app = express()

//app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname + "/views"));

app.set("view engine", "pug");
//app.use(express.static(__dirname + "/views"));


const filePath = "books.json";

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});
     app.get("/books",(req, res) =>{
         let content = fs.readFileSync(filePath,"utf8")
         let books = JSON.parse(content)
         res.send(books)
     })
app.get("/books/available",(req,res) =>{
    let content = fs.readFileSync(filePath,"utf8")
    let users = JSON.parse(content)
    res.send(users)
})
app.post("/books/available",JsonParser, function (req,res){
    if(!req.body) res.sendStatus(404);

    let bookName = req.body.book;
    let author = req.body.author;
    let year_info = req.body.year
    let book_info = {book: bookName, author:author,year: year_info,owner:"",
        date: ""};

    let data = fs.readFileSync("books.json","utf8");
    let books = JSON.parse(data)

    let id = Math.max(...books.map((book_info) => book_info.id));

    if (Number.isFinite(id)) {
        book_info.id = id + 1;
    } else {
        book_info.id = 1;
    }

    books.push(book_info);

    data = JSON.stringify(books);
    fs.writeFileSync("books.json",data);
    res.send(book_info)
})

app.put("/book",JsonParser,(req, res) =>{
        let book = req.body.book
        let author = req.body.author
        let id = req.body.id
        let year = req.body.year
        let content = fs.readFileSync(filePath,"utf8")
        let books = JSON.parse(content)
        for (let bookk of books){
            if(bookk.id === id){
                let needed_book = bookk;
                needed_book.book = book;
                needed_book.author = author;
                needed_book.year = year;
                let content = JSON.stringify(books)
                fs.writeFileSync("books.json",content)
                res.send(needed_book)
                break;
            }
        }
})

app.get("/book",(req, res) =>{
    id_needed = req.query.id
    //const compiledFunction = pug.compileFile('public/edit_page_1.pug');
    //res.sendFile('public/edit_page_1.pug', {root: __dirname });
    res.render("edit_page_pug")
})

app.get("/id",(req, res) =>{
    res.send(id_needed)
})

app.delete("/book",JsonParser,(req, res) =>{
        let id = req.body.id
        let index = 0
        console.log(id)
        let data = fs.readFileSync(filePath,"utf8");
        let books = JSON.parse(data)
        for (let bookk of books){
            if(bookk.id === id){
                console.log(id)
                let book_deleted = books.splice(index,1)[0];
                let data = JSON.stringify(books)
                fs.writeFileSync("books.json",data)
                res.send(book_deleted)
                break;
            }
            index += 1;
        }


})
app.get("/book/give",(req, res) =>{
    //id_needed = req.query.id
    id_needed = req.query.id
    res.render("lend_book")
  //  res.sendFile('public/lend_book.html', {root: __dirname });
})

app.put("/book/give",JsonParser,(req, res) =>{
    let name = req.body.name
    let date = req.body.date
    let id = req.body.id
    let content = fs.readFileSync(filePath,"utf8")
    let books = JSON.parse(content)
    for (let bookk of books){
        if(bookk.id === id){
            let needed_book = bookk;
            needed_book.owner = name;
            needed_book.date = date;
            let content = JSON.stringify(books)
            fs.writeFileSync("books.json",content)
            res.send(needed_book)
            break;
        }
    }
})

app.listen(3001)