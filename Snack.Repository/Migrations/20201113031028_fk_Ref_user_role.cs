using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Snack.Repository.Migrations
{
    public partial class fk_Ref_user_role : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_CurrentRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CurrentRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CurrentRoleId",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ComapnyRoleId",
                table: "AspNetUsers",
                column: "ComapnyRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_ComapnyRoleId",
                table: "AspNetUsers",
                column: "ComapnyRoleId",
                principalTable: "CompanyRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_ComapnyRoleId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ComapnyRoleId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<Guid>(
                name: "CurrentRoleId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CurrentRoleId",
                table: "AspNetUsers",
                column: "CurrentRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyRoles_CurrentRoleId",
                table: "AspNetUsers",
                column: "CurrentRoleId",
                principalTable: "CompanyRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
