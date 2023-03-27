const express = require('express');
const People = require('../controllers/people')

const router = express.Router();

router.get('/', function(req, res) {
  
  People.listAll()
        .then(data => res.json(data))
        .catch(data => res.json(data));

});

router.get('/:id', function (req, res) {

  People.getPerson(req.params.id)
        .then(data => res.json(data))
        .catch(data => res.json(data));

});

router.post("/", function (req, res) {

  People.addPerson(req.body)
        .then(data => res.json(data))
        .catch(data => res.json(data));

});

router.put("/:id", function (req, res) {

  People.updatePerson(req.body)
        .then(data => res.json(data))
        .catch(data => res.json(data));

});

module.exports = router;