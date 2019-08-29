using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardTask.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int StoreId { get; set; }

        [Required(ErrorMessage = "Store Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string StoreName { get; set; }

        [Required(ErrorMessage = "Store Address is required")]
        [StringLength(300)]
        public string StoreAddress { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
