export const checkValidity = (inputValue, rules) => {
  let isValid = true;

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
