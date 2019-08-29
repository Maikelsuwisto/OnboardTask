using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardTask.Models
{
    public partial class Customer
    {
       
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int CustomerId { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(300)]
        public string CustomerAddress { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
