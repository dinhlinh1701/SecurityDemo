using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using SecurityDemo.DTO;
using SecurityDemo.Models;


namespace SecurityDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly SecurityDbContext _context;
        private static string tokenHanler;
        public LoginController(IConfiguration _config, SecurityDbContext _context)
        {
            this._config = _config;
            this._context = _context;
        }

        [HttpGet("employees")]
        public IActionResult ListEmployee()
        {

            var user = _context.userModels.ToList();
           
                if (user != null)
                {

                    return Ok(new { success = true , data = user });


                }
                return Ok(new { success = false });

        }


        [AllowAnonymous]
        [HttpPost("register")]
        public  IActionResult Register(UserRegisterRequest req)
        {
            
            UserModel user = new UserModel 
            { 
                userName = req.name,
                emailAddress = req.email,
                passWord = req.pass
            
            };
            bool checkUserExist = CheckUserExist(user);
            if (checkUserExist == false)
            {
                _context.userModels.Add(user);
                var checkRegisterSuccess = _context.SaveChanges();

                if (checkRegisterSuccess > 0)
                {

                    return Ok(new { success = true });


                }
                return Ok(new { success = false });
            }
            return Ok(new { success = false });
        }

        [HttpPost("edit")]
        public IActionResult EditEmployees(UserEditRequest req)
        {
            var user = FindUserById(req.id);
            if (user != null)
            {
                user.userName = req.userName;
                user.emailAddress = req.emailAddress;
                user.role = req.role;
                 _context.SaveChanges();
                    return Ok(new { success = true });
            }
            return Ok(new { success = false });

        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployees(int id)
        {
            var user = FindUserById(id);
            if (user != null)
            {
                _context.Remove(user);
                var check = _context.SaveChanges();
                if (check > 0)
                {
                    return Ok(new { success = true });
                }

                return Ok(new { success = false });

            }

            return Ok(new { success = false });
        }

        public UserModel FindUserById(int id) 
        {
            var user = _context.userModels.Where(x => x.id == id).FirstOrDefault();
            if (user != null)
            {
                return user;

            }

            return null;
        }

        [HttpPost("Changepass")]
        public IActionResult ChangePassWord(UserChangePassRequest req)
        {
            if (tokenHanler == null)
            {
                return Ok(new { success = false });
            }
            var userToken = GetUserByToken(tokenHanler);
            //  var userFinded = FindUserByEmail(new SendMailRequest { email = userToken.Value.emailAddress });
            var userFindInDb =  _context.userModels.Where(x => x.emailAddress == userToken.Value.emailAddress).FirstOrDefault();

            userFindInDb.passWord = req.pass;
            var result = _context.SaveChanges();

            if (result > 0)
            {
                return Ok(new { success = true });
            }

            return Ok(new { success = false });

        }

        [AllowAnonymous]
        [HttpPost("Sendemail")]
        public IActionResult SendemailToForgetPass(SendMailRequest req)
        {
            tokenHanler = null;

            var checkUserExist = FindUserByEmail(req);
            if (checkUserExist != null)
            {
                tokenHanler = GenerateJSONWebToken(checkUserExist);

                var customer = new SendMailRequest
                {
                    email = checkUserExist.emailAddress
                };
                var checkSend = Send(customer);
                if (checkSend)
                {
                    return Ok(new { success = true });
                }

                return Ok(new { success = false, message = "Oops! error to send to the email" });
            }

            return Ok(new { success = false, message = "The email is not exist!" });
        }

        public bool Send(SendMailRequest req)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Test project", "dinhlinh1701@gmail.com"));
                message.To.Add(new MailboxAddress("customer", req.email));
                message.Subject = "Test mail chage pass word";
                message.Body = new TextPart("plain")
                {
                    Text = "link to get change pass page here",
                };

                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 365, false);
                    client.Authenticate("dinhlinh1701@gmail.com", "pass");
                    client.Send(message);
                    client.Disconnect(true);
                }

                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        public UserModel FindUserByEmail(SendMailRequest req)
        {
            var checkUserSuccess = _context.userModels.Where(x => x.emailAddress == req.email).FirstOrDefault();

            if (checkUserSuccess != null)
            {
                return checkUserSuccess;
            }
            return null;
        }

        public bool CheckUserExist(UserModel req)
        {
            var checkRegisterSuccess = _context.userModels.Where(x => x.userName == req.userName || x.emailAddress == req.emailAddress).FirstOrDefault();

            if (checkRegisterSuccess != null)
            {
                return true;
            }
            return false;
        }

        public UserModel CheckUserInDb(UserModel req)
        {
            var checkRegisterSuccess = _context.userModels.Where(x => x.userName == req.userName && x.passWord == req.passWord).FirstOrDefault();

            if (checkRegisterSuccess != null)
            {
                return checkRegisterSuccess;
            }
            return null;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(UserRequest req)
        {
            UserModel user = new UserModel();
            user.userName = req.name;
            user.passWord = req.pass;
            var authUser = CheckUserInDb(user);

            if (authUser != null)
            {
                var tokenStr = GenerateJSONWebToken(authUser);


                return Ok(new {success = true, name = HttpContext.User.Identity.Name, token = tokenStr});


            }
            return Ok(new { success = false});
        }

        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            HttpContext.Request.Headers.Clear();
           
            HttpContext.Session.Clear();
            HttpContext.Items.Clear();
            HttpContext.Request.Headers.Remove("Authorization");
           // HttpContext.Session.Remove("Token");
            return Ok("Logout success!");
        }

        private string GenerateJSONWebToken(UserModel authUser)
        {
            if (authUser.role == null)
            {
                authUser.role = "employee";
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("name",authUser.userName),
                new Claim("email",authUser.emailAddress),
                new Claim("role",authUser.role),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            };
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireDays"]));
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: credentials);
            string encodeToken = new JwtSecurityTokenHandler().WriteToken(token);
        

//            HttpContext.Session.SetString("Token", encodeToken);
            HttpContext.Request.Headers.Add("Token", encodeToken);
            HttpContext.Response.Headers.Add("Token", encodeToken);

            return encodeToken;
        }

        [Authorize]
        [HttpGet("Post")]
        public string Post()
        {
            var check = HttpContext.Request.Headers;
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IList<Claim> claim = identity.Claims.ToList();
            var userName = claim[0].Value;
            return "Welcome! " + userName;
        }

        [Authorize]
        [HttpGet("Get")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2", "value3" };
        }

  
        [HttpGet("User")]
        public ActionResult<UserModel> GetUser(string token)
        {
            if (token != "null")
            {
                var stream = token;
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(stream);
                var tokenS = handler.ReadToken(stream) as JwtSecurityToken;

                var nameType = tokenS.Claims.First(claim => claim.Type == "name").Value;
                var emailType = tokenS.Claims.First(claim => claim.Type == "email").Value;
                var roleType = tokenS.Claims.First(claim => claim.Type == "role").Value;

                var userHasValue = new UserModel
                {
                    userName = nameType,
                    emailAddress = emailType,
                    role = roleType,
                };

                return userHasValue;
            }
            var user = new UserModel
            {
                userName = null,
                emailAddress = null,
                role = null,
            };
            return user;

        }

        public ActionResult<UserModel> GetUserByToken(string token)
        {
            if (token != "null")
            {
                var stream = token;
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(stream);
                var tokenS = handler.ReadToken(stream) as JwtSecurityToken;

                var nameType = tokenS.Claims.First(claim => claim.Type == "name").Value;
                var emailType = tokenS.Claims.First(claim => claim.Type == "email").Value;
                var roleType = tokenS.Claims.First(claim => claim.Type == "role").Value;

                var userHasValue = new UserModel
                {
                    userName = nameType,
                    emailAddress = emailType,
                    role = roleType,
                };

                return userHasValue;
            }
            var user = new UserModel
            {
                userName = null,
                emailAddress = null,
                role = null,
            };
            return user;

        }
    }
}
