using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;
using MedicineTrackingSystem.Services.Contracts;
using MedicineTrackingSystem.Services.Contracts.Commands;
using System;

namespace MedicineTrackingSystem.Services.Implementation.Commands
{
    public class MedicineCommand : IMedicineCommand
    {
        private static int MedicineId = 1;
        private readonly IUtilityService _utilityService;

        /// <summary>
        ///  Constructor of class to initialize required services
        /// </summary>
        /// <param name="utilityService"></param>
        public MedicineCommand(IUtilityService utilityService)
        {
            _utilityService = utilityService;
        }

        public BaseResponse AddMedicine(MedicineRequest medicine)
        {
            var result = ValidateMedicine(medicine);
            if (result.Status != System.Net.HttpStatusCode.OK)
                return result;

            medicine.Id = MedicineId++;
            bool response = _utilityService.WriteJsonFile(medicine);
            if (response)
                return new BaseResponse { Id = MedicineId, Warning = result.Warning, Status = System.Net.HttpStatusCode.OK };

            return new BaseResponse { Status = System.Net.HttpStatusCode.InternalServerError };
        }

        private BaseResponse ValidateMedicine(MedicineRequest medicine)
        {
            double validity = (medicine.ExpiryDate - DateTime.UtcNow).TotalDays;
            if (validity <= 15)
                return new BaseResponse { Error = "Medicine with Expiry date less than 15 days cannot be added in the stock", Status = System.Net.HttpStatusCode.BadRequest };
            if (validity <= 30)
                return new BaseResponse { Warning = "Medicine is going to expire soon", Status = System.Net.HttpStatusCode.OK };

            return new BaseResponse { Status = System.Net.HttpStatusCode.OK };
        }
    }
}
