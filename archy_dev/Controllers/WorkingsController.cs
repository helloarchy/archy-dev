using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Controllers
{
    public class WorkingsController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}