import mockData from "./mockData";

const mockExpense = [
  {
    id: 0,
    value: '26',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: 'Vinte e seis doláres',
    exchangeRates: {...mockData}
  },
  {
    id: 1,
    value: '4',
    currency: 'EUR',
    method: 'Cartão de Crédito',
    tag: 'Saúde',
    description: 'Quatro euros',
    exchangeRates: {...mockData}
  },
];

export default mockExpense;
