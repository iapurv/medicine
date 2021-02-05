using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;
using System.Collections.Generic;

namespace MedicineTrackingSystem.Services.Contracts
{
    public interface IUtilityService
    {
        bool WriteJsonFile(MedicineRequest medicine);
        List<MedicineResponse> ReadJsonFile();
    }
}
