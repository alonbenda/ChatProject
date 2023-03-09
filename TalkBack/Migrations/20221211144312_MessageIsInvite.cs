using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalkBack.Migrations
{
    /// <inheritdoc />
    public partial class MessageIsInvite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsInvite",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsInvite",
                table: "Messages");
        }
    }
}
