using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthService.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        [Authorize]
        [HttpGet("me")]
        public IActionResult Me()
        {
            var username = User.Claims
                .FirstOrDefault(c => c.Type == "preferred_username")?.Value;

            var role = User.Claims
                .Where(c => c.Type.Contains("role"))
                .Select(c => c.Value);

            return Ok(new { username, role });
        }
        [HttpGet("public")]
        public IActionResult Public()
        {
            return Ok("This is a public endpoint.");
        }
    }
}
