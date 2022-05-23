const parseOrDefault: parseOrDefaultType = (value, defaultValue, type) => {
  return parser[type](value, defaultValue);
};

enum valueType {
  INTEGER = "integer",
  FLOAT = "float",
}

const parser = {
  [valueType.INTEGER]: (value: string, defaultValue: number) => {
    const parsedValue = parseInt(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  },
  [valueType.FLOAT]: (value: string, defaultValue: number) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  },
};

type parseOrDefaultType =
  | ((value: string, defaultValue: number, type: valueType.INTEGER) => number)
  | ((value: string, defaultValue: number, type: valueType.INTEGER) => number);

export default parseOrDefault;
export { valueType };
