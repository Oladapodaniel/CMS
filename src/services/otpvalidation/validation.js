/**
 * Validates that the input is a number when not using input type="number"
 * Usage: @keypress="validateNumberInput"
 * @param {Event} event
 */
 const validateNumberInput = (event) => !/\d/.test(event.key) && event.preventDefault()

 export { validateNumberInput }
 