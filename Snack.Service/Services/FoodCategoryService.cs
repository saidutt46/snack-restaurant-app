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
    public class FoodCategoryService : IFoodCategoryService
    {
        private readonly IFoodCategoryRepository _foodCategoryRepository;
        private readonly IMapper _mapper;

        public FoodCategoryService(IFoodCategoryRepository foodCategoryRepository, IMapper mapper)
        {
            _foodCategoryRepository = foodCategoryRepository;
            _mapper = mapper;
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
    }
}
