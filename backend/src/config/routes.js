//Configuração de rotas da aplicação
const express = require('express') //é um singleton (Retorna uma unica instância)

module.exports = function(server) { //assim pegamos o mesmo server do arquivo server.js

    //Definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    //Rotas de Ciclo de Pagamento
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles') //mapeando o model para essa url

}