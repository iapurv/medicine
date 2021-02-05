using MedicineTrackingSystem.Services.Contracts;
using MedicineTrackingSystem.Services.Contracts.Commands;
using MedicineTrackingSystem.Services.Contracts.Query;
using MedicineTrackingSystem.Services.Implementation;
using MedicineTrackingSystem.Services.Implementation.Commands;
using MedicineTrackingSystem.Services.Implementation.Query;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MedicineTrackingSystem
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // configure DI for application services
            services.AddScoped<IMedicineCommand, MedicineCommand>();
            services.AddScoped<IMedicineQuery, MedicineQuery>();
            services.AddScoped<IUtilityService, UtilityService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}
