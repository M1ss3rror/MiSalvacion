function agregar() {
    let recordatorio = document.getElementById("recordatorio").value
    let date = document.getElementById("recordatorio_date").value
    let time = document.getElementById("recordatorio_time").value
    const actual = new Date()
    let dia = (actual.getDate() <= 9) ? "0" + actual.getDate() : actual.getDate()
    operacion_mes = actual.getMonth() + 1
    let mes = (operacion_mes <= 9) ? "0" + operacion_mes : operacion_mes
    var date_actual = (actual.getFullYear() + "-" + mes + "-" + dia)
    let time_actual = (actual.getHours() + ":" + actual.getMinutes())

    if (recordatorio != "" || date != "" || time != "") {
        console.log(recordatorio)
        console.log(date)
        console.log(time)
        guardar(recordatorio)
        document.getElementsByTagName("textarea")[0].value = "";
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
    } else {
        document.getElementById("alert").className = 'alert alert-warning text-center'
        document.getElementById("alert").innerHTML = "Ningún campo debe estar vacío."
    }
}

function guardar(recordatorio) {
    if (localStorage.getItem("contador_r") == null) {
        localStorage.setItem("contador_r", 1)
    }
    let contador_local_r = localStorage.getItem("contador_r")
    addItem(recordatorio, contador_local_r)

    localStorage.setItem("Recordatorio" + contador_local_r, recordatorio)
    localStorage.setItem("contador_r", parseInt(contador_local_r) + parseInt(1))

    if (localStorage.getItem("contador_d") == null) {
        localStorage.setItem("contador_d", 1)
    }
    let contador_local_d = localStorage.getItem("contador_d")
    let date = document.getElementById("recordatorio_date").value
    localStorage.setItem("Fecha" + contador_local_d, date)
    localStorage.setItem("contador_d", parseInt(contador_local_d) + parseInt(1))

    if (localStorage.getItem("contador_t") == null) {
        localStorage.setItem("contador_t", 1)
    }
    let contador_local_t = localStorage.getItem("contador_t")
    let time = document.getElementById("recordatorio_time").value
    localStorage.setItem("Hora" + contador_local_t, time)
    localStorage.setItem("contador_t", parseInt(contador_local_t) + parseInt(1))

}

function addItem(recordatorio, id_r) {
    const lista = document.getElementById("lista")
    console.log(lista)
    const input1 = document.createElement("input")
    input1.className = "list-group-item"
    input1.setAttribute("type", "text")
    input1.setAttribute("id", "remind" + id_r)
    input1.setAttribute("aria-describedby", "button-addon2")
    input1.setAttribute("disabled", "disabled")
    input1.textContent = recordatorio
    lista.appendChild(input1)
    const div = document.createElement("div")
    div.className = "input-group-append"
    div.setAttribute("id", "container_btns" + id_r)
    lista.appendChild(div)
    const button1 = document.createElement("button")
    button1.className = "btn btn-success"
    button1.setAttribute("onclick", `hecho(${id_r})`)
    div.appendChild(button1)
    const icon_success = document.createElement("i")
    icon_success.className = "fas fa-check"
    button1.appendChild(icon_success)
    const button2 = document.createElement("button")
    button2.className = "btn btn-danger"
    button2.setAttribute("onclick", `borrar(${id_r})`)
    div.appendChild(button2)
    const icon_delete = document.createElement("i")
    icon_delete.className = "far fa-trash-alt"
    button2.appendChild(icon_delete)
    document.getElementById("remind" + id_r).placeholder = recordatorio
}

function hecho(id_r) {
    console.log(id_r)
    var contenedor_recordatorio = document.getElementById("lista")
    var objeto_dom = document.getElementById("remind" + id_r)
    var btns = document.getElementById("container_btns" + id_r)
    contenedor_recordatorio.removeChild(objeto_dom)
    contenedor_recordatorio.removeChild(btns)
    alert("hecho")
}

function borrar(id_r) {
    console.log(id_r)
    var contenedor_recordatorio = document.getElementById("lista")
    var objeto_dom = document.getElementById("remind" + id_r)
    var btns = document.getElementById("container_btns" + id_r)
    if (confirm('¿Estás segura/o?')) {
        contenedor_recordatorio.removeChild(objeto_dom)
        contenedor_recordatorio.removeChild(btns)
        localStorage.removeItem('Recordatorio' + id_r)
    }
}

function alerta() {
    for (let i = 0; i < localStorage.length; i++) {
        console.warn('c:')
        let recordatorio = document.getElementById("recordatorio").value
        let date = document.getElementById("recordatorio_date").value
        let time = document.getElementById("recordatorio_time").value
        const actual = new Date()
        let dia = (actual.getDate() <= 9) ? "0" + actual.getDate() : actual.getDate()
        operacion_mes = actual.getMonth() + 1
        let mes = (operacion_mes <= 9) ? "0" + operacion_mes : operacion_mes
        var date_actual = (actual.getFullYear() + "-" + mes + "-" + dia)
        let time_actual = (actual.getHours() + ":" + actual.getMinutes())
            //recorrer localStorage


        if (date == date_actual) {
            console.log(date + " y " + date_actual + " coinciden para " + recordatorio)
            if (time == time_actual) {
                console.log(time + " y " + time_actual + " coinciden para " + recordatorio)
                alert("¡" + recordatorio + "!")
            }
        }
    }
}



function formatfecha() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

function validarhora(hora1, hora2) {
    var horasplit1 = hora1.split(":");
    var horasplit2 = hora2.split(":");
    console.log(hora1 + " Actual")
    console.log(hora2 + " Programada")
    if (parseInt(horasplit1[0]) == parseInt(horasplit2[0]) && parseInt(horasplit1[1]) == parseInt(horasplit2[1]))
        return true;
    return false;
}

function validar() {
    let contador = localStorage.getItem("contador_d");
    for (let i = 0; i < contador; i++) {
        console.warn('c:')
        let recordatorio = localStorage.getItem("Recordatorio" + i)
        let date = localStorage.getItem("Fecha" + i)
        let time = localStorage.getItem("Hora" + i)
        var fechahoy = formatfecha();
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes();
        console.log(date)
        console.log(fechahoy)
        console.log(time)
        console.log(hora)
        console.log(recordatorio)
        console.log(localStorage.length)
        if (date != null && time != null) {
            var horavalidacion = validarhora(time, hora);
            if (date == fechahoy && horavalidacion) {
                alert("¡" + recordatorio + "!")
            }
        }
    }
}

window.onload = setInterval(validar, 30000);