const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('Função calcularMediaAluno', () => {
    test('deve estar definida', () => {
      expect(calcularMediaAluno).toBeDefined();
    });
  });

  const calcularMediaAluno = require('./calcularMediaAluno');

describe('Função calcularMediaAluno', () => {
  test('deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar erro quando a1 for undefined', () => {
    expect(() => calcularMediaAluno(undefined, 8, 9)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar erro quando a2 for undefined', () => {
    expect(() => calcularMediaAluno(7, undefined, 9)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar erro quando a1 e a2 forem undefined', () => {
    expect(() => calcularMediaAluno(undefined, undefined, 9)).toThrow('Notas a1 ou a2 não informadas');
  });
});

test('deve lançar erro quando a1 for negativa', () => {
    expect(() => calcularMediaAluno(-1, 8, 9)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });
  
  test('deve lançar erro quando a2 for negativa', () => {
    expect(() => calcularMediaAluno(7, -5, 9)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });
  
  test('deve lançar erro quando a1 e a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-2, -3, 9)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve calcular média corretamente quando a3 não é informada', () => {
    expect(calcularMediaAluno(7, 8)).toBeCloseTo(7.6); 
  });
  
  test('deve calcular média corretamente quando a3 é undefined', () => {
    expect(calcularMediaAluno(6, 9, undefined)).toBeCloseTo(7.8);
  });

  test('deve lançar erro quando a3 for negativa', () => {
    expect(() => calcularMediaAluno(7, 8, -5)).toThrow('Nota a3 não pode ser negativa');
  });

  test('deve usar a melhor combinação: a1 com a3 (a1 < a2)', () => {
    expect(calcularMediaAluno(6, 9, 8)).toBeCloseTo(8.6);
  });
  
  test('deve usar a melhor combinação: a1 com a3 (a1 > a2)', () => {
    expect(calcularMediaAluno(9, 6, 8)).toBeCloseTo(8.4);
  });

  test('deve usar a melhor combinação: a3 com a2 (a3 > a1)', () => {
    expect(calcularMediaAluno(7, 8, 9)).toBeCloseTo(8.4);
  });