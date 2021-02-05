using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicineTrackingSystem.Models.Request
{
    public class MedicineRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Notes { get; set; }
    }
}
