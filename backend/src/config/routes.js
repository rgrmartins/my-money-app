//Configuração de rotas da aplicação
const express = require('express') //é um singleton (Retorna uma unica instância)
const auth = require('./auth')

module.exports = function (server) { //assim pegamos o mesmo server do arquivo server.js
    
    /* Rotas protegidas por Token JWT */
    const protectedApi = express.Router()
        server.use('/api', protectedApi)
        protectedApi.use(auth)
    
    const BillingCycle = require('../api/billingCycle/billingCycleService')
        BillingCycle.register(protectedApi, '/billingCycles')
    
    /* Rotas abertas */
    const openApi = express.Router()
        server.use('/oapi', openApi)
    
    const AuthService = require('../api/user/authService')
        openApi.post('/login', AuthService.login)
        openApi.post('/signup', AuthService.signup)
        openApi.post('/validateToken', AuthService.validateToken)
}