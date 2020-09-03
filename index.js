const express = require('express')
const app = express()

const path = require('path')//To working in zate now

const convert = require('./lib/convert')

//Setando ejs
app.set('view engine','ejs')
//Para usar os views
app.set('views',path.join(__dirname,'views'))//Create new project (com barras)
app.use(express.static(path.join(__dirname,'public')))
//Route 1
app.get('/',(req, res) => {
    res.render('home')
})
//Route 2
app.get('/cotacao',(req,res) => {
    const { cotacao, quantidade } = (req.query)
    if(cotacao && quantidade){
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else{
        res.render('cotacao',{
            error: 'Valores inválidos'
        })
    }
})
app.listen(3000, err => {
    if(err){
        console.log('Server not begin')
    }else{
        console.log('Server Up! :)')
    }
})
