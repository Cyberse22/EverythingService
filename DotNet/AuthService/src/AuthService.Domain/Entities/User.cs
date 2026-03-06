using AuthService.Domain.Base;
using AuthService.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthService.Domain.Entities
{
    public class User : BaseEntity
    {
        private readonly List<RefreshToken> _refreshTokens = new();
        public string UserName { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public UserStatus Status { get; private set; }
        public IReadOnlyCollection<RefreshToken> RefreshTokens => _refreshTokens;
        private User() { }
        public User(string userName, string email, string passwordHash)
        {
            Id = Guid.NewGuid();
            UserName = userName;
            Email = email;
            PasswordHash = passwordHash;
            Status = UserStatus.Active;
            CreatedAt = DateTime.UtcNow;
        }
        public void Lock()
        {
            if (Status == UserStatus.Deleted)
                throw new Exception("Cannot lock deleted user");
            Status = UserStatus.Locked;
            UpdatedAt = DateTime.UtcNow;
        }
        public void SoftDelete()
        {
            Status = UserStatus.Deleted;
            UpdatedAt = DateTime.UtcNow;
        }

        public RefreshToken AddRefreshToken(string token, DateTime expiry)
        {
            var refreshToken = new RefreshToken(token, expiry);
            _refreshTokens.Add(refreshToken);
            return refreshToken;
        }
    }
}
