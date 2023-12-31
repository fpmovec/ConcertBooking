using ConcertBackend.Context;
using ConcertBackend.EmailConfirmation.EmailService;
using ConcertBackend.Repositories.Classes;
using ConcertBackend.Repositories.Interfaces;
using ConcertBackend.Repositories.Realizations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<ConcertsDbContext>(
    options => options.UseSqlServer(ConfigurationExtensions.GetConnectionString(builder.Configuration, "DefaultConnection"))
    );
builder.Services.AddTransient<IConcertRepository, ConcertRepository>();
builder.Services.AddTransient<IPromocodesRepository, PromocodesRepository>();
builder.Services.AddTransient<IBookingRepository, BookingRepository>();
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddSingleton<IEmailService, EmailService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.Authority = "https://dev-ii744htuz2rl8fvk.us.auth0.com/";
    options.Audience = "https://concertsbooking";
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("admin", policy => policy.RequireClaim("permissions", "create:admin"));
    options.AddPolicy("user", policy => policy.RequireClaim("permissions", "read:user"));
});

builder.Services.AddCors(options => 
   options.AddPolicy("CorsPolicy", build => 
       build.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:5173")));

var app = builder.Build();

 //Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
app.UseHttpsRedirection();
}

app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
