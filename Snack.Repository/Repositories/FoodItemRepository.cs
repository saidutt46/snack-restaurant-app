using System;
using Snack.Data.DataModels;
using Snack.Repository.DatabaseContext;
using Snack.Repository.Interfaces;
using Snack.Repository.Shared;

namespace Snack.Repository.Repositories
{
    public class FoodItemRepository : EfRepository<FoodItem>, IFoodItemRepository
    {
        public FoodItemRepository(SnackContext options) : base(options)
        {
        }
    }
}
