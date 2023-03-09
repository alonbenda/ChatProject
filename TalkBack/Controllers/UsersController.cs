using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TalkBack.Data;
using TalkBack.Hubs;
using TalkBack.Models;

namespace TalkBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IHubContext<TalkBackHub, ITalkBackHub> _hub;
        private readonly TalkBackContext _context;

        public UsersController(TalkBackContext context, IHubContext<TalkBackHub, ITalkBackHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        //[Authorize]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<User>>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> CreateUser(User user)
        {
            if (user == null || !ModelState.IsValid)
            {
                return BadRequest("Registration failed");
            }

            var claims = new List<Claim>
            {
                new Claim(type: ClaimTypes.Name,value: user.FirstName)
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(identity),
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    AllowRefresh = true,
                    ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                });

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> UpdateUser(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.Id);
            if (dbUser == null)
                return BadRequest("User not found!");

            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.UserName = user.UserName;
            dbUser.Password = user.Password;
            dbUser.Email = user.Email;
            dbUser.Image = user.Image;
            dbUser.Description = user.Description;
            dbUser.LoggedIn = user.LoggedIn;
            dbUser.WinsRecord = user.WinsRecord;
            dbUser.LosesRecord = user.LosesRecord;

            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found!");

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
