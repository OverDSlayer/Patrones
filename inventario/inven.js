const cloud= document.getElementById("cloud");
const barralateral=document.querySelector(".barra-lateral")
const spans=document.querySelectorAll("span");
const palanca=document.querySelector(".switch"); 
const circulo =document.querySelector(".circulo"); 

palanca.addEventListener("click",()=>{
    let body = document.body;
    body.classList.toggle("dark-mode"); 
    circulo.classList.toggle("prendido");
});

cloud.addEventListener("click",()=>{
    barralateral.classList.toggle("mini-barra-lateral"); 
    spans.forEach( (span)=>{
        span.classList.toggle("oculto"); 
    });

});
function navigateToFile(id) {
    const files = {
        inventario: "../inventario/inven.html",
        ventas: "../ventas/ventas.html",
        compras: "../compras/compras.html",
        proveedores: "../proveedores/proveedores.html",
        clientes: "../clientes/clientes.html",
        reportes: "../reportes/reportes.html",
        equipo: "../equipo/equipo.html",
    };

    const file = files[id];
    if (file) {
        window.location.href = file; // Redirige al archivo correspondiente
    } else {
        console.error(`No se encontró un archivo para el ID "${id}".`);
    }
}