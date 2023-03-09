namespace TalkBack.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime TimeSent { get; set; } = DateTime.Now;
        public int UserId { get; set; }
        public int ReceiverId { get; set; }
        public bool IsInvite { get; set; } = false;
        public string GameName { get; set; } = string.Empty;
    }
}
