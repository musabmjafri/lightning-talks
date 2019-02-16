interface ValidationMessage {
  type: string;
  message: string;
}

export function requiredField(fieldName: string): ValidationMessage {
  return {
    type: 'required',
    message: `${fieldName} is required`,
  };
}

export function minLengthField(fieldName: string, minLength: number): ValidationMessage {
  return {
    type: 'minlength',
    message: `${fieldName} must be at least ${minLength} characters long`,
  };
}

export function maxLengthField(fieldName: string, maxLength: number): ValidationMessage {
  return {
    type: 'maxlength',
    message: `${fieldName} cannot be at more than ${maxLength} characters long`,
  };
}

export function patternField(fieldName: string, message: string): ValidationMessage {
  return {
    type: 'pattern',
    message: `${fieldName} must contain ${message}`,
  };
}
