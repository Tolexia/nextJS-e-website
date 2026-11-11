export const seller = {
  name: "",
  legalForm: "",
  address: "",
  siret: "",
  vatNumber: "",
  email: "",
  phone: "",
  publicationDirector: "",
  host: "Vercel Inc.",
};

export function sellerIsComplete() {
  return Boolean(seller.name && seller.address && seller.siret && seller.email);
}

export function sellerField(value) {
  return value || "À compléter avant mise en ligne";
}
