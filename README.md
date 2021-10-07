# Bloc 1: Javascript. Práctica 3.1 - POO
En este ejercicio vamos a trabajar con los productos de un almacén, para lo que crearemos las clases **Product** y **Store**.

## Clase Product
La guardaremos en el fichero _product.class.js_. Tendrá las siguientes **propiedades**:
  - **id**
  - **name**
  - **price**
  - **units**: argumento opcional (si no le pasamos este parámetro al constructor su número por defecto será 0).
  
Esta clase tendrá los siguientes **métodos**:
  - **changeUnits**: recibe el número de unidades a añadir al objeto (debe ser un entero positivo para aumentar, o negativo para disminuir unidades). Devolverá el producto modificado. Si se intentan restar más unidades de las que hay no resta nada y genera un error.
  ```javascript
  changeUnits(units: Integer): Product
  ```    
  - **productImport**: devuelve el importe total del producto (su precio multiplicado por el nº de unidades)
  ```javascript
  productImport(): Number
  ```  
  - **xxxx** (¿qué nombre le deberías dar a este método?): si se intenta **imprimir** el producto se mostrará su descripción, sus unidades entre paréntesis, su precio y el importe total (los € siempre con 2 decimales) como en el siguiente ejemplo:
```html
        TV Samsung MP45: 10 uds. x 235,95 €/u = 2359,50 €
```

  ```javascript
  xxxx(): String
  ``` 

## Clase Store
Es el almacén de productos (podríamos tener más de uno) que guardaremos en _store.class.js_. Tendrá las **propiedades**:
  -  **id**: código numérico que nos pasan al crear el almacén
  -  **products**: array de productos. No se le pasa al constructor sino que al crear un almacén se inicializa a un array vacío.
  
La clase tendrá los **métodos**:
  - **findProduct**: recibe como parámetro una id de producto y devuelve el producto del almacén que tiene dicha id (si no existe devolverá _undefined_)
  ```javascript
  findProduct(id: Integer): Product|undefined
  ```
  - **addProduct**: recibe como **único** parámetro **un objeto** con los datos del producto a añadir (propiedades _name_, _price_ y, opcionalmente, _units_, no _id_). Este método crea un nuevo producto (llamará al constructor de la clase _Product_) y lo añade al almacén. Como a la clase _Product_ hay que pasarle una _id_ haremos una función que la calcule buscando la máxima _id_ de los productos que hay en el almacén (debéis usar un _reduce_) y sumándole 1. Este método devuelve el producto añadido al almacén o genera un error si
    - no se le pasa _name_
    - no se le pasa _price_ o no es un número positivo
    - se le pasa _units_ pero no es un número entero positivo
  ```javascript
  addProduct(data: Object): Product
  ```
  - **delProduct**: recibe como parámetro la id de un producto y, si no tiene unidades, lo elimina del almacén y devuelve el producto eliminado. Genera un error si no existe el producto o si sus unidades no están a 0
  ```javascript
  delProduct(id: Integer): Product
  ```
  - **changeProduct**: recibe como **único** parámetro **un objeto** con la id de un producto y uno o más campos a modificar con sus nuevos valores (los campos que no se pasan permanecerán sin cambios). Devuelve el objeto modificado si ha podido hacerse o genera un error en caso contrario
  ```javascript
  changeProduct(data: Object): Product
  ```
  - **changeProductUnits**: recibe como parámetros la id de un producto y el número de unidades a incrementar (o disminuir si el número es negativo). Devuelve el producto modificado si ha podido hacerse o generará un error en caso contrario
  ```javascript
  changeProductUnits(id: Integer, units: Integer): Product
  ```  
  - **totalImport**: devuelve el valor total de los productos del almacén (su precio por sus uds). Para ello usa el método _productImport_ de cada producto
  ```javascript
  totalImport(): Number
  ```    
  - **underStock**: recibe un nº de unidades y devuelve un array con los productos que tengan menos de dichas unidades
  ```javascript
  underStock(units: Integer): Array
  ```    
  - **orderByUnits**: devuelve el array de productos ordenado por unidades de forma descendente
  ```javascript
  orderByUnits(): Array
  ```    
  - **orderByName**: devuelve el array de productos ordenado por el nombre del producto
  ```javascript
  orderByName(): Array
  ```    
  - **xxxx** (¿qué nombre le deberías dar a este método?): si se intenta imprimir el almacén devuelve una cadena con la id del almacén, el nº de productos y su importe total con 2 decimales, y debajo una lista con los datos de cada producto como en el siguiente ejemplo:
```html
Almacén 1 => 2 productos: 2174,75 €
- TV Samsung MP45: 10 uds. x 235,95 €/u = 2359,50 €
- USB Kingston 16 GB: 100 uds. x 19,95 €/u = 1995,00 €
```

  ```javascript
  xxxx(): String
  ```  

## Organizar el código: webpack
Lo correcto es no tener todo el código en un único fichero javascript sino cada cosa en su fichero correspondiente. Así que dentro de la carpeta **src/** crearemos los ficheros:
- **product.class.js**: la clase _Product_ con sus propiedades y métodos
- **store.class.js**: la clase _Store_ con sus propiedades y métodos
- **index.js**: el programa principal que crea el almacén, lo modifica (añade, elimina y modifica productos) y muestra por consola su contenido

En el _index.html_ habría que enlazar los 3 ficheros en el orden correcto (productos, almacén y index para que desde _index.js_ se pueda llamar a métodos de _Store_ y desde _store.js_ a métodos de _Product_). Como esto ya empieza a ser incómodo vamos a hacer uso de **_webpack_** para que empaquete todos nuestros ficheros javascript en un único fichero que se llamará _./dist/main.js_ y que será el único que enlazaremos en el _index.html_. Consulta [cómo usar webpack](../12-tests.html#usando-webpack) para hacerlo. 

Lo que habría que hacer (no lo hagas, ya tienes el _package.json_) es:
- `npm init`: inicializamos nuestro proyecto lo que creará el fichero **package.json**. Recuerda escribir **jest** cuando nos pregunte por los tests
- `npm i -D webpack webpack-cli`: instalamos _webpack_ como dependencia de desarrollo (en la versión de producción no estará)
- 
En este ejercicio ya tienes el _package.json_ creado y configurado por lo que lo único que tienes que hacer es que se instalen las dependencias (`npm install`). Una vez hecho:
- para pasar los test ejecuta `npm run test`
- cuando quieras probarlo en el navegador ejecuta `npx webpack --mode=development`: esto crea el fichero **dist/main.js** (el que está enlazado en el _index.html_) donde mete el código de todos nuestros ficheros javascript. Deberás ejecutarlo cada vez que hagas cambios en tu código y quieras probarlos en el navegador

Fijaos en el código que os paso. Para que la clase _Store_ pueda usar los métodos de _Product_ debemos hacer:
- añadir al final deconst Store = require('./store.class');

 _product.class.js_ el código `module.exports = Product`. Esto hace accesible la clase a cualquier fichero que importe _product.class.js_. Es lo mismo que hacíamos en los ficheros _functions.js_ de los ejercicios anteriores para que los tests pudieran acceder a sus funciones
- añadir al principio de _store.class.js_ el código `const Product = require('./product.class')`. Crea una variable _Product_ que es la clase exportada en el otro fichero

Lo mismo tendréis que hacer para que _index.js_ pueda llamar a métodos de _Store_ (exportar la clase en _store.class_ e importar ese fichero en _index_).

## Probar el código
En la carpeta _test_ ya tienes hechos varios test que puedes pasar para comprobar tu código. Recuerda que simplemente debes hacer:
```javascript
npm run test
```

Para probar que funciona en el navegador añade al fichero _index.js_ el código necesario para:
- crear un almacén
- le añade los siguientes 4 productos:
  - 'TV Samsung MP45', 345.95 €, 3 uds. 
  - 'Ábaco de madera', 245.95 €
  - 'impresora Epson LX-455', 45.95 €
  - 'USB Kingston 16GB', 5.95 €, 45 uds.
- cambia los siguientes productos:
  - a la TV le cambiamos el precio por 325.90 y sus unidades pasarán a ser 8
  - al ábaco le sumamos 15 uds
  - a la impresora le ponemos de precio 55.90 y de unidades -2
  - a la TV le restamos 10 unidades
  - al ábaco le cambiamos el nombre por 'Ábaco de madera (nuevo modelo)'
- mostrar por consola el almacén
- mostrar por consola el texto 'LISTADO DEL ALMACÉN alfabético'
- mostrar por consola el almacén ordenado alfabéticamente
- eliminar la TV
- eliminar la impresora
- mostrar por consola 'LISTADO DEL ALMACÉN por existencias'
- mostrar por consola el almacén ordenado por existencias
- mostrar por consola 'LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS'
- mostrar por consola los productos del almacén con menos de 10 unidades

Recuerda que siempre que llames a una función que pueda generar un error debes hacer dicha llamada dentro de una sentencia `try...catch`. Lo que haremos en _index.js_ si captura un error es mostrarlo por consola con el comando `console.error`.

Al abrir la página en el navegador la consola deberá mostrar lo siguiente:

```
Almacén 1 => 4 productos: 6564.20 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
LISTADO DEL ALMACÉN alfabético
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- impresora Epson LX-455: 0 uds. x 45.95 €/u = 0.00 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
LISTADO DEL ALMACÉN por existencias
- USB Kingston 16GB: 45 uds. x 5.95 €/u = 267.75 €
- Ábaco de madera (nuevo modelo): 15 uds. x 245.95 €/u = 3689.25 €
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
LISTADO DE PRODUCTOS CON POCAS EXISTENCIAS
- TV Samsung MP45: 8 uds. x 325.90 €/u = 2607.20 €
```

y además 3 mensajes de error debido a que:
- se pasan unidades negativas (-2) a _changeProduct_ al cambiar los datos de la impresora
- se intentan restar más unidades (10) de las que quedan (8) a la TV
- se intenta borrar el producto 1 y le quedan 8 unidades

**NOTA**: cuando acabes tu práctica mira el código que genera webpack (dist/main.js). Ahora vuelve a generarlo pero esta vez para producción (`--mode=production`) y fíjate de nuevo en el código del fichero. 
