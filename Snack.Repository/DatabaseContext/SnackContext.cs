using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Snack.Data.DataModels;
using Snack.Data.Shared;

namespace Snack.Repository.DatabaseContext
{
    public class SnackContext : IdentityDbContext<ApplicationUser>
    {
        public SnackContext(DbContextOptions<SnackContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUser>().HasOne(p => p.CurrentRole).WithMany(s => s.Users)
                .HasForeignKey(g => g.CompanyRoleId);

            builder.Entity<CompanyRole>().HasMany(p => p.Users).WithOne(g => g.CurrentRole);
            builder.Entity<CompanyRole>().HasKey(p => p.Id);

            builder.Entity<FoodCategory>().HasMany(p => p.FoodItems).WithOne(s => s.FoodCategory);
            builder.Entity<FoodItem>().HasOne(p => p.FoodCategory).WithMany(s => s.FoodItems)
                .HasForeignKey(g => g.FoodCategoryId);
        }

        public DbSet<CompanyRole> CompanyRoles { get; set; }
        public DbSet<FoodCategory> FoodCategories { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }

        public override int SaveChanges()
        {
            AddAuitInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddAuitInfo();
            return await base.SaveChangesAsync();
        }

        private void AddAuitInfo()
        {
            var entries = ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));
            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;
                }
                ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
            }
        }
    }
}
