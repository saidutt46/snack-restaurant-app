import { TestBed } from '@angular/core/testing';

import { CompanyRoleService } from './company-role.service';

describe('CompanyRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyRoleService = TestBed.get(CompanyRoleService);
    expect(service).toBeTruthy();
  });
});
