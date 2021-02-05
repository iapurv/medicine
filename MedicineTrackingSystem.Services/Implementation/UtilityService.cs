using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;
using MedicineTrackingSystem.Services.Contracts;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace MedicineTrackingSystem.Services.Implementation
{
    public class UtilityService : IUtilityService
    {
        public bool WriteJsonFile(MedicineRequest medicine)
        {
            List<MedicineRequest> existingMedicines = null;
            string json = string.Empty;
            using (StreamReader r = new StreamReader(@"MedicineStock.json"))
            {
                json = r.ReadToEnd();
                existingMedicines = JsonConvert.DeserializeObject<List<MedicineRequest>>(json);
                if (existingMedicines == null)
                    existingMedicines = new List<MedicineRequest>();
            }
            existingMedicines.Add(medicine);
            json = JsonConvert.SerializeObject(existingMedicines, Formatting.Indented);
            File.WriteAllText(@"MedicineStock.json", json);
            return true;
        }

        public List<MedicineResponse> ReadJsonFile()
        {
            List<MedicineResponse> medicines = new List<MedicineResponse>();
            using (StreamReader r = new StreamReader(@"MedicineStock.json"))
            {
                string json = r.ReadToEnd();
                medicines = JsonConvert.DeserializeObject<List<MedicineResponse>>(json);
            }
            return medicines;
        }
    }
}
