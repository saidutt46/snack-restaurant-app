using System;
using Snack.Data.DataModels;
using Snack.Repository.Helpers;

namespace Snack.Repository.ApplicationSpecifications
{
    public class ItemsByCategorySpecification : BaseSpecification<FoodItem>
    {
        public ItemsByCategorySpecification(Guid CategoryId) : base(x => x.FoodCategoryId == CategoryId)
        {
            AddInclude(x => x.FoodCategory);
        }
    }
}
