

export class UserIdentification {
  //RPH - The 3 types of login "page types"
  /*Types overall: unknown user, logged in, not logged in
  */
  static Unknown = new UserIdentification('unknown');
  static Unverified = new UserIdentification('unverified');
  static Verified = new UserIdentification('verified');

  //Username
  constructor(name) {
    this.name = name;
  }
}