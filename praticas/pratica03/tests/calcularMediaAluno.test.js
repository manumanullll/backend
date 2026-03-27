const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('calcularMediaAluno', () => {

    test('deve ser uma função definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar um erro se a1 ou a2 forem indefinidas', () => {
    expect(() => calcularMediaAluno(undefined, 8, 9)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(8, undefined, 9)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar um erro se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-1, 8, 9)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(8, -1, 9)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve lançar um erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(8, 9, -1)).toThrow('Nota a3 não pode ser negativa');
  });

  test('deve calcular a média base se a3 não for informada', () => {
    const media = calcularMediaAluno(7, 8);
    expect(media).toBeCloseTo(7.6);
  });

  test('deve usar a melhor combinação quando a3 é informada (a1 e a3)', () => {
    const media = calcularMediaAluno(9, 7, 8);
    expect(media).toBeCloseTo(8.4);
  });

  test('deve usar a melhor combinação quando a3 é informada (a2 e a3)', () => {
    const media = calcularMediaAluno(6, 9, 8);
    expect(media).toBeCloseTo(8.6);
  });

});