using System;
using Microsoft.EntityFrameworkCore;
using Snack.Repository.Shared;

namespace Snack.Repository.DatabaseContext
{
    public class SnackContextFactory : DesignTimeDbContextFactoryBase<SnackContext>
    {
        protected override SnackContext CreateNewInstance(DbContextOptions<SnackContext> options)
        {
            return new SnackContext(options);
        }
    }
}
