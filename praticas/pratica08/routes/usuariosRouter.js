const express = require('express');
const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /usuarios/login
router.post('/login', (req, res) => {
  try {
    const { usuario } = req.body;
    const token = gerarToken({ email: usuario });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// POST /usuarios/renovar
router.post('/renovar', verificarToken, (req, res) => {
  try {
    const token = gerarToken({ email: req.usuario.email });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

module.exports = router;