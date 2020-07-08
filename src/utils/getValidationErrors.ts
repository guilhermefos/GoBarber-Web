import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}

export default function getValidationError(err: ValidationError): Errors {
  const validationErrors: Erros = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
