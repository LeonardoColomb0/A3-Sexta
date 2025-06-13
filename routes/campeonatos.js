const express = require('express');
const router = express.Router();
const campeonatosController = require('../controllers/campeonatosController');

router.get('/', campeonatosController.getAllCampeonatos);
router.get('/:id', campeonatosController.getCampeonatoById);
router.post('/', campeonatosController.createCampeonato);
router.put('/:id', campeonatosController.updateCampeonato);
router.delete('/:id', campeonatosController.deleteCampeonato);

module.exports = router;
