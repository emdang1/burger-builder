export const checkValidity = (inputValue, rules) => {
  let isValid = true;

  // if there's required prop defined for this input
  // set isValid to true - if trimmed inputValue is not equal to an empty string
  // && true value trick = every check needs to pass or "isValid" will be false from the first problem
  if (rules.required) {
    isValid = inputValue.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = inputValue.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = inputValue.length <= rules.maxLength && isValid;
  }

  return isValid;
};
