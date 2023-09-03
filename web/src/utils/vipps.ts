export const getVippsLink = (total?: number) => {
  const amountPart = total && total > 0 ? `&a=${total * 100}` : "";

  const vippsHref = `https://qr.vipps.no/28/2/01/031/4747304656?v=1&m=Snack${amountPart}`;

  return vippsHref;
};
