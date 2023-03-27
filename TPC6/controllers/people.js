const Person = require('../models/person');

module.exports.listAll = () => {

    return Person
           .find()
           .sort({_id: 'asc'})
           .then(data => {return data})
           .catch(error => {return error});

};

module.exports.getPerson = id => {

    return Person.findOne({_id: id})
           .then(data => {return data})
           .catch(error => {return error});

};

module.exports.addPerson = p => {
    
    return Person.create(p)
           .then(data => {return data})
           .catch(error => {return error});

};

module.exports.updatePerson = p => {
    
    return Person.updateOne({_id: p._id}, p)
                 .then(data => {return data})
                 .catch(error => {return error});

};

module.exports.deletePerson = id => {
    return Person.deleteOne({_id: id});
};


