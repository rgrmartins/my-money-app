const mongoose = require('mongoose')
mongoose.Promise = global.Promise //Api do Promise do node e usar a do mongoose
//exportando a conexão com o mongodb
module.exports = mongoose.connect('mongodb://localhost/mymoney')

//Tratamento das mensagens retornadas pela API (Tradução)
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite mínimo de '{MAX}'."
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'."