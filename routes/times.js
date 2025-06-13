const express = require('express');
const router = express.Router();
const timesController = require('../controllers/timesController');

router.get('/', timesController.getAllTimes);
router.get('/:id', timesController.getTimeById);
router.post('/', timesController.createTime);
router.put('/:id', timesController.updateTime);
router.delete('/:id', timesController.deleteTime);

module.exports = router;
