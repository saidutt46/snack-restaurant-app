import { CompanyCustomRoleModel } from 'src/app/models/company-role.model';

export class CompanyRoleStateModel {
  roles: CompanyCustomRoleModel[];
  pageLoading: boolean;
  formLoading: boolean;
  selectedRole: CompanyCustomRoleModel;
}
