interface Props {
  currency: number;
}

export const Currency = ({ currency }: Props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(currency);
};
