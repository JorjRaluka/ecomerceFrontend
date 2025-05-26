import { Customer } from './customer';

describe('Customer', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Customer()).toBeTruthy();
  });
});
