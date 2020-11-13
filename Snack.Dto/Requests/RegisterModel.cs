using System;
using System.ComponentModel.DataAnnotations;

namespace Snack.Dto.Requests
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Firstname is required")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Lastname is required")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Date User Profile being created is required")]
        public DateTime DateJoined { get; set; }

        [Required(ErrorMessage = "Current User Designation/Title is required")]
        public Guid ComapnyRoleId { get; set; }

        [Required(ErrorMessage = "User needs to have role when being created")]
        public string UserRole { get; set; }

        public DateTime DateOfBirth { get; set; }
        public int Gender { get; set; }
    }
}
