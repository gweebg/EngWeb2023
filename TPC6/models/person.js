const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
    cidade: String,
    distrito: String
});

const ppartySchema = mongoose.Schema({
    party_aabr: String,
    party_name: String
});

const attrsSchema = mongoose.Schema({
    fumador: Boolean,
    gosta_cinema: Boolean,
    gosta_viajar: Boolean,
    acorda_cedo: Boolean,
    gosta_ler: Boolean,
    gosta_musica: Boolean,
    gosta_comer: Boolean,
    gosta_animais_estimacao: Boolean,
    gosta_dancar: Boolean,
    comida_favorita: String,
})

const personSchema = mongoose.Schema({

    _id: {
        type: String,
        validate: {

            validator: function (val) {return /p(\d)+/.test(val)},
            message: props => `${props.value} is not a valid "_id" number (pX(X))!`
        
        }
    },

    nome: {
        type: String,
        required: true,
    },

    idade: {
        type: Number,
        required: true
    },

    sexo: {
        type: ['feminino', 'masculino', 'outro'],
        required: true
    },

    morada: {
        type: addressSchema,
        required: true
    },

    BI: {
        type: String,
        required: true,
        validate: {

            validator: function (val) {return /\d{8}-\d{1}/.test(val)},
            message: props => `${props.value} is not a valid "BI" number (xxxxxxxx-x)!`

        }
    },

    profissao: {
        type: String,
        required: true
    },

    partido_politico: ppartySchema,
    religiao: String,

    desportos: {
        type: [String],
        required: true
    },

    animais: {
        type: [String],
        required: true
    },

    figura_publica_pt: [String],

    marca_carro: {
        type: String,
        required: true
    },

    destinos_favoritos: {
        type: [String],
        required: true
    },

    atributos: {
        type: attrsSchema,
        required: true
    }
});

module.exports = mongoose.model('person', personSchema);