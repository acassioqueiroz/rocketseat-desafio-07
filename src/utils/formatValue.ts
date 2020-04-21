const formatValue = (value: number | string): string | null => {
  const valueNumber =
    typeof value === 'number' ? value : Number.parseFloat(value);
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueNumber);
};

export default formatValue;
