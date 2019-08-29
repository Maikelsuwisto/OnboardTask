using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardTask.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int ProductId { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string ProductName { get; set; }

        [Required(ErrorMessage = "Price is required")]
        [Range(100, 10000000, ErrorMessage = "Price must be between 3000 and 10000000")]
        public int Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
