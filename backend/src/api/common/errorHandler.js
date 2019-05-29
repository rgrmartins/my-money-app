//Handler para cadastrar erros (array de strigs de erros) - simples, para projetos maiores fazer mais robusto
const _ = require('lodash')

//Retornando um middleware (Assinatura padrão)
module.exports = (req, res, next) => {
    //onde fica a lista de erro
    const bundle = res.local.bundle

     if (bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
     } else {
         //tem que chamar o next caso não tenha erro, senão interrompe a cadeia de middleware
         next()
     }
}

const parseErrors = (nodeRestfullErrors) => {
    const errors = []
    _.forIn(nodeRestfullErrors, error => errors.push(error.message))
    return errors
}