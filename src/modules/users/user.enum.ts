export enum GetUsersOrderByEnum {
  name = 'name',
  email = 'email',
  country = 'country',
  dateOfBirth = 'dateOfBirth',
  createdAt = 'createdAt',
}

export enum PatchUserByIdAction {
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
}