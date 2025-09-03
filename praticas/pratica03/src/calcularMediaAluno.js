const calcularMediaAluno = (a1, a2, a3) => {
  if (typeof a1 === 'undefined' || typeof a2 === 'undefined') {
    throw new Error('Notas a1 ou a2 não informadas');
  }

  if (a1 < 0 || a2 < 0) {
    throw new Error('Notas a1 ou a2 não podem ser negativas');
  }

  if (typeof a3 !== 'undefined' && a3 < 0) {
    throw new Error('Nota a3 não pode ser negativa');
  }
  if (typeof a3 === 'undefined') {
    return a1 * 0.4 + a2 * 0.6;
  }

  const media1 = a1 * 0.4 + a2 * 0.6;
  const media2 = a1 * 0.4 + a3 * 0.6;
  const media3 = a3 * 0.4 + a2 * 0.6;

  return Math.max(media1, media2, media3);
};

module.exports = { calcularMediaAluno };