'use strict'

const Store = require("./store.class")

// Creamos un nuevo almacén con id 1
// Antes deberás haber importado la 
// clase Store para poder usarla
const myStore = new Store(1)
// Añadimos los 4 objetos que nos piden
const prod1 ={
    name: 'TV Samsung MP45',
    price: 345.95 ,
    units: 3
}
const prod2 ={
    name: 'Ábaco de madera',
    price: 245.95
}
const prod3 ={
    name: 'impresora Epson LX-455',
    price: 45.95 
}
const prod4 ={
    name: 'USB Kingston 16GB',
    price: 5.95 ,
    units: 45
}
const prod1Cambio ={
    id: 1,
    price: 325.90 ,
    units: 8
}
const prod3Cambio ={
    id: 3,
    price: 45.95 ,
    units: -2
}
const prod2Cambio ={
    id: 2,
    name: 'Ábaco de madera (nuevo modelo)'
}
try{
    myStore.addProduct(prod1)
    myStore.addProduct(prod2)
    myStore.addProduct(prod3)
    myStore.addProduct(prod4)
}catch(error){
    console.error(error)
}
// Hacemos las 5 modificaciones

myStore.changeProduct(prod1Cambio)
myStore.changeProductUnits(2,15)
try{
    myStore.changeProduct(prod3Cambio)
}catch(error){
    console.error(error)
}
try{
myStore.changeProductUnits(1,-10)
}catch(error){
    console.error(error)
}
myStore.changeProduct(prod2Cambio)

// Mostramos por consola todo lo que nos piden

console.log(myStore.toString())
console.log('LISTADO DEL ALMACÉN alfabético'+myStore.toStringArrays(myStore.orderByName()))

// Eliminamos los 2 productos
try{
    myStore.delProduct(1)
}catch(error){
    console.error(error)
}
myStore.delProduct(3)

// Mostramos por consola todo lo que nos piden
console.log('LISTADO DEL ALMACÉN por existencias'+myStore.toStringArrays(myStore.orderByUnits()))
console.log('LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS'+myStore.toStringArrays(myStore.underStock(10)))