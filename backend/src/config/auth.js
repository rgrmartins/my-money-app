//Filtro para validar autecidade do token gerado se é o mesmo que criamos com a nossa chave secreta
//Esse middleware será o responsável por validar o token JWT para as rotas protegidas e garantir que a API esteja protegida.
const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization']
        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] })
        }
        jwt.verify(token, env.authSecret, function (err, decoded) {
            if (err) {
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                //essa linha era só se quiser passar o token decodificado pra outro middleware (não é nosso caso)
                //req.decoded = decoded
                next()
            }
        })
    }
}