const Product = require('./product.class');

// Aquí la clase Store
class Store{
    constructor(id){
        this.id = id
        this.products = new Array()
    }

    findProduct(id){
        return this.products.find(item => item.id === id) 
    }

    addProduct(data){
        if(!data.name ){
            throw 'ERROR no has pasado el name'
        }
        if(!data.price ){
            throw 'ERROR no has pasado el price'
        }
        if(!isNaN(data.price)){
            if(data.price < 0){
                throw 'ERROR el precio no es positivo'
            }
        }else{
            throw 'ERROR el precio no es numerico'
        }
        if(data.units ){
            if(!Number.isInteger(data.units)){
                throw 'ERROR units no es entero'
            }
            if(data.units < 0){
                throw 'ERROR units no es positivo'
            }
        }
        
        let newProduct = new Product(this.maxId()+1,data.name,data.price,data.units)
        this.products.push(newProduct)
        return newProduct
        
    }

    maxId(){
        return this.products.reduce((max,product) => product.id > max ? product.id : max,0) 
    }

    delProduct(id){
        let product = this.findProduct(id)
        if(!product || product.units > 0){
            throw 'ERROR el producto buscado no existe o tiene aun unidades'
        }else if(product.units > 0){
            throw 'ERROR el producto buscado tiene aun unidades'
        }else{
            this.products = this.products.filter((item) => item.id !== id)
            return product
        }

    }

    changeProduct(data){
        let originalProduct = this.findProduct(data.id)
        if(data.name){
            originalProduct.name = data.name
        }
        if(data.price || data.price == 0){
            if(isNaN(data.price)){
                throw 'ERROR el precio no es numerico'
            }else if(data.price < 0){
                throw 'ERROR el precio es negativo '
            }else{
                originalProduct.price = data.price
            } 
        }
        if(data.units || data.units == 0){
            if(isNaN(data.units)){
                throw 'ERROR las unidades no son numerico'
            }else if(!Number.isInteger(data.units)){
                throw 'ERROR las unidades no son un numero entero'
            }else if(data.units < 0){
                throw 'ERROR las unidades no pueden ser negativas'
            }else{
                originalProduct.units = data.units
            } 
        }
        return originalProduct
    }

    changeProductUnits(id, units){
        let product = this.findProduct(id)
        let aux = product.units
        if(!product){
            throw 'ERROR no existe producto'
        }
        if(units){
            if(!Number.isInteger(units)){
                throw 'ERROR units no es entero'
            }
        }else{
            throw 'ERROR no hay unidades'
        }
        aux += units
        if(aux < 0){
            throw "ERROR error unidades acabadas"
        }else{
            product.units += units
            return product
        }
    }

    totalImport(){
        return this.products.reduce((importeTotal,producto) => importeTotal += producto.productImport(),0)
    }

    underStock(units){
        return this.products.filter((product) => product.units < units)
    }

    orderByUnits(){
        return this.products.sort((product1,product2) => product2.units - product1.units)
    }

    orderByName(){
        return this.products.sort((product1,product2) => product1.name.localeCompare(product2.name))
    }

    toString(){
        let linea = 'Almacén '+this.id+' => '+this.products.length+' productos: '+this.totalImport().toFixed(2)+' €';
        this.products.map((product) => linea += '\n- '+product.toString())
        return linea
    }

    toStringArrays(product){
        let linea = ''
        product.map((product) => linea += '\n- '+product.toString())
        return linea
    }
}

// y tendrás que exportarla

module.exports = Store;