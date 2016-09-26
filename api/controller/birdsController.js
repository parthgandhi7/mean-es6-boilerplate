/* globals exp */
"use strict"
const router = exp.Router();
const Birds = exp.models.Birds;

const logger = require('../../config/logger.js');

router.post('/', (req, res) => {
  let birdsObj = req.body;
  Birds.create(birdsObj, (err, bird) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(bird);
    }
  });
});

router.get('/', (req, res) => {
  Birds.find().exec((err, birds) => {
    if (err) {
      logger.error('Some error occured: ', err);
      res.status(500).send(err);
    } else {
      logger.info('All Birds retreived %s', birds);
      res.status(200).send(birds);
    }
  });
});

router.get('/:birdid', (req, res) => {

  Birds.findOne({
    _id: req.params.birdid
  }, (err, birds) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(birds);
    }
  });
});

router.post('/:birdid', (req, res) => {
  let birdsObj = req.body;

  Birds.findOneAndUpdate({
    _id: req.params.birdid
  }, {
    $set: birdsObj
  }, {
    new: true
  }, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(doc);
    }

  });
});

module.exports = router;
