using System;
using Autofac;
using Snack.Repository.Interfaces;
using Snack.Repository.Repositories;

namespace Snack.Repository
{
    public class RepositoryAutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<CompanyRoleRepository>().As<ICompanyRoleRepository>().InstancePerLifetimeScope();
            builder.RegisterType<FoodCategoryRepository>().As<IFoodCategoryRepository>().InstancePerLifetimeScope();
            builder.RegisterType<FoodItemRepository>().As<IFoodItemRepository>().InstancePerLifetimeScope();
        }
    }
}
