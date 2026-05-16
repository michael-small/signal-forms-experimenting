import { required, SchemaPathTree } from '@angular/forms/signals';

export interface Profile {
  account: Account;
}

export interface Account {
  firstName: string;
}

export function createAccountModel(): Account {
  return {
    firstName: '',
  };
}

export function accountSchema(a: SchemaPathTree<Account>) {
  required(a.firstName, { message: 'First name is required' });
}
