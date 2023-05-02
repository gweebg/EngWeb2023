const express = require('express');
const router = express.Router();

const Exames = require('../controllers/exames')


/* GET /api/emd - Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado"; */
/* GET /api/emd?res=OK - Devolve a lista de EMD com resultado "true"; */
/* GET /api/emd?modalidade=X - Devolve a lista de EMD referentes à modalidade passada como parâmetro, X; */
router.get('/emd', function(req, res, next) {

  if (Object.keys(req.query).length === 0) {

    Exames
        .listAll()
        .then(data => res.json(data))
        .catch(data => res.json(data));

  } else if (req.query.res === 'OK') {

    Exames
        .listResultTrue()
        .then(data => res.json(data))
        .catch(data => res.json(data));

  } else if (req.query.modalidade) {

    Exames
        .getExamsByModality(req.query.modalidade)
        .then(data => res.json(data))
        .catch(data => res.json(data));

  }
});

router.get('/emd/full', function(req, res, next) {

  Exames
      .listFull()
      .then(data => res.json(data))
      .catch(data => res.json(data));

});

/* GET /api/modalidades - Devolve a lista de modalidades, sem repetições; */
router.get('/modalidades', function(req, res, next) {

  Exames
      .listModalities()
      .then(data => res.json(data))
      .catch(data => res.json(data));

});

/* GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos atletas de género feminino; */
/* GET /api/atletas?clube=X - Devolve uma lista ordenada alfabeticamente com os nomes dos atletas do clube X. */
router.get('/atletas', function(req, res, next) {

  if (req.query.gen) {

    Exames
        .getExamsByGender(req.query.gen)
        .then(data => res.json(data))
        .catch(data => res.json(data));

  } else if (req.query.clube) {

    Exames
        .getExamsByClub(req.query.clube)
        .then(data => res.json(data))
        .catch(data => res.json(data));
  }
});

/* GET /api/emd/:id - Devolve a informação completa de um EMD; */
router.get('/emd/:id', function(req, res, next) {

  Exames
      .getExam(req.body.id)
      .then(data => res.json(data))
      .catch(data => res.json(data));

});

module.exports = router;
