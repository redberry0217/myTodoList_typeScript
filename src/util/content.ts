export const omitText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 5) + "...";
  } else {
    return text;
  }
};
