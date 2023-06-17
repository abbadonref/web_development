let petr = { name: "Петр" };
let ivan = { name: "Иван" };
let sayName = function() {
    return "Я - " +
        (this.name ? this.name : "безымянный");
}
petr.sayName = sayName;
ivan.sayName = sayName;
console.log(petr.sayName());
console.log(ivan.sayName());
console.log(sayName());