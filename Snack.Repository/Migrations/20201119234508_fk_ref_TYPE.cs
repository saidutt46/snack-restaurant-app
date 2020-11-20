using Microsoft.EntityFrameworkCore.Migrations;

namespace Snack.Repository.Migrations
{
    public partial class fk_ref_TYPE : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_ComapnyRoleId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ComapnyRoleId",
                table: "AspNetUsers",
                newName: "CompanyRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_ComapnyRoleId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_CompanyRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_CompanyRoleId",
                table: "AspNetUsers",
                column: "CompanyRoleId",
                principalTable: "CompanyRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_CompanyRoleId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "CompanyRoleId",
                table: "AspNetUsers",
                newName: "ComapnyRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_AspNetUsers_CompanyRoleId",
                table: "AspNetUsers",
                newName: "IX_AspNetUsers_ComapnyRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_ComapnyRoleId",
                table: "AspNetUsers",
                column: "ComapnyRoleId",
                principalTable: "CompanyRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
