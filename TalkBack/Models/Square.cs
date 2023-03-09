namespace TalkBack.Models
{
    public class Square
    {
        public int Id { get; set; }
        public string? State { get; set; } = null;
        public int OtherPlayerId { get; set; }
    }
}
