# Stage 1 - Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution
COPY AuthService.slnx .

# Copy project files
COPY src/AuthService.API/AuthService.API.csproj src/AuthService.API/
COPY src/AuthService.Application/AuthService.Application.csproj src/AuthService.Application/
COPY src/AuthService.Domain/AuthService.Domain.csproj src/AuthService.Domain/
COPY src/AuthService.Infrastructure/AuthService.Infrastructure.csproj src/AuthService.Infrastructure/
COPY src/AuthService.Persistence/AuthService.Persistence.csproj src/AuthService.Persistence/

RUN dotnet restore src/AuthService.API/AuthService.API.csproj

# Copy full source
COPY . .

WORKDIR /src/src/AuthService.API
RUN dotnet publish -c Release -o /app/publish

# Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "AuthService.API.dll"]