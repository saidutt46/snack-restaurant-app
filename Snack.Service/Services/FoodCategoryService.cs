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
    public class FoodCategoryService : IFoodCategoryService
    {
        private readonly IFoodCategoryRepository _foodCategoryRepository;
        private readonly IMapper _mapper;
        private readonly IFoodItemRepository _foodItemRepository;

        public FoodCategoryService(
            IFoodCategoryRepository foodCategoryRepository,
            IMapper mapper,
            IFoodItemRepository foodItemRepository
            )
        {
            _foodCategoryRepository = foodCategoryRepository;
            _mapper = mapper;
            _foodItemRepository = foodItemRepository;
        }

        public async Task<BaseDtoListResponse<FoodCategoryDto>> ListAsync()
        {
            try
            {
                IList<FoodCategory> categories = await _foodCategoryRepository.ListAll();
                if (categories != null)
                {
                    IList<FoodCategoryDto> result = _mapper.Map<IList<FoodCategory>, IList<FoodCategoryDto>>(categories);
                    BaseDtoListResponse<FoodCategoryDto> response = new BaseDtoListResponse<FoodCategoryDto>(result);
                    return response;
                }
                else
                {
                    return new BaseDtoListResponse<FoodCategoryDto>("No Categories found, please try after adding new categories(s)");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoListResponse<FoodCategoryDto>(ex.Message);
            }
        }

        public async Task<BaseDtoResponse<FoodCategoryDto>> GetById(Guid id)
        {
            FoodCategory category = await _foodCategoryRepository.GetById(id);

            if (category == null)
                return new BaseDtoResponse<FoodCategoryDto>("Category Not Found");
            FoodCategoryDto result = _mapper.Map<FoodCategory, FoodCategoryDto>(category);
            return new BaseDtoResponse<FoodCategoryDto>(result);
        }

        public async Task<BaseDtoResponse<FoodCategoryDto>> Add(FoodCategoryCreateRequest request)
        {
            try
            {
                FoodCategory model = _mapper.Map<FoodCategoryCreateRequest, FoodCategory>(request);
                FoodCategory category = await _foodCategoryRepository.Add(model);
                if (category != null)
                {
                    FoodCategoryDto result = _mapper.Map<FoodCategory, FoodCategoryDto>(category);
                    return new BaseDtoResponse<FoodCategoryDto>(result);
                }
                else
                {
                    return new BaseDtoResponse<FoodCategoryDto>("Unable to create a new category, try again");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodCategoryDto>($"An error occurred when saving the category: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<FoodCategoryDto>> Update(Guid id, FoodCategoryCreateRequest request)
        {
            try
            {
                FoodCategory category = await _foodCategoryRepository.GetById(id);
                if (category != null)
                {
                    category.Description = request.Description;
                    category.Name = request.Name;
                    await _foodCategoryRepository.Update(category);
                    FoodCategory updatedResult = await _foodCategoryRepository.GetById(id);
                    FoodCategoryDto result = _mapper.Map<FoodCategory, FoodCategoryDto>(updatedResult);
                    return new BaseDtoResponse<FoodCategoryDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<FoodCategoryDto>("Food Category Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodCategoryDto>($"An error occurred when updating the category: {ex.Message}");
            }
        }

        public async Task<BaseDtoResponse<FoodCategoryDto>> Delete(Guid id)
        {
            try
            {
                FoodCategory category = await _foodCategoryRepository.GetById(id);
                if (category != null)
                {
                    await _foodCategoryRepository.Delete(category);
                    FoodCategoryDto result = _mapper.Map<FoodCategory, FoodCategoryDto>(category);
                    return new BaseDtoResponse<FoodCategoryDto>(result);

                }
                else
                {
                    return new BaseDtoResponse<FoodCategoryDto>("Unable to delete: Category Not found");
                }
            }
            catch (Exception ex)
            {
                return new BaseDtoResponse<FoodCategoryDto>($"An error occurred when deleting the category: {ex.Message}");
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
