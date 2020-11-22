using System;
using Snack.Data.Shared;

namespace Snack.Data.DataModels
{
    public class FoodItem : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Availability { get; set; }
        public decimal UnitPrice { get; set; }
        public int Calories { get; set; }

        public Guid FoodCategoryId { get; set; }

        public FoodCategory FoodCategory { get; set; }
    }
}
