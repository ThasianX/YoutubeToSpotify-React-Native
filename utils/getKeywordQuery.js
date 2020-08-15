export const getKeywordQuery = (keywords) => {
  return keywords
    .map((wordCategory) => {
      return wordCategory
        .filter((keyword) => keyword.isSelected)
        .map((keyword) => keyword.word)
        .join(" ");
    })
    .join(" ")
    .trim();
};
