using MedicineTrackingSystem.Controllers;
using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;
using MedicineTrackingSystem.Services.Contracts;
using MedicineTrackingSystem.Services.Contracts.Commands;
using MedicineTrackingSystem.Services.Contracts.Query;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace MedicineTrackingSystem.Test
{
    [TestFixture]
    public class Medicines
    {
        private Mock<IMedicineQuery> _medicineQuery;
        private Mock<IMedicineCommand> _medicineCommand;
        private Mock<IUtilityService> _utilityService;

        [OneTimeSetUp]
        public void SetUp()
        {
            _medicineQuery = new Mock<IMedicineQuery>();
            _medicineCommand = new Mock<IMedicineCommand>();
            _utilityService = new Mock<IUtilityService>();
        }

        [TestCase("Medicine1", "Brand1", 23.11, 10, "03-02-2021", "Test Note")]
        public void AddMedicine(string name, string brand, int price, int quantity, string expiry, string notes)
        {
            MedicineRequest medicine = new MedicineRequest();
            medicine.Name = name;
            medicine.Brand = brand;
            medicine.Price = Convert.ToDecimal(price);
            medicine.Quantity = quantity;
            medicine.ExpiryDate = Convert.ToDateTime(expiry);
            medicine.Notes = notes;

            MedicineController controller = new MedicineController(_medicineQuery.Object, _medicineCommand.Object);
            _medicineCommand.Setup(x => x.AddMedicine(medicine)).Returns(new BaseResponse());
            _utilityService.Setup(x => x.WriteJsonFile(medicine)).Returns(true);

            controller.AddMedicine(medicine);
        }

        [TestCase(1)]
        public void GetMedicine(int medicineId)
        {
            MedicineController controller = new MedicineController(_medicineQuery.Object, _medicineCommand.Object);
            _medicineQuery.Setup(x => x.GetMedicine(medicineId)).Returns(new MedicineResponse());
            _utilityService.Setup(x => x.ReadJsonFile()).Returns(new List<MedicineResponse>());

            controller.GetMedicine(medicineId);
        }
    }
}
