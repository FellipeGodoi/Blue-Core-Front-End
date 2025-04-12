export const toMoneyFormat = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL', // ou outra moeda, como 'USD'
    }).format(value);
};