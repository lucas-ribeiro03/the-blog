import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate);
  const formattedDate = format(date, "dd/MM/yyyy 'às' HH'h'mm", {
    locale: ptBR,
  });

  return formattedDate;
};

export const dateDistanceToNow = (rawDate: string) => {
  const date = new Date(rawDate);
  const dateDistance = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });

  return dateDistance;
};
