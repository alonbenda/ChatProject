using Microsoft.EntityFrameworkCore;
using TalkBack.Models;

namespace TalkBack.Data
{
    public class TalkBackContext : DbContext
    {
        public TalkBackContext(DbContextOptions<TalkBackContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}
