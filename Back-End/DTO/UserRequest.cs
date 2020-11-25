using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityDemo.DTO
{
    public class UserRequest
    {
        public string name { get; set; }
        public string pass { get; set; }
        public bool rememberMe { get; set; }
    }
}
