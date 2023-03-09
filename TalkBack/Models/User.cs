namespace TalkBack.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool LoggedIn { get; set; } = false;
        public int WinsRecord { get; set; } = 0;
        public int LosesRecord { get; set; } = 0;
    }
}
