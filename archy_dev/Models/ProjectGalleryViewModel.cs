using System.Collections.Generic;

namespace Portfolio.Models
{
    public class ProjectGalleryViewModel
    {
        public int ID { get; set; }
        public List<ProjectItem> ProjectItems { get; set; }
    }
}