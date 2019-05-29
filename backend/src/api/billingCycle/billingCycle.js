//Mapeamento do objeto para ser salvo no banco de dados (Schema)
//Servirá também para validações do objeto
const restful = require('node-restful')
const mongoose = restful.mongoose //pegando o mongoose do restfull

//Mapear os Objetos
//Schema referente ao crédito 
const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: true }
})

//Schema referente ao Débito]
const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //mensagem de erro quando o required for violada é o exemplo abaixo
    value: { type: Number, min: 0, required: [ true, 'Informe o valor do débito'] },
    status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

//Schema referente ao ciclo de pagamento
const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, min: 1, max: 12, required: true },
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})

//será salvo no banco usando o schema do billingCycle
module.exports = restful.model('BillingCycle', billingCycleSchema)