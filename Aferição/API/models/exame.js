const mongoose = require('mongoose');

const nomeSchema = mongoose.Schema({

    primeiro: String,
    segundo: String

});

const exameSchema = mongoose.Schema({

    _id: String,
    index: Number,
    dataEMD: String,
    nome: nomeSchema,
    idade: Number,
    género: {
        type: String,
        enum: ['F', 'M']
    },
    morada: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean

});

module.exports = mongoose.model('exames', exameSchema);
