export const formatarData = (data: any) => {
  const dataObj = new Date(data);
  const dia = dataObj.getUTCDate().toString().padStart(2, '0'); // Obtém o dia em UTC
  const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0'); // Obtém o mês em UTC
  const ano = dataObj.getUTCFullYear(); // Obtém o ano em UTC
  return `${dia}/${mes}/${ano}`;
};
