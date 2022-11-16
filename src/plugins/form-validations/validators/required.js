export default function required({ field, value }) {
  const isValid = !!value

  return {
    isValid,
    errorMsg: `The ${field} is required`,
  }
}
