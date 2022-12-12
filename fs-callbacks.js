const fs = require('fs')
const path = require('path')

//lee archivo
const info = fs.readFile('./callbacks/file.txt', (error, info) => {
    if(error){
        console.log('Hubo un error')
    }
    console.log("info", info)
    fs.writeFile('./callbacks/output.txt', 'archivo nuevo', (error)=> {
        if(error){
            console.log(error)
        }else {
            console.log("archivo creado")
            fs.appendFile('./callbacks/output.txt', 'contenido agregado', (error)=> {
                if(error){
                    console.log(error)
                }else {
                    console.log("Archivo actualizado.")
                    fs.exists('./callbacks/output.txt', (error, exist) => {
                        if(error){
                            console.log(error)
                        } else {
                            if(exist) {
                                fs.unlink('/callbacks/output.txt', (error) => {
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
