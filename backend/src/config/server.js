/* Configuração do servidor web - Backend */
const port = 3003


//Referencia de alguns middlewares importantes
const bodyParser = require('body-parser') //responsável por fazer o parser das requisições para o node (tratamento das requisições)
const express = require('express') //é um singleton (Retorna uma unica instância)
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const server = express()



server.use(bodyParser.urlencoded({ extended: true })) //pra toda requisição que chegar use o bodyParser
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

//Escutando a porta e caso consiga alocar retorna a função
server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

//para ser pego no loader e passar para o Routes temos que exportar o server
module.exports = server