using System.Collections.Generic;

namespace Portfolio.Models
{
    public class ProjectItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string NameNormalised { get; set; }
        public string ShortDescription { get; set; }
        public string ProgrammingLanguages { get; set; }
        public string KeyWords { get; set; }
        public string ThumbnailImage { get; set; }
        public bool IsVisible { get; set; }
        public string Repository { get; set; }
        public string Controller { get; set; }
    }
}