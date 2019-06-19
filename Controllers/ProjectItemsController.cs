using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Archy_Dev.Models;

namespace Archy_Dev.Controllers
{
    public class ProjectItemsController : Controller
    {
        private ProjectItemDBContext db = new ProjectItemDBContext();

        // GET: ProjectItems
        public async Task<ActionResult> Index()
        {
            return View(await db.ProjectItems.ToListAsync());
        }

        // GET: ProjectItems/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProjectItem projectItem = await db.ProjectItems.FindAsync(id);
            if (projectItem == null)
            {
                return HttpNotFound();
            }
            return View(projectItem);
        }

        // GET: ProjectItems/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProjectItems/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "ID,Name,NameNormalised,ShortDescription,ProgrammingLanguages,KeyWords,ThumbnailImage,IsVisible,Repository,Controller")] ProjectItem projectItem)
        {
            if (ModelState.IsValid)
            {
                db.ProjectItems.Add(projectItem);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(projectItem);
        }

        // GET: ProjectItems/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProjectItem projectItem = await db.ProjectItems.FindAsync(id);
            if (projectItem == null)
            {
                return HttpNotFound();
            }
            return View(projectItem);
        }

        // POST: ProjectItems/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "ID,Name,NameNormalised,ShortDescription,ProgrammingLanguages,KeyWords,ThumbnailImage,IsVisible,Repository,Controller")] ProjectItem projectItem)
        {
            if (ModelState.IsValid)
            {
                db.Entry(projectItem).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(projectItem);
        }

        // GET: ProjectItems/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ProjectItem projectItem = await db.ProjectItems.FindAsync(id);
            if (projectItem == null)
            {
                return HttpNotFound();
            }
            return View(projectItem);
        }

        // POST: ProjectItems/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            ProjectItem projectItem = await db.ProjectItems.FindAsync(id);
            db.ProjectItems.Remove(projectItem);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
