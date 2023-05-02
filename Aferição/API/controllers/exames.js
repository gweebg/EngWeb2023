const Exame = require('../models/exame');

module.exports.listAll = () => {

    const agg = [
        {
            $project: { _id: 1, nome: 1, dataEMD: 1, resultado: 1}
        }
    ];

    return Exame
        .aggregate(agg)
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.listFull = () => {

    return Exame
        .find()
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.getExam = id => {

    return Exame
        .findOne({_id: id})
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.getExamsByModality = mod => {

    return Exame
        .find({modalidade: mod})
        .then(data => {return data})
        .catch(error => {return error});

}


module.exports.getExamsByGender = gender => {

    return Exame
        .find({género: gender})
        .sort({ "nome.primeiro": 1, "nome.último": 1 })
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.getExamsByClub = club => {

    return Exame
        .find({clube: club})
        .sort({ "nome.primeiro": 1, "nome.último": 1 })
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.listModalities = () => {

    return Exame
        .distinct("modalidade")
        .then(data => {return data})
        .catch(error => {return error});

}

module.exports.listResultTrue = () => {

    return Exame
        .find({resultado: true})
        .then(data => {return data})
        .catch(error => {return error});

}