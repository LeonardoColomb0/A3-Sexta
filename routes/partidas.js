const express = require('express');
const router = express.Router();
const partidasController = require('../controllers/partidasController');

router.get('/', partidasController.getAllPartidas);
router.get('/:id', partidasController.getPartidaById);
router.post('/', partidasController.createPartida);
router.put('/:id', partidasController.updatePartida);
router.delete('/:id', partidasController.deletePartida);

module.exports = router;
