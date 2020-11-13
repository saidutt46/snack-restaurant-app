using System;
using AutoMapper;
using Snack.Data.DataModels;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;

namespace Snack.Dto.Shared
{
    public class DataProfile : Profile
    {
        public DataProfile()
        {
            CreateMap<ApplicationUser, UserProfileDto>().ForMember(p => p.Designation,
                opt => opt.MapFrom(src => src.ComapnyRoleId));
            CreateMap<CompanyRole, CompanyRoleDto>();
            CreateMap<CreateCompanyRoleRequest, CompanyRole>();
            CreateMap<FoodCategory, FoodCategoryDto>();
            CreateMap<FoodCategoryCreateRequest, FoodCategory>();
            CreateMap<FoodItem, FoodItemDto>();
            CreateMap<FoodItemCreateRequest, FoodItem>();
        }
    }
}
