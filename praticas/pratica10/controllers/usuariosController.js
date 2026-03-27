const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const usuariosModel = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    if (!req.body.email || !req.body.senha) {
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }

    const senhaCifrada = cifrarSenha(req.body.senha);
    const novoUsuario = await usuariosModel.create({
      email: req.body.email,
      senha: senhaCifrada
    });
    
    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(422).json({ msg: "Email já cadastrado" });
    }
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}

async function entrar(req, res) {
  try {
    if (!req.body.usuario || !req.body.senha) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const usuarioEncontrado = await usuariosModel.findOne({ 
      email: req.body.usuario 
    });

    if (usuarioEncontrado && compararSenha(req.body.senha, usuarioEncontrado.senha)) {
      const token = gerarToken({ email: req.body.usuario });
      return res.status(200).json({ token });
    }
    
    return res.status(401).json({ msg: "Credenciais inválidas" });
  } catch (error) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }
}

async function renovar(req, res) {
  try {
    const token = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ msg: "Erro ao renovar token" });
  }
}

async function remover(req, res) {
  try {
    if (!req.body.usuario) {
      return res.status(400).json({ msg: "Usuário é obrigatório" });
    }

    const resultado = await usuariosModel.findOneAndDelete({ email: req.body.usuario });
    
    if (!resultado) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ msg: "Erro ao remover usuário" });
  }
}

module.exports = { 
  criar, 
  entrar, 
  renovar, 
  remover 
};