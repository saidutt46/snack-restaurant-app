using System;
using System.ComponentModel.DataAnnotations;

namespace Snack.Dto.Requests
{
    public class FoodItemCreateRequest
    {
        [Required(ErrorMessage = "Name is Required")]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required(ErrorMessage = "Availability is Required")]
        public bool Availability { get; set; }
        [Required(ErrorMessage = "Price is Required")]
        public decimal UnitPrice { get; set; }
        public int Calories { get; set; }
        public Guid FoodCategoryId { get; set; }
    }
}
