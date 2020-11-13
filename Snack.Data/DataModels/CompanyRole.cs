using System;
using System.Collections.Generic;
using Snack.Data.Shared;

namespace Snack.Data.DataModels
{
    public class CompanyRole : BaseEntity
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        public decimal Salary { get; set; }

        public virtual ICollection<ApplicationUser> Users { get; set; }
    }
}
