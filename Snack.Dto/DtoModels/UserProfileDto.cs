using System;
using System.Collections.Generic;

namespace Snack.Dto.DtoModels
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public int Gender { get; set; }
        public Guid Designation { get; set; }
        public List<string> Roles { get; set; }
    }
}
