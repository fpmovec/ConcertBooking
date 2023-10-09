#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app/backend
EXPOSE 5207
EXPOSE 7235

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["ConcertBackend/ConcertBackend.csproj", "ConcertBackend/"]
RUN dotnet restore "ConcertBackend/ConcertBackend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "ConcertBackend/ConcertBackend.csproj" -c Release -o /app/backend/build

FROM build AS publish
RUN dotnet publish "ConcertBackend/ConcertBackend.csproj" -c Release -o /app/backend/publish 



FROM mcr.microsoft.com/dotnet/sdk:7.0
WORKDIR /app/backend
COPY --from=publish /app/backend/publish .
RUN dotnet dev-certs https
ENTRYPOINT ["dotnet", "ConcertBackend.dll"]

