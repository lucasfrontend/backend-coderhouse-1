
//clase
class ProductManager{
    constructor (){
        console.log('instancia creada')
        //inicia como arreglo vacio
        this.products = []
        this.idCounter = 1
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const repeatedProduct = this.products.find(item => item.code == code)
        if (repeatedProduct){
            console.error(`No se puede agregar ${title}. El producto ya se encuentra registrado. ${code}`)
            return
        }
        const newProduct = {
            id: this.idCounter,
            title,
            description,
            price, 
            thumbnail, 
            code, 
            stock
        }

        this.idCounter ++

        let productValues = Object.values(newProduct)
        let validValues = productValues.filter(item => item !== undefined)
        if(validValues.length < 7){
            console.error('Todos los campos deben ser registrados')
            return
        }

        this.products.push(newProduct)
        console.log(`${title} agregado`)
    }

    getProducts = () => {
        console.log(this.products)
        return this.products
    }

    getProductById = (id) =>{
        let searchId = this.products.find(item => item.id == id)
        if (searchId){
            return searchId
        }
        console.error('Product not found')
    }
}


//nueva instancia
const ProductManager1 = new ProductManager()
//devuelve arreglo vacio
ProductManager1.getProducts();
//agrega objeto
ProductManager1.addProduct("prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
//devuelve el producto creado
ProductManager1.getProducts();
//arroja error por codigo repetido
ProductManager1.addProduct("prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
