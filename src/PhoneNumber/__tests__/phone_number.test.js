import PhoneNumber from 'src/PhoneNumber/entity/PhoneNumber';

describe('Phone Number', () => {
  it('Should create a default UK phone', () => {
    expect(PhoneNumber.createUKPhone().prefix).toBe('44');
    expect(PhoneNumber.createUKPhone().country_code).toBe('gb');
    expect(PhoneNumber.createUKPhone().number).toBe('');
  });

  it('Should create a default ZA phone', () => {
    expect(PhoneNumber.createZAPhone().prefix).toBe('27');
    expect(PhoneNumber.createZAPhone().country_code).toBe('za');
    expect(PhoneNumber.createZAPhone().number).toBe('');
  });

  it('Should create a default US phone', () => {
    expect(PhoneNumber.createUSPhone().prefix).toBe('1');
    expect(PhoneNumber.createUSPhone().country_code).toBe('us');
    expect(PhoneNumber.createUSPhone().number).toBe('');
  });

  it('Should create a default IE phone', () => {
    expect(PhoneNumber.createIEPhone().prefix).toBe('353');
    expect(PhoneNumber.createIEPhone().country_code).toBe('ie');
    expect(PhoneNumber.createIEPhone().number).toBe('');
  });

  it('Should detect valid phone due to having all fields', () => {
    expect(PhoneNumber.createUKPhone('123').isValid()).toBeTruthy();
    expect(PhoneNumber.createZAPhone('123').isValid()).toBeTruthy();
    expect(PhoneNumber.createUSPhone('123').isValid()).toBeTruthy();
    expect(PhoneNumber.createIEPhone('123').isValid()).toBeTruthy();
  });

  it('Should detect invalid phone due to empty fields', () => {
    expect(PhoneNumber.createUKPhone().isValid()).toBeFalsy();
    expect(PhoneNumber.createZAPhone().isValid()).toBeFalsy();
    expect(PhoneNumber.createUSPhone().isValid()).toBeFalsy();
    expect(PhoneNumber.createIEPhone().isValid()).toBeFalsy();
  });
});
