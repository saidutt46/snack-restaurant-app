using System;
using Snack.Data.DataModels;
using Snack.Repository.DatabaseContext;
using Snack.Repository.Interfaces;
using Snack.Repository.Shared;

namespace Snack.Repository.Repositories
{
    public class FoodCategoryRepository : EfRepository<FoodCategory>, IFoodCategoryRepository
    {
        public FoodCategoryRepository(SnackContext options) : base(options)
        {
        }
    }
}
