using System;
using System.Threading.Tasks;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Shared;

namespace Snack.Service.Interfaces
{
    public interface IFoodCategoryService
    {
        Task<BaseDtoListResponse<FoodCategoryDto>> ListAsync();
        Task<BaseDtoResponse<FoodCategoryDto>> GetById(Guid id);
        Task<BaseDtoResponse<FoodCategoryDto>> Add(FoodCategoryCreateRequest request);
        Task<BaseDtoResponse<FoodCategoryDto>> Update(Guid id, FoodCategoryCreateRequest request);
        Task<BaseDtoResponse<FoodCategoryDto>> Delete(Guid id);
        Task<BaseDtoListResponse<FoodItemDto>> GetItemsByCategory(Guid CategoryId);
    }
}
