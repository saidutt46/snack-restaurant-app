using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Snack.Data.DataModels;
using Snack.Dto.DtoModels;
using Snack.Dto.Requests;
using Snack.Dto.Responses;
using Snack.WebApi.Extensions;

namespace Snack.WebApi.Controllers
{
    [Route("/api/user")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthenticationController> _logger;


        public AuthenticationController(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager, IConfiguration configuration, IMapper mapper, ILogger<AuthenticationController> logger)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            try
            {
                var user = await userManager.FindByNameAsync(model.Username);
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password) == false)
                {
                    return BadRequest("Incorrect Password, please retry with a valid password for given user");
                }
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    var userRoles = await userManager.GetRolesAsync(user);

                    var authClaims = new List<Claim>
                    {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };
                    List<string> roles = new List<string>();
                    foreach (var userRole in userRoles)
                    {
                        roles.Add(userRole);
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddHours(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );
                    var convertedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    UserProfileDto currentUser = _mapper.Map<ApplicationUser, UserProfileDto>(user);
                    currentUser.Roles = roles;

                    LoginResponse response = new LoginResponse
                    {
                        Token = convertedToken,
                        Expiration = token.ValidTo,
                        UserProfile = currentUser
                    };

                    return Ok(response);

                }
                return BadRequest("User Not Found, please check the credentials");
                //return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());
            try
            {
                var userExists = await userManager.FindByNameAsync(model.Username);
                if (userExists != null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = "User already exists!" });

                ApplicationUser user = new ApplicationUser()
                {
                    Email = model.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = model.Username,
                    LastName = model.LastName,
                    FirstName = model.FirstName,
                    DateJoined = model.DateJoined,
                    Gender = model.Gender,
                    CompanyRoleId = model.CompanyRoleId,
                    DateOfBirth = model.DateOfBirth,
                    PhoneNumber = model.PhoneNumber
                };
                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    var message = "";
                    foreach (var error in result.Errors)
                    {
                        message += error.Description + ", ";
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Status = "Error", Message = message });
                }

                foreach(var role in model.UserRoles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                        await roleManager.CreateAsync(new IdentityRole(role));
                }
                await userManager.AddToRolesAsync(user, model.UserRoles);

                return Ok(new AuthResponse { Success = true, Status = "Success", Message = "User created successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Provided User Id is not a valid string or Guid");
            try
            {
                //var userExists = await userManager.FindByNameAsync(model.Username);
                var userExists = await userManager.FindByIdAsync(id);
                if (userExists == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors =  new List<string> { "User Not Found" } });
                var userRoles = await userManager.GetRolesAsync(userExists);
                List<string> roles = new List<string>();
                foreach (var userRole in userRoles)
                {
                    roles.Add(userRole);
                }
                UserProfileDto user = _mapper.Map<ApplicationUser, UserProfileDto>(userExists);
                user.Roles = roles;
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{id}/addroles")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> AddRoles(string id,[FromBody] List<string> addRoles)
        {
            if (!ModelState.IsValid)
                return BadRequest("Provided User Id is not a valid string or Guid");
            try
            {
                var userExists = await userManager.FindByIdAsync(id);
                if (userExists == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User Not Found" } });
                var updatedRoles = await userManager.AddToRolesAsync(userExists, addRoles);
                var userRoles = await userManager.GetRolesAsync(userExists);
                List<string> roles = new List<string>();
                foreach (var userRole in userRoles)
                {
                    roles.Add(userRole);
                }
                UserProfileDto user = _mapper.Map<ApplicationUser, UserProfileDto>(userExists);
                user.Roles = roles;
                return Ok(user);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("{id}/removeroles")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> RemoveRoles(string id, [FromBody] List<string> rolesTobeRemoved)
        {
            if (!ModelState.IsValid)
                return BadRequest("Provided User Id is not a valid string or Guid");
            try
            {
                var userExists = await userManager.FindByIdAsync(id);
                if (userExists == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User Not Found" } });
                var removeRoles = await userManager.RemoveFromRolesAsync(userExists, rolesTobeRemoved);
                var userRoles = await userManager.GetRolesAsync(userExists);
                List<string> roles = new List<string>();
                foreach (var userRole in userRoles)
                {
                    roles.Add(userRole);
                }
                UserProfileDto user = _mapper.Map<ApplicationUser, UserProfileDto>(userExists);
                user.Roles = roles;
                return Ok(user);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("listall")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> ListAll()
        {
            try
            {
                IList<UserProfileDto> result = new List<UserProfileDto>();
                await Task.Run(async () =>
                {
                    var users = userManager.Users;
                    foreach(ApplicationUser user in users)
                    {
                        var userRoles = await userManager.GetRolesAsync(user);
                        List<string> roles = new List<string>();
                        foreach (var userRole in userRoles)
                        {
                            roles.Add(userRole);
                        }
                        UserProfileDto convertedResult = _mapper.Map<ApplicationUser, UserProfileDto>(user);
                        convertedResult.Roles = roles;
                        result.Add(convertedResult);
                    }
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserProfileRequest request)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                if (user == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User Not Found" } });
                user.Email = request.Email;
                user.FirstName = request.FirstName;
                user.LastName = request.LastName;
                user.UserName = request.UserName;
                user.PhoneNumber = request.PhoneNumber;
                user.DateOfBirth = request.DateOfBirth;
                user.CompanyRoleId = request.Designation;
                if (request.AddRoles.Count > 0)
                {
                    foreach (var role in request.AddRoles)
                    {
                        if (!await roleManager.RoleExistsAsync(role))
                            await roleManager.CreateAsync(new IdentityRole(role));
                    }
                    await userManager.AddToRolesAsync(user, request.AddRoles);
                }
                if (request.RemoveRoles.Count > 0)
                {
                    await userManager.RemoveFromRolesAsync(user, request.RemoveRoles);
                }
                var updatedUser = await userManager.UpdateAsync(user);

                if (updatedUser.Succeeded)
                {
                    var finalUser = await userManager.FindByIdAsync(id);
                    var userRoles = await userManager.GetRolesAsync(finalUser);
                    List<string> roles = new List<string>();
                    foreach (var userRole in userRoles)
                    {
                        roles.Add(userRole);
                    }
                    UserProfileDto result = _mapper.Map<ApplicationUser, UserProfileDto>(finalUser);
                    result.Roles = roles;
                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status304NotModified, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User update failed, try again" } });

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Policy = "ManagerialPolicy")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                if (user == null)
                    return StatusCode(StatusCodes.Status404NotFound, new AuthResponse { Success = false, Status = "Error", Errors = new List<string> { "User Not Found" } });
                var delete = await userManager.DeleteAsync(user);
                return Ok(new AuthResponse { Success = true, Status = "Success", Message = "User deleted successfully!" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
