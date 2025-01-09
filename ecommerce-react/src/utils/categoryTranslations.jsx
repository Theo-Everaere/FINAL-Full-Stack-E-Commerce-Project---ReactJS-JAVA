export const categoryTranslations = {
  "musical-instruments": "Instruments de musique",
  food: "Nourriture",
  "mobile-phone": "Téléphone mobile",
};

export const getCategoryKeyFromTranslation = (translation) => {
  const entry = Object.entries(categoryTranslations).find(
    ([, value]) => value === translation
  );
  return entry ? entry[0] : null;
};
