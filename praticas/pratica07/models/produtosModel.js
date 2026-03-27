const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    minlength: [3, 'Nome deve ter pelo menos 3 caracteres']
  },
  preco: {
    type: Number,
    required: [true, 'Preço é obrigatório']
  }
});

module.exports = mongoose.model('Produto', schema);