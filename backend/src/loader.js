/*Por ser o principal arquivo de entrada aqui faremos referencias paras os demais arquivos
de configuração necessários para que o server funcione */
const server = require('./config/server')
require('./config/database')
//Fazendo referencia as rotas porém é necessário passar o server como parametro
require('./config/routes')(server)