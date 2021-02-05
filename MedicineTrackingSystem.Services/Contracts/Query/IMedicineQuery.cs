using MedicineTrackingSystem.Models.Response;
using System.Collections.Generic;

namespace MedicineTrackingSystem.Services.Contracts.Query
{
    public interface IMedicineQuery
    {
        MedicineResponse GetMedicine(int medicineId);
        List<MedicineResponse> GetAllMedicines();
    }
}
