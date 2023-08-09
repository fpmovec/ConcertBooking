using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConcertBackend.Migrations
{
    /// <inheritdoc />
    public partial class Coordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coordinates_Concerts_ConcertId",
                table: "Coordinates");

            migrationBuilder.DropIndex(
                name: "IX_Coordinates_ConcertId",
                table: "Coordinates");

            migrationBuilder.DropColumn(
                name: "ConcertId",
                table: "Coordinates");

            migrationBuilder.AddColumn<int>(
                name: "CoordinatesId",
                table: "Concerts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Concerts_CoordinatesId",
                table: "Concerts",
                column: "CoordinatesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Concerts_Coordinates_CoordinatesId",
                table: "Concerts",
                column: "CoordinatesId",
                principalTable: "Coordinates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Concerts_Coordinates_CoordinatesId",
                table: "Concerts");

            migrationBuilder.DropIndex(
                name: "IX_Concerts_CoordinatesId",
                table: "Concerts");

            migrationBuilder.DropColumn(
                name: "CoordinatesId",
                table: "Concerts");

            migrationBuilder.AddColumn<int>(
                name: "ConcertId",
                table: "Coordinates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Coordinates_ConcertId",
                table: "Coordinates",
                column: "ConcertId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Coordinates_Concerts_ConcertId",
                table: "Coordinates",
                column: "ConcertId",
                principalTable: "Concerts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
