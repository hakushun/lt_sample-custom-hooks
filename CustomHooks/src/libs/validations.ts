export const isRequired = (value: string): null | 'Required' => (value?.trim() ? null : 'Required');

// eslint-disable-next-line no-useless-escape
const mailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const isEmail = (value: string): null | 'is not Email' =>
  value.match(mailRegexp) ? null : 'is not Email';

export const minValue = (min: number) => (value: string): null | string =>
  value?.trim().length >= min ? null : `Should be greater than ${min}`;

export const composeValidators = (...validators: any[]) => (value: string): null | string =>
  validators.reduce((error, validator) => error || validator(value), null);
