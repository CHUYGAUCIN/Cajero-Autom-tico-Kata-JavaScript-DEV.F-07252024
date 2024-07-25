//Usuarios y sus datos//
let cuentas =[
    {nombre: "Ana Villanueva", saldo:300, password: '123'},
    {nombre: "Jesus Gaucin", saldo:990, password: '456'},
    {nombre: "Liz Alonso", saldo:10, password: '789'}
];


let nombre, saldoActual;


document.addEventListener('DOMContentLoaded', () => {
    let consultar = document.getElementById('btnConsultar'); 
    let depositar = document.getElementById('btnDepositar'); 
    let retirar = document.getElementById('btnRetirar'); 
    let boton = document.getElementById('inicio');  

    if (boton) boton.addEventListener('click', inicio);

    if (!boton) nomUsuario();

    if (consultar) consultar.addEventListener('click', consultarSaldo);
    if (depositar) depositar.addEventListener('click', depositarMonto);
    if (retirar) retirar.addEventListener('click', retirarMonto);
});

function mostrarCajero() {
    window.location.href = 'cajero.html'
}

function mostrarInicio() {
    window.location.href = 'index.html'
}

function vaciarSaldo() {
    document.getElementById('saldo').innerHTML = '';
}

function vaciarInputDepositar() {
    document.getElementById('depositar').value = '';
}

function vaciarInputRetirar() {
    document.getElementById('retirar').value = '';
}

function vaciarTransaccion() {
    document.getElementById('transaccion').innerHTML = '';
    document.getElementById('nuevoSaldo').innerHTML = '';
}

function vaciarAlertas() {
    document.getElementById('alerta').innerHTML = '';
    document.getElementById('alertaSaldo').innerHTML = '';
    document.getElementById('alertaTransaccion').innerHTML = '';
}

function vaciarAlerta2y3() {
    document.getElementById('alertaSaldo').innerHTML = '';
    document.getElementById('alertaTransaccion').innerHTML = '';
}

function vaciarSaldoAlertaTransaccion() {
    vaciarAlerta2y3();
    vaciarSaldo();
    vaciarTransaccion();
}


function login() {
    const usuario = document.getElementById('usuario').value; 
    const contraseña = document.getElementById('contraseña').value; 

    let usuarioEncontrado = false; 

    
    for (let i = 0; i < cuentas.length; i++) {
        if (usuario === cuentas[i].nombre && contraseña === cuentas[i].password) {
            nombre = usuario; 
            saldoActual = parseFloat(localStorage.getItem(nombre) || cuentas[i].saldo)
            localStorage.setItem('saludo', nombre); 
            localStorage.setItem(nombre, saldoActual); 
            mostrarCajero(); 
            usuarioEncontrado = true; 
            break; 
        }
    }

    if (!usuarioEncontrado) {
        document.getElementById('alerta').innerHTML = 'Usuario o contraseña incorrectos';
        
    }
}

function nomUsuario() {
    let nombreUsuario = localStorage.getItem('saludo'); 
    saldoActual = parseFloat(localStorage.getItem(nombreUsuario)) || 0; 
    document.getElementById('saludo').innerHTML =                '  Bienvenid@' + nombreUsuario; 
}

function consultarSaldo() {
    document.getElementById('saldo').innerHTML = 'Saldo: $' + saldoActual; 
    vaciarInputDepositar(); 
    vaciarInputRetirar(); 
    vaciarAlertas(); 
    vaciarTransaccion(); 
}

// Función para manejar el depósito de dinero
function depositarMonto() {
    let monto = document.getElementById('depositar').value; 
    let deposito = parseFloat(monto); 
    let saldoMasDeposito = deposito + saldoActual; 

    vaciarInputRetirar(); 

    if (monto === '') { 
        document.getElementById('alerta').innerHTML = 'Escriba el monto a depositar';
        vaciarSaldoAlertaTransaccion();
    } else if (deposito <= 0) { 
        document.getElementById('alerta').innerHTML = 'Ingrese una cantidad válida';
        vaciarSaldo();
        vaciarTransaccion();
    } else if (saldoMasDeposito > 990) { 
        document.getElementById('alerta').innerHTML = 'Lo lamento, no puede tener más de $990 en su cuenta';
        document.getElementById('alertaSaldo').innerHTML = 'Saldo actual: $' + saldoActual;
        document.getElementById('alertaTransaccion').innerHTML = 'Error en la transacción: depósito de $' + deposito;
        vaciarInputDepositar();
        vaciarSaldo();
        vaciarTransaccion();
    } else { 
        vaciarAlertas();
        saldoActual = saldoMasDeposito; 
        localStorage.setItem(nombre, saldoActual); 
        document.getElementById('transaccion').innerHTML = 'Depósito de: $' + deposito; 
        document.getElementById('nuevoSaldo').innerHTML = 'Saldo actual: $' + saldoActual; 
        vaciarInputDepositar(); 
        vaciarSaldo(); 
    }
}

// Función retiro de dinero
function retirarMonto() {
    let cantidad = document.getElementById('retirar').value; 
    let retiro = parseFloat(cantidad); 
    let saldoMenosRetiro = saldoActual - retiro; 

    vaciarInputDepositar(); 

    if (cantidad === '') { 
        document.getElementById('alerta').innerHTML = 'Escriba el monto a retirar';
        vaciarSaldoAlertaTransaccion();
    } else if (retiro <= 0) { 
        document.getElementById('alerta').innerHTML = 'Ingrese una cantidad válida';
        vaciarSaldo();
        vaciarTransaccion();
    } else if (saldoMenosRetiro < 10) { 
        document.getElementById('alerta').innerHTML = 'Lo lamento, no puede tener menos de $10 en su cuenta';
        document.getElementById('alertaSaldo').innerHTML = 'Saldo actual: $' + saldoActual;
        document.getElementById('alertaTransaccion').innerHTML = 'Error en la transacción: retiro de $' + retiro;
        vaciarInputRetirar();
        vaciarSaldo();
        vaciarTransaccion();
    } else { 
        vaciarAlertas();
        saldoActual = saldoMenosRetiro; 
        localStorage.setItem(nombre, saldoActual); 
        document.getElementById('transaccion').innerHTML = 'Retiro de: $' + retiro;
    }
}