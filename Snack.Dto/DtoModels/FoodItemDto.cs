using System;
namespace Snack.Dto.DtoModels
{
    public class FoodItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Availability { get; set; }
        public decimal UnitPrice { get; set; }
        public int Calories { get; set; }
        public Guid FoodCategoryId { get; set; }
    }
}
