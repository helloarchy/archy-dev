using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ArchyDevContext _context;

        public HomeController(ArchyDevContext context)
        {
            _context = context;
        }

        
        public async Task<IActionResult> Index()
        {
            var projects = new ProjectGalleryViewModel
            {
                ProjectItems = await _context.ProjectItem.ToListAsync()
            };
            return View(await _context.ProjectItem.ToListAsync());
        }


        public IActionResult CV()
        {
            return View();
        }

        
        public IActionResult Privacy()
        {
            return View();
        }

        
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}