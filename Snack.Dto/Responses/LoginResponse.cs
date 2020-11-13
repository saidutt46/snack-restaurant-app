using System;
using Snack.Dto.DtoModels;

namespace Snack.Dto.Responses
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public UserProfileDto UserProfile { get; set; }
    }
}
