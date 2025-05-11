export namespace UserModel {
  export interface ToCreate {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }
}