using System;
using System.Collections.Generic;

namespace Snack.Dto.Responses
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
    }
}
