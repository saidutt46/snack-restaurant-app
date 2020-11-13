using System;
namespace Snack.Dto.DtoModels
{
    public class CompanyRoleDto
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }
        public decimal Salary { get; set; }
    }
}
