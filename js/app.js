var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Evento de envío de formulario
form.addEventListener('submit', addItem);
// Eliminar evento
//itemList.addEventListener('click', removeItem);

// Filtrar evento
/* filter.addEventListener('keyup', filterItems); */

// Agregar Item
function addItem(e) {
    e.preventDefault();
    var lista_notas
    if (localStorage.getItem("lista_notas") == null) {
        localStorage.setItem("lista_notas", 0)
        lista_notas = 0
    } else {
        lista_notas = localStorage.getItem("lista_notas")
    }


    // Obtener valor de entrada
    var newItem = document.getElementById('item').value;
    // Crear nuevo elemento li
    var li = document.createElement('li');
    // Agregar Clase
    li.className = 'list-group-item d-flex justify-content-center';
    li.setAttribute("id", `nota_${lista_notas}`)
        // Agregar nodo de texto con valor de entrada
    li.appendChild(document.createTextNode(newItem));
    // Crear el botón eliminar
    var deleteBtn = document.createElement('button');
    // Agregar la clase del botón eliminar
    deleteBtn.className = 'ml-3 btn btn-danger btn-sm float-right delete';
    deleteBtn.setAttribute("onclick", `removeItem(${lista_notas})`)

    // Añadir nodo de texto
    deleteBtn.appendChild(document.createTextNode('X'));
    // Agregar botón a li
    li.appendChild(deleteBtn);
    // Agregar li a la lista
    itemList.appendChild(li);



    localStorage.setItem("nota_" + lista_notas, newItem)
    localStorage.setItem("lista_notas", parseInt(lista_notas) + parseInt(1))

}

// Eliminar Item
function removeItem(id_nota) {
    var contenedor_notas = document.getElementById("items")
    var objeto_dom = document.getElementById("nota_" + id_nota)
    if (confirm('¿Estás segura/o?')) {
        contenedor_notas.removeChild(objeto_dom)
        localStorage.removeItem('nota_' + id_nota)
    }
}

// Filtrar Item
function filterItems(e) {
    // convertir texto a minúsculas
    var text = e.target.value.toLowerCase();
    // Obtener lista
    var items = itemList.getElementsByTagName('li');
    // Convertir a Array
    Array.from(items).forEach(function(item) {
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}