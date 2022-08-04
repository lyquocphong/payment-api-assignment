import { isISO4217 } from 'validator';

export function isISO4217String(value: string): boolean {
  return isISO4217(value);
}
