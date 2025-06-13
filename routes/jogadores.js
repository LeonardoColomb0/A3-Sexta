const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');

router.get('/', jogadoresController.getAllJogadores);
router.get('/:id', jogadoresController.getJogadorById);
router.post('/', jogadoresController.createJogador);
router.put('/:id', jogadoresController.updateJogador);
router.delete('/:id', jogadoresController.deleteJogador);

module.exports = router;
