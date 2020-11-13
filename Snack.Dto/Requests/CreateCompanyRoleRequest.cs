using System;
using System.ComponentModel.DataAnnotations;

namespace Snack.Dto.Requests
{
    public class CreateCompanyRoleRequest
    {
        [Required(ErrorMessage = "Role Name required")]
        public string RoleName { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Salary field required")]
        public decimal Salary { get; set; }
    }
}
