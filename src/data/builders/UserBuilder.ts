export interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}

export class UserBuilder {
  private user: Partial<UserData> = {};

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): UserBuilder {
    this.user.lastName = lastName;
    return this;
  }

  withAddress(address: string): UserBuilder {
    this.user.address = address;
    return this;
  }

  withCity(city: string): UserBuilder {
    this.user.city = city;
    return this;
  }

  withState(state: string): UserBuilder {
    this.user.state = state;
    return this;
  }

  withZipCode(zipCode: string): UserBuilder {
    this.user.zipCode = zipCode;
    return this;
  }

  withPhone(phone: string): UserBuilder {
    this.user.phone = phone;
    return this;
  }

  withSSN(ssn: string): UserBuilder {
    this.user.ssn = ssn;
    return this;
  }

  withUsername(username: string): UserBuilder {
    this.user.username = username;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  build(): UserData {
    if (!this.user.firstName || !this.user.lastName || !this.user.address || !this.user.city || !this.user.state || !this.user.zipCode || !this.user.phone || !this.user.ssn || !this.user.username || !this.user.password) {
      throw new Error('UserBuilder requires all user data fields');
    }
    return this.user as UserData;
  }
}
