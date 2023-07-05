import { expect, it, describe } from 'vitest';
import proxyData from '../src/proxyData';

describe('proxyData', () => {
  it('should create a proxy for an object that intercepts property access and mutation', () => {
    const testObject = {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      hobbies: ['reading', 'swimming', 'hiking'],
    };
    const proxy = proxyData(testObject);
    expect(proxy.name).toBe('John');
    expect(proxy.age).toBe(30);
    expect(proxy.address.street).toBe('123 Main St');
    expect(proxy.address.city).toBe('Anytown');
    expect(proxy.address.state).toBe('CA');
    expect(proxy.address.zip).toBe('12345');
    expect(proxy.hobbies[0]).toBe('reading');
    expect(proxy.hobbies[1]).toBe('swimming');
    expect(proxy.hobbies[2]).toBe('hiking');
    proxy.name = 'Jane';
    expect(proxy.name).toBe('Jane');
    proxy.age = 40;
    expect(proxy.age).toBe(40);
    proxy.address.street = '456 Second St';
    expect(proxy.address.street).toBe('456 Second St');
    proxy.address.city = 'Newtown';
    expect(proxy.address.city).toBe('Newtown');
    proxy.address.state = 'NY';
    expect(proxy.address.state).toBe('NY');
    proxy.address.zip = '67890';
    expect(proxy.address.zip).toBe('67890');
    proxy.hobbies.push('writing');
    expect(proxy.hobbies[3]).toBe('writing');
  });
});
