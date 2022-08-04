import { registerDecorator, ValidationOptions } from 'class-validator';

import { isISO4217String } from '@common/utils';

export function IsISO4217String(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isISO4217String',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isISO4217String(value);
        },
      },
    });
  };
}
