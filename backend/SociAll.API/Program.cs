using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.OpenApi.Models;
using NHibernate;
using SociAll.Aplicacao.Usuarios.Profiles;
using SociAll.Aplicacao.Usuarios.Servicos;
using SociAll.Dominio.Usuarios.Servicos;
using SociAll.Infra.Usuarios.Mapeamentos;
using SociAll.Infra.Usuarios.Repositorios;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SociAll", Version = "v1" });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

    c.IncludeXmlComments(xmlPath);
});

builder.Services.AddSingleton<ISessionFactory>(factory =>
{
    string connectionString = builder.Configuration.GetConnectionString("MySql");
    return Fluently.Configure()
    .Database((MySQLConfiguration.Standard.ConnectionString(connectionString)
    .FormatSql()
    .ShowSql()))
    .Mappings(x => x.FluentMappings.AddFromAssemblyOf<UsuarioMap>())
    .BuildSessionFactory();
});

builder.Services.AddScoped<NHibernate.ISession>(factory => factory.GetService<ISessionFactory>()!.OpenSession());
builder.Services.AddScoped<ITransaction>(factory => factory.GetService<NHibernate.ISession>()!.BeginTransaction());

builder.Services.AddAutoMapper(typeof(UsuariosProfile));
builder.Services.Scan(scan => scan
    .FromAssemblyOf<UsuariosAppServico>()
        .AddClasses()
            .AsImplementedInterfaces()
                .WithScopedLifetime());

builder.Services.Scan(scan => scan
    .FromAssemblyOf<UsuariosServico>()
        .AddClasses()
            .AsImplementedInterfaces()
                .WithScopedLifetime());

builder.Services.Scan(scan => scan
    .FromAssemblyOf<UsuariosRepositorio>()
        .AddClasses()
            .AsImplementedInterfaces()
                .WithScopedLifetime());

var app = builder.Build();

app.UseCors(c =>
{
    c.AllowAnyHeader();
    c.AllowAnyMethod();
    c.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("../swagger/v1/swagger.json", "SociAll.xml");
        c.DisplayRequestDuration();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
