
let button_available = document.querySelector(".btn-available")
let button_all = document.querySelector(".btn-all")
let button_given = document.querySelector(".btn-given")

button_all.addEventListener("click",show_all_books)
button_given.addEventListener("click",show_given_books)
button_available.addEventListener("click",show_available_books)

let rows = document.querySelector("tbody");

async function getBooks(){
    let response = await fetch("/books",{
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    let books = await response.json()
    rows.innerHTML = ""
    for (let book of books ){
        //vision_row(book)
        rows.append(vision_row(book))
        //document.querySelector(".books_all").append(vision_row((book)))
    }
}


async function show_available_books(){
    let response = await fetch("/books/available", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    //let innerHTML = ""
    let books = await response.json()
    rows.innerHTML = ""
    for (let book of books ){
        if(book.owner === ""){
            rows.append(vision_row(book))
        }
    }
    //document.querySelector(".books_all").innerHTML = innerHTML
}


async function show_all_books(){
    let response = await fetch("/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    let books = await response.json()
    //document.querySelector(".books_all").innerHTML = ""
    rows.innerHTML = ""
    for (let book of books ){
        //vision_row(book)
        //document.querySelector(".books_all").append(vision_row((book)))
        rows.append(vision_row(book))
    }
}

async function show_given_books(){
    let response = await fetch("/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    let books = await response.json()
    //document.querySelector(".books_all").innerHTML = ""
    rows.innerHTML = ""

    for (let book of books){
         if(book.owner !== ""){
        //     let date_info = book.date
        //     let id_info = book.id
        //     let book_info = {id:id_info,
        //         date: date_info};
        //
             rows.append(vision_row(book))
         }
    }
}
let form = document.querySelector("form");

form.addEventListener("submit",function (event){
    event.preventDefault()
    let name = this.elements["name"].value;
    let author = this.elements["author"].value;
    let year = this.elements["year"].value
    //console.log(name)
    createUser(name,author,year)
})

async function createUser(Name,author,year ) {
    let response = await fetch("/books/available", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            book: Name,
            author: author,
            year: year
        })
    });
    if(response.ok === true){
        form.reset()
        await getBooks()
        console.log("hell")
    }
}

function vision_row(book){
    const tr = document.createElement("tr");

    //tr.className = "row"
    const nameTd = document.createElement("td");
    nameTd.append(book.book);
    //nameTd.style.paddingRight = "50px";
    //nameTd.style.width = "300px";
    //nameTd.style.height = "50px"
    tr.append(nameTd);

    const authorTd = document.createElement("td");
    authorTd.append(book.author)
    //authorTd.style.width = "200px"
    tr.append(authorTd)

    const yearTd = document.createElement("td");
    yearTd.append(book.year)
    tr.append(yearTd)

    let OwnerName = document.createElement("td");
    if(book.owner !== ""){
        let owner = book.owner
        let date = book.date

        OwnerName.append(owner+"                 " +date)
        // OwnerName.style.paddingRight = "50px"
        // OwnerName.style.width = "100px"
        tr.append(OwnerName)
    }
    else if(book.owner === "") {
        let in_library = document.createElement("td");
        in_library.append("В библиотеке")
        //  in_library.style.paddingRight = "200px"
        tr.append(in_library)
    }

    const links_all = document.createElement("td");

    const editLink = document.createElement("a")
    let url = new URL('http://localhost:3001/book')
    url.searchParams.set('id',book.id)
    editLink.text = "Edit"
    editLink.setAttribute("style", "cursor:pointer;padding:15px;")
    editLink.href = url.toString()
    // editLink.style.paddingRight = "50px";
    links_all.append(editLink)
    // tr.append(editLink)

    const GiveLink = document.createElement("a")
    let url_give = new URL('http://localhost:3001/book/give')
    url_give.searchParams.set('id',book.id)
    GiveLink.text = "Выдать"
    GiveLink.setAttribute("style", "cursor:pointer;padding:15px;")
    GiveLink.href = url_give.toString()
    links_all.append(GiveLink)
    // tr.append(GiveLink)
    tr.appendChild(links_all)
    return tr;
}


getBooks()