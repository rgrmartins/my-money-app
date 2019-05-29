//middleware que irá colocar cabeçalhos na resposta
module.exports = (req, res, next) => {
    //Está liberando a api para acesso global
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    next()
}

//Podemos resntringir para somente alguns endereços, e assim aumentar a segurança dos dados