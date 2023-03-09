using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using TalkBack.Hubs;
using TalkBack.Models;

namespace TalkBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicTacToeController : ControllerBase
    {
        private readonly IHubContext<TalkBackHub, ITalkBackHub> _hub;

        public TicTacToeController(IHubContext<TalkBackHub, ITalkBackHub> hub)
        {
            _hub = hub;
        }

        [HttpPost]
        public async Task<ActionResult<List<Message>>> GetInvitation(Message message)
        {
            await _hub.Clients.AllExcept(message.UserId.ToString()).InviteToPlay(message);

            return Ok(message);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Square>> GetUpdatedBoard(Square square)
        {
            if (square.State == null)
                return BadRequest("Clicked square was not received!");
            await _hub.Clients.All.UpdatedBoard(square);

            return Ok(square);
        }

        [HttpPut]
        public async Task<ActionResult<User>> GetResetGame(User otherUser)
        {
            await _hub.Clients.All.ResetGame(otherUser);

            return Ok(otherUser);
        }
    }
}
