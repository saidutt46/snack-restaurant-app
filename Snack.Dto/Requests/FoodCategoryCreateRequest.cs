using System;
using System.ComponentModel.DataAnnotations;

namespace Snack.Dto.Requests
{
    public class FoodCategoryCreateRequest
    {
        [Required(ErrorMessage = "Category Name required")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Pleaes provide a description: required")]
        public string Description { get; set; }
    }
}
