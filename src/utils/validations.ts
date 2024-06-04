export const isString = (string: string) => {
  return typeof string === "string";
};

export const isNumber = (number: number) => {
  return typeof number === "number";
};

export const isGreater255Length = (string: string) => {
  return string.length > 255;
};
