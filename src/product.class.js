// Aquí la clase Product

class Product{
    constructor(id, name, price, units=0){
        this.id = id
        this.name = name
        this.price = price
        this.units = units
    }
    changeUnits(units){
        let auxUnits = this.units
        auxUnits += units
        if(auxUnits < 0){
            throw "ERROR"
        }else{
            this.units += units
            return this
        }
    }

    productImport(){
        return this.price * this.units
    }


    toString(){
        return this.name+': '+this.units+' uds. x '+this.price.toFixed(2)+' €/u = '+this.productImport().toFixed(2)+' €';
    }
}

module.exports = Product;
