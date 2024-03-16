
let canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
let ctx = canvas.getContext("2d")
ctx.lineWidth = 7
ctx.lineCap = 'round'
ctx.lineJoin = 'round'

let prevX = null
let prevY = null

let draw = false

let clrs = document.querySelectorAll(".clr")
clrs = Array.from(clrs)
clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    a.download = "sketch.png"
    a.click()
})

//----------------------------------------------
/*
window.addEventListener("mousedown", (e) => draw = true)
window.addEventListener("mouseup", (e) => draw = false)

window.addEventListener("mousemove", function(e){
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    let mouseX = e.clientX
    let mouseY = e.clientY
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()

    prevX = e.clientX
    prevY = e.clientY
})*/


function canvas_read_mouse(canvas, e) {
    let canvasRect = canvas.getBoundingClientRect();
    canvas.tc_x1 = canvas.tc_x2;
    canvas.tc_y1 = canvas.tc_y2;
    canvas.tc_x2 = e.clientX - canvasRect.left;
    canvas.tc_y2 = e.clientY - canvasRect.top;
}

function on_canvas_mouse_down(e) {
    canvas_read_mouse(canvas, e);
    canvas.tc_md = true;
}

function on_canvas_mouse_up(e) {
    canvas.tc_md = false;
}

function on_canvas_mouse_move(e) {
    canvas_read_mouse(canvas, e);
    if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
        ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
        ctx.stroke();
    }
}

function canvas_read_touch(canvas, e) {
    let canvasRect = canvas.getBoundingClientRect();
    let touch = event.touches[0];
    canvas.tc_x1 = canvas.tc_x2;
    canvas.tc_y1 = canvas.tc_y2;
    canvas.tc_x2 = touch.pageX - document.documentElement.scrollLeft - canvasRect.left;
    canvas.tc_y2 = touch.pageY - document.documentElement.scrollTop - canvasRect.top;
}

function on_canvas_touch_start(e) {
    canvas_read_touch(canvas, e);
    canvas.tc_md = true;
}

function on_canvas_touch_end(e) {
    canvas.tc_md = false;
}

function on_canvas_touch_move(e) {
    canvas_read_touch(canvas, e);
    if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {
        //alert(`${canvas.tc_x1} ${canvas.tc_y1} ${canvas.tc_x2} ${canvas.tc_y2}`);
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
        ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
        ctx.stroke();
    }
}

canvas.addEventListener('mousedown', (e) => { on_canvas_mouse_down(e) }, false);
canvas.addEventListener('mouseup', (e) => { on_canvas_mouse_up(e) }, false);
canvas.addEventListener('mousemove', (e) => { on_canvas_mouse_move(e) }, false);
canvas.addEventListener('touchstart', (e) => { on_canvas_touch_start(e) }, false);
canvas.addEventListener('touchend', (e) => { on_canvas_touch_end(e) }, false);
canvas.addEventListener('touchmove', (e) => { on_canvas_touch_move(e) }, false);