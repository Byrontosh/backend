// Importación de librerías
const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path')



const app = express()

app.use(express.json())

app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname,"views"))


// Manejo de rutas
app.get('/',(req,res)=>{
    res.send("Landing page")
})
app.get('/dashboard',(req,res)=>{
    res.send("Dashboard principal")
})


// Manejo de request en Express
app.post('/register',(req,res)=>{
    const {email,password} = req.body
    res.send(`Los datos enviados son: ${email} - ${password}`)
})

app.get('/consumir/:convenios',(req,res)=>
{
    console.log(typeof(req.params.convenios))
    res.send(`Listado de convenios`)
})

app.get('/consumir/:convenios/:id',(req,res)=>
{
    const {convenios,id} = req.params
    res.send(`Listado del convenio - ${id}`)
})

app.get('/search',(req,res)=>{
    console.log(req.query)
    if(req.query.searchword === "pasantias")
    {
        res.send("Pasantías de la ESFOT")
    }
    else{
        res.send("No existen registros")
    }
})


// Manejo de response en Express
app.get('/hamburguesa/simple',(req,res)=>{
    res.send("Hamburgesa simpe")
})

console.log(__dirname)
app.get('/hamburguesa/doble',(req,res)=>{
    res.sendFile('./doble.png',{
        root:__dirname
    })
})

app.get('/hamburguesa/triple',(req,res)=>{
    res.sendFile('./triple.docx',{
        root:__dirname
    })
})

app.get('/hamburguesa/mixta',(req,res)=>{
    res.status(200).json({
        "tipo":"triple",
        "entregado":"Joe"
    })
})

app.get('/hamburguesa/vegana',(req,res)=>{
    res.render('home')
})


// Manejo de middlewares

app.get('/entrada',(req,res)=>{
    res.send("Entrada al local")
})

app.use((req,res,next)=>{

    const {email,password} = req.body
    if (email ==="byron@gmail.com" && password === "12345"){
        next()
    }
    else{
        res.send("Usuario no registrado")
    }
})

app.get('/pedidos',(req,res)=>{
    res.send(`Bienvenido - ${req.body.email}`)
})



app.listen(3000)
console.log('Servidor ejecutandose en el puerto 3000')



