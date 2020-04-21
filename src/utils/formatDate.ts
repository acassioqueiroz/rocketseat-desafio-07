const formatDate = (date: Date): any => {
  if (date) return Intl.DateTimeFormat('pt-BR', {}).format(new Date(date));
  return date;
};

export default formatDate;
