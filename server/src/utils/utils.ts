import { v4, validate } from 'uuid';

export function generateUuid(): string {
  return v4();
}

export function validateUuid(value, error: string) {
  if (typeof value != 'string' || !validate(value)) {
    throw new Error(error + ': ' + value);
  }
}