using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OnboardTask.Models
{
    public partial class Sales
    {
        public int SalesId { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product Product { get; set; }
        public Store Store { get; set; }
    }
}
