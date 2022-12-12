const fs = require('fs/promises')

//lee archivo
const info = fs.readFile('./promises/file.txt', 'utf-8', (error, info) => {
    if(error){
        console.log('Hubo un error')
    }
    console.log("info", info)
    fs.writeFile('./promises/output.txt', 'archivo nuevo', (error)=> {
        if(error){
            console.log(error)
        }else {
            console.log("archivo creado")
            fs.appendFile('./promises/output.txt', 'contenido agregado', (error)=> {
                if(error){
                    console.log(error)
                }else {
                    console.log("Archivo actualizado.")
                    fs.exists('./promises/output.txt', (error, exist) => {
                        if(error){
                            console.log(error)
                        } else {
                            if(exist) {
                                fs.unlink('/promises/output.txt', (error) => {
                                    if(error) {
                                        console.log(error)
                                    }
                                } )
                            }
                        }
                    })
                }
            })
            
        }
        
    })
})
