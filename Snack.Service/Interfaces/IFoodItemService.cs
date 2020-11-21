using System;
using System.Threading.Tasks;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Shared;

namespace Snack.Service.Interfaces
{
    public interface IFoodItemService
    {
        Task<BaseDtoListResponse<FoodItemDto>> ListAsync();
        Task<BaseDtoResponse<FoodItemDto>> GetById(Guid id);
        Task<BaseDtoResponse<FoodItemDto>> Add(FoodItemCreateRequest request);
        Task<BaseDtoResponse<FoodItemDto>> Update(Guid id, FoodItemCreateRequest request);
        Task<BaseDtoResponse<FoodItemDto>> Delete(Guid id);
    }
}
