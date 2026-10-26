import { required, SchemaPathTree } from '@angular/forms/signals';

export type Profile = {
  account: Account;
}

export type Account = {
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
