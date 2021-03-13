using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AadAuthApi.Controllers
{
    [Route("api/pokemon")]
    [ApiController]
    [Authorize]
    public class Pokemon : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllPokemons()
        {
            Debug.WriteLine($"The username is {User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value}");
            Debug.WriteLine($"The user object id is {User.Claims.FirstOrDefault(c => c.Type == ClaimConstants.ObjectId).Value}");


            return Ok(new[] { "Pokemon 1", "Pokemon 2" });
        }
    }
}
