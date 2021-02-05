using MedicineTrackingSystem.Models.Response;
using MedicineTrackingSystem.Services.Contracts;
using MedicineTrackingSystem.Services.Contracts.Query;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace MedicineTrackingSystem.Services.Implementation.Query
{
    public class MedicineQuery : IMedicineQuery
    {
        private readonly IUtilityService _utilityService;

        /// <summary>
        ///  Constructor of class to initialize required services
        /// </summary>
        /// <param name="utilityService"></param>
        public MedicineQuery(IUtilityService utilityService)
        {
            _utilityService = utilityService;
        }
        public MedicineResponse GetMedicine(int medicineId)
        {
            var medicines = _utilityService.ReadJsonFile();
            return medicines.FirstOrDefault(x => x.Id == medicineId);
        }
        public List<MedicineResponse> GetAllMedicines()
        {
            return _utilityService.ReadJsonFile();
        }
    }
}
