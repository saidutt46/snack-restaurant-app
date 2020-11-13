using System;
using System.Threading.Tasks;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Shared;
using Snack.Service.Shared;

namespace Snack.Service.Interfaces
{
    public interface ICompanyRoleService
    {
        Task<BaseDtoListResponse<CompanyRoleDto>> ListAsync();
        Task<BaseDtoResponse<CompanyRoleDto>> GetById(Guid id);
        Task<BaseDtoResponse<CompanyRoleDto>> Add(CreateCompanyRoleRequest request);
        Task<BaseDtoResponse<CompanyRoleDto>> Update(Guid id, CreateCompanyRoleRequest request);
        Task<BaseDtoResponse<CompanyRoleDto>> Delete(Guid id);
    }
}
