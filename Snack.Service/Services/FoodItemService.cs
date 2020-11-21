using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Snack.Data.DataModels;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Shared;
using Snack.Repository.ApplicationSpecifications;
using Snack.Repository.Interfaces;
using Snack.Service.Interfaces;

namespace Snack.Service.Services
{
    public class FoodItemService : IFoodItemService
    {
        private readonly IFoodItemRepository _foodItemRepository;
        private readonly IFoodCategoryRepository _foodCategoryRepository;

        private readonly IMapper _mapper;

        public FoodItemService(IFoodItemRepository foodItemRepository, IFoodCategoryRepository foodCategoryRepository,
            IMapper mapper)
        {
            _foodItemRepository = foodItemRepository;
            _foodCategoryRepository = foodCategoryRepository;
            _mapper = mapper;
        }

        public async Task<BaseDtoListResponse<FoodItemDto>> ListAsync()
        {
            try
            {
                IList<FoodItem> items = await _foodItemRepository.ListAll();
                if (items != null)
                {
                    IList<FoodItemDto> result = _mapper.Map<IList<FoodItem>, IList<FoodItemDto>>(items);
                    BaseDtoListResponse<FoodItemDto> response = new BaseDtoListResponse<FoodItemDto>(result);
                    return response;
                }
                else
                {
                    return new BaseDtoListResponse<FoodItemDto>("No Items found, please try after adding new food item(s)");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<FoodItemDto>(ex.Message);
            }
        }

        public async Task<BaseDtoResponse<FoodItemDto>> GetById(Guid id)
        {
            FoodItem item = await _foodItemRepository.GetById(id);

            if (item == null)
                return new BaseDtoResponse<FoodItemDto>("Food item Not Found");
            FoodItemDto result = _mapper.Map<FoodItem, FoodItemDto>(item);
            return new BaseDtoResponse<FoodItemDto>(result);
        }

        public async Task<BaseDtoResponse<FoodItemDto>> Add(FoodItemCreateRequest request)
        {
            try
            {
                FoodItem model = _mapper.Map<FoodItemCreateRequest, FoodItem>(request);
                FoodItem item = await _foodItemRepository.Add(model);
                if (item != null)
                {
                    FoodItemDto result = _mapper.Map<FoodItem, FoodItemDto>(item);
                    return new BaseDtoResponse<FoodItemDto>(result);
                }
                else
                {
                    return new BaseDtoResponse<FoodItemDto>("Unable to create a new food item, try again");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodItemDto>($"An error occurred when saving the food item: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<FoodItemDto>> Update(Guid id, FoodItemCreateRequest request)
        {
            try
            {
                FoodItem item = await _foodItemRepository.GetById(id);
                if (item != null)
                {
                    item.Description = request.Description;
                    item.Name = request.Name;
                    item.Availability = request.Availability;
                    item.Calories = request.Calories;
                    item.FoodCategoryId = request.FoodCategoryId;
                    item.UnitPrice = request.UnitPrice;
                    await _foodItemRepository.Update(item);
                    FoodItem updatedResult = await _foodItemRepository.GetById(id);
                    FoodItemDto result = _mapper.Map<FoodItem, FoodItemDto>(updatedResult);
                    return new BaseDtoResponse<FoodItemDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<FoodItemDto>("Food Item Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodItemDto>($"An error occurred when updating the food item: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<FoodItemDto>> Delete(Guid id)
        {
            try
            {
                FoodItem item = await _foodItemRepository.GetById(id);
                if (item != null)
                {
                    await _foodItemRepository.Delete(item);
                    FoodItemDto result = _mapper.Map<FoodItem, FoodItemDto>(item);
                    return new BaseDtoResponse<FoodItemDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<FoodItemDto>("Unable to delete: item Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodItemDto>($"An error occurred when deleting the item: {ex.Message}");
            }
        }

        public async Task<BaseDtoListResponse<FoodItemDto>> GetItemsByCategory(Guid CategoryId)
        {
            try
            {
                FoodCategory category = await _foodCategoryRepository.GetById(CategoryId);
                if (category == null)
                    return new BaseDtoListResponse<FoodItemDto>("There is no category with requested Id");
                IList<FoodItem> items = await _foodItemRepository.List(new ItemsByCategorySpecification(CategoryId));
                if (items != null)
                {
                    IList<FoodItemDto> result = _mapper.Map<IList<FoodItem>, IList<FoodItemDto>>(items).ToList();
                    return new BaseDtoListResponse<FoodItemDto>(result);
                }
                else
                {
                    return new BaseDtoListResponse<FoodItemDto>(new List<FoodItemDto>());
                }

            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<FoodItemDto>($"An error occurred when deleting the item: {ex.Message}");
            }
        }

    }
}
