using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
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
    public class LogInController : ControllerBase
    {
        private readonly IHubContext<TalkBackHub, ITalkBackHub> _hub;
        private readonly TalkBackContext _context;

        public LogInController(TalkBackContext context, IHubContext<TalkBackHub, ITalkBackHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> LogIn(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.Id);
            if (dbUser == null || !ModelState.IsValid)
                return BadRequest("User not found!");

            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                new AuthenticationProperties
                {
                    IsPersistent= true,
                    AllowRefresh=true,
                    ExpiresUtc= DateTime.UtcNow.AddMinutes(10)
                });

            dbUser.LoggedIn = true;

            await _context.SaveChangesAsync();
            await _hub.Clients.All.GetConnectedUsers(_context.Users.ToList());

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut("/logout")]
        //[Authorize]
        public async Task<ActionResult<List<User>>> LogOut(User user)
        {
            var dbUser = await _context.Users.FindAsync(user.Id);
            if (dbUser == null)
                return BadRequest("User not found!");

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Response.Cookies.Delete(user.UserName);

            dbUser.LoggedIn = false;

            await _context.SaveChangesAsync();
            await _hub.Clients.All.GetConnectedUsers(_context.Users.ToList());

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
