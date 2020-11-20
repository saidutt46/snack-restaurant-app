import { CompanyRoleStateModel } from './company-roles.model';
import { CompanyRoleState } from './company-roles.state';
import { Selector } from '@ngxs/store';

export class CompanyRoleStateSelector {

  @Selector([CompanyRoleState])
  static getAllRoles(state: CompanyRoleStateModel) {
    return state.roles;
  }

  @Selector([CompanyRoleState])
  static getCurrentSelection(state: CompanyRoleStateModel) {
    return state.selectedRole;
  }
}
