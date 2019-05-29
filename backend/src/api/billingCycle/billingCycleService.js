//Definir os serviços Rest
const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
//fazer as validações serem efetivadas tanto na inserção quanto na alteração e retornar o objeto novo e não o antigo (Quem vem por padrão)
BillingCycle.updateOptions({ new: true, runValidators: true })
//Forma de interceptar as requisições usando o middleware de erro (para poder tratar e aplicar o erro)
//after método do nodeRestful
BillingCycle.after('post', errorHandler).after('put', errorHandler)


//Serviço para contar registros no banco
BillingCycle.route('count', (req, res, next) => {
    //O route ja tem um método de contar que retorna essa callback
    BillingCycle.count((error, value) => {
        //tratando o erro caso tenha
        if (error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({ value })
        }
    })
})

//serviço para retornar o sumário do ciclo de pagamento (Igual Projeção do Hibernate)
//valor consolidado de todos os anos, caso queira separar etc, é no $group _id que definiremos isso
BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([
        { $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}},
        { $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}},
        { $project: { _id: 0, credit: 1, debt: 1}},
        ],
        (error, result) => {
        if(error){
            res.status(500).json({errors: [error]})
        }else {
            res.json(result[0] || { credit: 0, debt: 0 })
        }}        
        )
})

module.exports = BillingCycle