using System;
using Snack.Data.DataModels;
using Snack.Repository.DatabaseContext;
using Snack.Repository.Interfaces;
using Snack.Repository.Shared;

namespace Snack.Repository.Repositories
{
    public class CompanyRoleRepository : EfRepository<CompanyRole>, ICompanyRoleRepository
    {
        public CompanyRoleRepository(SnackContext options) : base(options)
        {
        }
    }
}
