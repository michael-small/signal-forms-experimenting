import { required, SchemaPathTree } from '@angular/forms/signals';

export interface Account {
  firstName: string;
  lastName: string;
}

export function createAccountModel(): Account {
  return {
    firstName: '',
    lastName: '',
  };
}

export function accountSchema(a: SchemaPathTree<Account>) {
  required(a.firstName, { message: 'First name is required' });
  required(a.lastName, { message: 'Last name is required' });
}
