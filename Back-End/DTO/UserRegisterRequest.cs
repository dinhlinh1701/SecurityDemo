using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityDemo.DTO
{
    public class UserRegisterRequest
    {
        public string email { get; set; }
        public string name { get; set; }
        public string pass { get; set; }
    }
}
