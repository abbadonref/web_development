let main = document.querySelector(".main");
let next_figure = document.querySelector("#next_figure")
let records = document.querySelector("#record")
let difficulty = document.querySelector(".difficulty");
difficulty.innerHTML = 0;
let difficulty_number = 0;
let player = document.querySelector("#player");
let button = document.querySelector("#ipt");
let resultElement = document.querySelector(".result")
button.addEventListener("click", function (){
    resultElement.innerHTML = player.value;
});
let i = 0;
let Game = true;
let gameSpeed = 400;
let timerID;
class Point {
    constructor(x_coords, y_coords,coords) {
        this.x_coords = y_coords
        this.y_coords = x_coords
        this.coords = coords

    }
}
let figure1 = new Point;
let figure2 = new Point;

let figures = [
    [1, 3, 5, 7],
    [2, 4, 5, 7],
    [3, 5, 4, 6],
    [3, 5, 4, 7],
    [2, 3, 5, 7],
    [3, 5, 7, 6],
    [2, 3, 4, 5],
    [1, 2, 3, 4],
]
let playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


function generate_new_figure(){
    let random = getRandomInt(7);
    let x_coords = measure_coords_x(figures[random]);
    let y_coords = measure_coords_y(figures[random]);
    figure1 = new Point(x_coords, y_coords,figures[random]);
     random = getRandomInt(7);
     x_coords = measure_coords_x(figures[random]);
     y_coords = measure_coords_y(figures[random]);
     figure2 = new Point(x_coords,y_coords,figures[random])
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function measure_coords_x(arr){
    let x_coords = []
    for (let i = 0; i < 4; i++) {
        x_coords[i] = (arr[i] % 2) + 3;
    }
    return x_coords
}

function measure_coords_y(arr){
    let y_coords = []
    if(arr[0] !== 1) {
        for (let i = 0; i < 4; i++) {
            y_coords[i] = (Math.floor(arr[i] / 2)) - 1;
        }
    }
    else{
        for (let i = 0; i < 4; i++) {
            y_coords[i] = (Math.floor(arr[i] / 2));
        }
    }
    return y_coords
}

function draw_next_figure() {
    let next_figureIneerHTML = "";
    for(let x = 0; x <4;x++){
        for (let y = 0; y < 2; y++) {
            let count = 0;
            for(let i = 0;i < 4;i++){
                if (figure2.y_coords[i]-3 === y && figure2.x_coords[i] === x) {
                    next_figureIneerHTML += '<div class = "cell fixedCell"></div>';
                    count = 1;
                }
            }
            if(count !== 1){
                next_figureIneerHTML += '<div class = "cell "></div>';}
        }


    }
    next_figure.innerHTML = next_figureIneerHTML;
}

function draw(playfield){
    let mainInnerHTML = "";
    for(let y = 0; y < playfield.length;y++){
        for (let x = 0; x < playfield[y].length; x++) {
            if(playfield[y][x] === 1){
                mainInnerHTML += '<div class = "cell movingCell"></div>';
            }
            if(playfield[y][x] === 0){
                mainInnerHTML += '<div class = "cell "></div>';
            }
            if(playfield[y][x] === 2) {
                mainInnerHTML += '<div class = "cell fixedCell "></div>';
            }
        }
        }
    main.innerHTML = mainInnerHTML;
    }

function check_line() {
    for (let y = 0; y < playfield.length; y++) {
        let count_line = 0
        let y_axis = 0
        for (let x = 0; x < playfield[y].length; x++) {
            if(playfield[y][x] === 2){
                count_line += 1
            }
        if(count_line === 10){
            y_axis = y
            clearInterval(timerID);
            gameSpeed -= 20;
            difficulty_number += 1;
            difficulty.innerHTML = difficulty_number;
            timerID = setInterval(UpdateGame, gameSpeed);
            for(let x = 0; x < playfield[y].length;x++){
                playfield[y_axis][x] = 0;
            }
            for (let y = y_axis; y >= 0; y--) {
                for (let x = 0; x < playfield[y].length; x++) {
                    if(playfield[y][x] === 2){
                        playfield[y][x] = 0;
                        playfield[y+1][x] = 2;
                    }
                }
                }
            }
        }
        }
    }



function check_bottom(){
    let biggest = Math.max.apply(null, figure1.x_coords);
    let index_last = (figure1.x_coords.indexOf(biggest,0))
    if(figure1.x_coords[index_last]+1 >= 20){
        return true;
    }
    for (let i = 0; i < 4; i++) {
        if( playfield[figure1.x_coords[i]+1][figure1.y_coords[i]]=== 2){
            return true;
        }
    }

    return false;
}
function check_left_borders() {
    for (let i = 0; i < 4; i++) {
        if (figure1.y_coords[i] === 0) {
            return true;
        }
    }
        for (let i = 0; i < 4; i++) {
            if (playfield[figure1.x_coords[i]][figure1.y_coords[i] - 1] === 2) {
                return true;
            }

        }
        return false;

}

function check_rotation(x_coords,y_coords) {
    for (let i = 0; i < 4; i++) {
        if( playfield[x_coords[i]][y_coords[i]]=== 2 || y_coords[i] === -1 || y_coords[i]  === 10){
            return true
        }
    }
    return false;
}

function check_right_borders() {
    for (let i = 0; i < 4; i++) {
        if (figure1.y_coords[i] >= 9) {
            return true;
        }
    }
        for (let i = 0; i < 4; i++) {
            if (playfield[figure1.x_coords[i]][figure1.y_coords[i] + 1] === 2) {
                return true;
            }
        }
        return false;
    }
draw(playfield)

function move_down() {
    draw(playfield)
    if (check_bottom(figure1.x_coords) === false) {
         for (let i = 0; i < 4; i++) {
             playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 0
         }
        for (let i = 0; i < 4; i++) {
            figure1.x_coords[i] += 1;
        }
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
    } else {
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 2
        }
            check_line()
            figure1 = figure2;
             let random = getRandomInt(7);
             let x_coords = measure_coords_x(figures[random]);
             let y_coords = measure_coords_y(figures[random]);
             figure2 = new Point(x_coords, y_coords,figures[random]);
             console.log(figure2)
            draw_next_figure();
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
        if(check_bottom() === true){
            for (let i = 0; i < 4; i++) {
                playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 2
            }
            draw(playfield)
            clearInterval(timerID)
            console.log("end")
            Game = false;

            localStorage.setItem(player.value.toString(),difficulty_number.toString())
            //localStorage.setItem('person',JSON.stringify(gamer));
           // let raw = localStorage.getItem(player.value.toString());
            //let name = JSON.stringify(gamer.name).replace(/"/g,'');
            //console.log(raw)
            // for(let key in localStorage)
            // {
            //     if (!localStorage.hasOwnProperty(key))
            //     { continue; }
            //     else{
            //         records.append(`${key}: ${localStorage.getItem(key)}`)
            //
            //     }
            // }
            records.append(`${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`)
            records.innerHTML += '<br>'
            i++;
            //localStorage.clear()
            // records.append(localStorage.key(0))
            // records.append(":")
            // records.append(JSON.stringify(gamer.level))

            //alert("pizdec")
        }
        }
        draw(playfield);
    }


function move_left() {
    if (check_left_borders() === false) {

        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 0
        }
        for (let i = 0; i < 4; i++) {
            figure1.y_coords[i] -= 1;
        }
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
    }
}

function move_right() {
    if (check_right_borders() === false) {

        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 0
        }
        for (let i = 0; i < 4; i++) {
            figure1.y_coords[i] += 1;
        }
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
    }
}

function rotate(){
    for (let i = 0; i < 4; i++) {
        playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 0
    }
    let central_point_x = figure1.x_coords[1];
    let central_point_y = figure1.y_coords[1];
    let x_coords = []
    let y_coords = []
    for (let i = 0; i < 4; i++) {
        let x = figure1.y_coords[i] - central_point_y;
        let y = figure1.x_coords[i] - central_point_x;
        x_coords[i] = central_point_x + x;
        y_coords[i] = central_point_y - y;
    }
    if(check_rotation(x_coords,y_coords) === false ){
        for (let i = 0; i < 4; i++) {
            figure1.y_coords[i] = y_coords[i];
            figure1.x_coords[i] = x_coords[i];
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
    }
    else{
        for (let i = 0; i < 4; i++) {
            playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
        }
    }
    draw(playfield);
}

function UpdateGame() {
    //move_down();
    //timerID = setTimeout(UpdateGame, gameSpeed);
    draw(playfield);
    //sleep(2000);
    move_down();
}

document.getElementById("button").addEventListener("click", StartGame)
function StartGame(){
     // let random = getRandomInt(7);
     // let x_coords = measure_coords_x(figures[random]);
     // let y_coords = measure_coords_y(figures[random]);
     // figure1 = new Point(x_coords, y_coords);
    generate_new_figure();
    gameSpeed = 400;
    clearInterval(timerID);
    difficulty_number = 0;
    difficulty.innerHTML = 0;
    Game = true;
    for(let y = 0; y < playfield.length;y++){
        for (let x = 0; x < playfield[y].length; x++) {
            playfield[y][x] = 0;
            }
        }
    draw_next_figure();
    for (let i = 0; i < 4; i++) {
        playfield[figure1.x_coords[i]][figure1.y_coords[i]] = 1
    }
    draw(playfield);
    //UpdateGame();
    timerID = setInterval(UpdateGame, gameSpeed);
}

        document.onkeydown = function (event) {
        if(Game !== false) {
            switch (event.code) {
                case "ArrowDown":
                    move_down();
                    break;
                case "ArrowLeft":
                    move_left();
                    break;
                case "ArrowRight":
                    move_right();
                    break;
                case "ArrowUp":
                    rotate();
                    break;
            }
        }
            draw(playfield)
        }




