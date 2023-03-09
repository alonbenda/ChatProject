using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using TalkBack.Data;
using TalkBack.Hubs;
using TalkBack.Models;

namespace TalkBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<TalkBackHub, ITalkBackHub> _hub;
        private readonly TalkBackContext _context;

        public ChatController(TalkBackContext context, IHubContext<TalkBackHub, ITalkBackHub> hub)
        {
            _context = context;
            _hub = hub;
        }

        [HttpGet]
        public async Task<ActionResult<List<Message>>> GetMessages()
        {
            return Ok(await _context.Messages.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Message>>> SendMessage(Message message)
        {
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            await _hub.Clients.All.SendMessage(message.UserId, message);

            return Ok(message);
        }
    }
}
