export class RandomDataGenerator {
  static getEmail(prefix = 'user'): string {
    const timestamp = Date.now();
    return `${prefix}.${timestamp}@example.com`;
  }

  static getAlphaNumeric(length = 12): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  static getNumeric(length = 6): string {
    const chars = '0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  static getPhoneNumber(): string {
    return `+1${this.getNumeric(10)}`;
  }
}
