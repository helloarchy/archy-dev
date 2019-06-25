﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Portfolio.Data;
using Portfolio.Models;
using System.Data.SqlClient;

namespace Portfolio
{
    public class Startup
    {
        private string _connection = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            /*const string connection =
                @"Server=mssqluk18.prosql.net\mssqllocaldb;Database=Archy_Dev_DB;User Id=superarch;Password=;ConnectRetryCount=0";
            */
            /*const string connectionString = Configuration["ProjectItems:ConnectionString"];
            string conStr = readOnly connectionString;*/
            var projectItemConfig = Configuration.GetSection("ProjectItems").Get<ProjectItemSettings>();

            var builder = new SqlConnectionStringBuilder(projectItemConfig.ConnectionString);
            builder.Password = projectItemConfig.DbPassword;
            _connection = builder.ConnectionString;


            // https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-2.2&tabs=windows

            // const string connection = @"Server=" + connectionString;
            services.AddDbContext<ArchyDevContext>
                (options => options.UseSqlServer(_connection));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ArchyDevContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            /* Seed projects */
            DbSeed.SeedDatabase(context).Wait();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}