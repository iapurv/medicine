using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;

namespace MedicineTrackingSystem.Services.Contracts.Commands
{
    public interface IMedicineCommand
    {
        BaseResponse AddMedicine(MedicineRequest medicine);
    }
}
