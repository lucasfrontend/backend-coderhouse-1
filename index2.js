const fs = require('fs/promises')
const { existsSync } = require('fs');

class ProductManager {
    constructor(path){
        console.log('instancia creada')
        this.path = path
    }

    async addProduct(product) {
        try{
            const saveProducts = await this.getProducts()
            const DuplicatedProduct = saveProducts.find(item => item.code == product.code)
            if (DuplicatedProduct){
                throw new Error(`No se pudo añadir, código registrado: ${product.code}`)
            }
            if (Object.keys(product).length < 6) {
                throw new Error(`No se pudo añadir, incluir todos los campos`)
            }
            const newId = saveProducts.length > 0 ? saveProducts[saveProducts.length -1 ].id + 1 : 1
            const newProduct = {
                id: newId, 
                ...product
            }
            saveProducts.push(newProduct)
            const prodList = JSON.stringify(saveProducts, null, '\t')
            await fs.writeFile(this.path, prodList)
            console.log(`${product.title} añadido`)
        }
        catch(error){
            console.log(error.message)
        }
    }
    
    async getProducts() {
        try{
            if (existsSync(this.path)){
                const products = await fs.readFile(this.path, 'utf-8')
                if(products.length > 0){
                    const parsedProducts = JSON.parse(products)
                    return parsedProducts
                }
                else return []
            }
            else return []
        }
        catch(error){
            console.log(error.message)
        }
    }

    async getProductById(id) {
        try{
            const saveProducts = await this.getProducts();
            const selectedProduct = saveProducts.find(prod => prod.id === id)
            if(!selectedProduct){
                throw new Error('Ningun producto coincide con el id.')
            }
            return selectedProduct
        }
        catch(error){
            console.log(error.message)
        }
    }

    async updateProduct(id, product) {
        try{
            const saveProducts = await this.getProducts()
            const targetProduct = await this.getProductById(id)
            if(targetProduct){
                const updatedProduct = {...targetProduct, ...product}
                const updatedList = saveProducts.map(prod =>{
                    if(prod.id === id){
                        return updatedProduct
                    }else{
                        return prod
                    }
                })
                const prodList = JSON.stringify(updatedList, null, '\t')
                await fs.writeFile(this.path, prodList)
                console.log('producto modificado')
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

    async deleteProduct(id) {
        try{
            const saveProducts = await this.getProducts();
            const targetProduct = await this.getProductById(id)
            const filteredList = saveProducts.filter(prod => prod.id !== id)
            if(!targetProduct){
                throw new Error('No se encuentra la id especificada')
            }
            else{
                const prodList = JSON.stringify(filteredList, null, '\t')
                await fs.writeFile(this.path, prodList)
                console.log(`${targetProduct.title} eliminado`)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }
}

//nueva instancia
const ProductManager1 = new ProductManager('./datos/products.json')
//devuelve arreglo vacio
ProductManager1.getProducts();
//agrega objeto
ProductManager1.addProduct("prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
//devuelve el producto creado
ProductManager1.getProducts();
//arroja error por codigo repetido
ProductManager1.addProduct("prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25)
