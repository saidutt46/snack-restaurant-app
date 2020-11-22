using System;
using System.Collections.Generic;
using Snack.Data.Shared;

namespace Snack.Data.DataModels
{
    public class FoodCategory : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<FoodItem> FoodItems { get; set; }
    }
}
