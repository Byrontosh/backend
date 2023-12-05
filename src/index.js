// Creación de un servidor web en Express
const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
app.set('views', './src/views')


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



app.post('/entrada',(req,res)=>{
    res.send("Entrada del local")
})
app.use((req,res,next)=>{
    const {email,password} = req.body
    if(email==="byron@gmail.com" && password==="12345"){
        next()
    }
    else{
        res.send("El usuario no se encuentra autenticado")
    }
})
app.get('/bienvenidos',(req,res)=>{
    res.send(`Bienvenido ${req.body.email} al sistema web`)
})


app.listen(3000)
console.log('Servidor ejecutandose en el puerto 3000')



