using AuthService.Domain.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuthService.Domain.Entities
{
    public class RefreshToken : BaseEntity
    {
        public string Token { get; private set; }
        public DateTime ExpiryDate { get; private set; }

        public bool IsRevoked { get; private set; }

        public Guid UserId { get; private set; }
        public User User { get; private set; }

        private RefreshToken() { }

        public RefreshToken(string token, DateTime expiryDate)
        {
            Id = Guid.NewGuid();
            Token = token;
            ExpiryDate = expiryDate;
            IsRevoked = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void Revoked()
        {
            IsRevoked = true;
            UpdatedAt = DateTime.UtcNow;
        } 
    }
}
