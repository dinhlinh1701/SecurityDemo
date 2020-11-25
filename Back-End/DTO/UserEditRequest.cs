using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityDemo.DTO
{
    public class UserEditRequest
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string emailAddress { get; set; }
        public string role { get; set; }
    }
}
