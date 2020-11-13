using System;
using Autofac;
using Snack.Service.Interfaces;
using Snack.Service.Services;

namespace Snack.Service
{
    public class ServiceAutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<CompanyRoleService>().As<ICompanyRoleService>().InstancePerLifetimeScope();
            builder.RegisterType<FoodCategoryService>().As<IFoodCategoryService>().InstancePerLifetimeScope();
            builder.RegisterType<FoodItemService>().As<IFoodItemService>().InstancePerLifetimeScope();
        }
    }
}
