using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityDemo.Models
{
    public class UserModel
    {
        [Key]
        public int id { get; set; }
        public string userName { get; set; }
        public string passWord { get; set; }
        public string emailAddress { get; set; }
        public string role { get; set; }
    }
}
