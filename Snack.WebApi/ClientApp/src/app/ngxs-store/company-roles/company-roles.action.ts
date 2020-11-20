export namespace CompanyRolesActions {
  export class ListAllCompanyRoles {
    static readonly type = '[ROLE] GET ALL';
  }

  export class GetRoleById {
    static readonly type = '[ROLE] GET BY ID';
  }

  export class CreateCompanyRole {
    static readonly type = '[ROLE] CREATE';
  }

  export class UpdateCompanyRole {
    static readonly type = '[ROLE] UPDATE';
  }

  export class DeleteCompanyRole {
    static readonly type = '[ROLE] DELETE';
  }
}
