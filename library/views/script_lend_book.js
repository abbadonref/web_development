let id_needed = 0;
let form = document.querySelector("form");

async function get_id(){
    let response = await fetch("/id", {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
    id_needed = await response.json()
    console.log(id_needed)
}
async function Add_owner(name,date){
    let response = await fetch("/book/give", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            name: name,
            date: date,
            id: id_needed
        })
    })
    if (response.ok === true){
        console.log("good")
    }
}
form.addEventListener("submit",function (event){
    event.preventDefault()
    let name = this.elements["name"].value;
    let date = this.elements["date"].value;
    Add_owner(name,date)
})
get_id()