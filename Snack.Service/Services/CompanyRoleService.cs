using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Snack.Data.DataModels;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Shared;
using Snack.Repository.Interfaces;
using Snack.Service.Interfaces;

namespace Snack.Service.Services
{
    public class CompanyRoleService : ICompanyRoleService
    {
        private readonly ICompanyRoleRepository _companyRoleRepository;
        private readonly IMapper _mapper;

        public CompanyRoleService(ICompanyRoleRepository companyRoleRepository, IMapper mapper)
        {
            _companyRoleRepository = companyRoleRepository;
            _mapper = mapper;
        }

        public async Task<BaseDtoListResponse<CompanyRoleDto>> ListAsync()
        {
            try
            {
                IList<CompanyRole> roles = await _companyRoleRepository.ListAll();
                if (roles != null)
                {
                    IList<CompanyRoleDto> result = _mapper.Map<IList<CompanyRole>, IList<CompanyRoleDto>>(roles);
                    BaseDtoListResponse<CompanyRoleDto> response = new BaseDtoListResponse<CompanyRoleDto>(result);
                    return response;
                }
                else
                {
                    return new BaseDtoListResponse<CompanyRoleDto>("No Roles found, please try after adding new role(s)");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<CompanyRoleDto>(ex.Message);
            }
        }

        public async Task<BaseDtoResponse<CompanyRoleDto>> GetById(Guid id)
        {
            CompanyRole role = await _companyRoleRepository.GetById(id);

            if (role == null)
                return new BaseDtoResponse<CompanyRoleDto>("Role Not Found");
            CompanyRoleDto result = _mapper.Map<CompanyRole, CompanyRoleDto>(role);
            return new BaseDtoResponse<CompanyRoleDto>(result);
        }

        public async Task<BaseDtoResponse<CompanyRoleDto>> Add(CreateCompanyRoleRequest request)
        {
            try
            {
                CompanyRole model = _mapper.Map<CreateCompanyRoleRequest, CompanyRole>(request);
                CompanyRole role = await _companyRoleRepository.Add(model);
                if (role != null)
                {
                    CompanyRoleDto result = _mapper.Map<CompanyRole, CompanyRoleDto>(role);
                    return new BaseDtoResponse<CompanyRoleDto>(result);
                }
                else
                {
                    return new BaseDtoResponse<CompanyRoleDto>("Unable to create a new role, try again");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<CompanyRoleDto>($"An error occurred when saving the role: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<CompanyRoleDto>> Update(Guid id, CreateCompanyRoleRequest request)
        {
            try
            {
                CompanyRole role = await _companyRoleRepository.GetById(id);
                if (role != null)
                {
                    role.RoleName = request.RoleName;
                    role.Description = request.Description;
                    role.Salary = request.Salary;
                    await _companyRoleRepository.Update(role);
                    CompanyRole updatedResult = await _companyRoleRepository.GetById(id);
                    CompanyRoleDto result = _mapper.Map<CompanyRole, CompanyRoleDto>(updatedResult);
                    return new BaseDtoResponse<CompanyRoleDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<CompanyRoleDto>("Role Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<CompanyRoleDto>($"An error occurred when updating the Role: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<CompanyRoleDto>> Delete(Guid id)
        {
            try
            {
                CompanyRole role = await _companyRoleRepository.GetById(id);
                if (role != null)
                {
                    await _companyRoleRepository.Delete(role);
                    CompanyRoleDto result = _mapper.Map<CompanyRole, CompanyRoleDto>(role);
                    return new BaseDtoResponse<CompanyRoleDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<CompanyRoleDto>("Unable to delete: Role Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<CompanyRoleDto>($"An error occurred when deleting the role: {ex.Message}");
            }
        }
    }
}
