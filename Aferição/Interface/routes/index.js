var express = require('express');
const {get} = require("axios");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  get('http://localhost:3001/api/emd/full')
      .then(response => {
        console.log(response)
        return res.render('index', { examsList: response.data })
      })
      .catch(error => {
        return error
      })

});


router.get('/:id', function(req, res, next) {

  get(`http://localhost:3001/api/emd/${req.body.id}`)
      .then(response => {
        return res.render('athlete', { athlete: response.data })
      })
      .catch(error => {
        return error
      })

});

module.exports = router;
