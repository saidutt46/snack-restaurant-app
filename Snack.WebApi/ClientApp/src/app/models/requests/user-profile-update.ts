export class UserProfileUpdateRequestModel {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: number;
  designation: string;
  phoneNumber: string;
  addRoles: string[];
  removeRoles: string[];
}
