let id_needed = 0
let form = document.querySelector("form");
async function Edit_User(name,author,year) {
    let response = await fetch("/book", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            book: name,
            author: author,
            id: id_needed,
            year: year
        })
    })
    if (response.ok === true){
        console.log("good")
    }

}
async function get_id(){
    let response = await fetch("/id", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    id_needed = await response.json()
}
async function fill_info() {
    let response = await fetch("/books", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    await get_id()
    let books = await response.json()
    for (let bookk of books) {
        if (bookk.id === id_needed) {
            form.elements["name"].value = bookk.book;
            form.elements["author"].value = bookk.author;
            form.elements["year"].value = bookk.year;
            if(bookk.owner !== ""){
                const tr = document.createElement("tr")

                const nameTd = document.createElement("td");
                nameTd.append(bookk.owner)
                tr.append(nameTd)

                const dateTd = document.createElement("td");
                dateTd.append(bookk.date)
                tr.append(dateTd)

                const yearTd = document.createElement("td");
                yearTd.append(bookk.year)
                tr.append(yearTd)

                document.querySelector(".info_book").append(tr)
            }
            else{
                const tr = document.createElement("tr")

                let text = document.createElement("td");
                text = "Книга находится в библиотеке"
                tr.append(text)
                document.querySelector(".info_book").append(tr)
            }
            break;
        }
    }
}
form.addEventListener("submit",function (event){
    event.preventDefault()
    let name = this.elements["name"].value;
    let author = this.elements["author"].value;
    let year = this.elements["year"].value;
    Edit_User(name,author,year)
})
let button_delete = document.querySelector(".btn-delete")
button_delete.addEventListener("click", book_delete)
async function book_delete(){
    if(confirm("Точно хотите удалить?")){
        let response = await fetch("/book", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: id_needed
            })

        })
        window.location.href = 'http://localhost:3001';
        if (response.ok === true){
            console.log("good")
        }
    }

}

fill_info()
