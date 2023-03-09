using TalkBack.Models;

namespace TalkBack.Hubs
{
    public interface ITalkBackHub
    {
        Task SendMessage(int userId, Message message);

        Task GetConnectedUsers(List<User> users);

        Task InviteToPlay(Message message);

        Task UpdatedBoard(Square square);
        Task ResetGame(User otherUser);
    }
}
