using MedicineTrackingSystem.Controllers;
using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Models.Response;
using MedicineTrackingSystem.Services.Contracts;
using MedicineTrackingSystem.Services.Contracts.Commands;
using MedicineTrackingSystem.Services.Contracts.Query;
using Microsoft.AspNetCore.Mvc;
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

            _utilityService.Setup(x => x.WriteJsonFile(medicine)).Returns(true);

            var serviceResponse = _medicineCommand.Object.AddMedicine(medicine);
            Assert.IsNotNull(serviceResponse);
            Assert.Equals(serviceResponse.Status, System.Net.HttpStatusCode.OK);
        }

        [TestCase(1)]
        public void GetMedicine(int medicineId)
        {
            List<MedicineResponse> medicines = new List<MedicineResponse>();
            MedicineResponse medicine = new MedicineResponse();
            medicine.Name = "Medicine1";
            medicine.Brand = "Brand1";
            medicine.Price = Convert.ToDecimal(23.11);
            medicine.Quantity = 10;
            medicine.ExpiryDate = Convert.ToDateTime("03-02-2021");
            medicine.Notes = "Test Note";
            medicines.Add(medicine);

            _utilityService.Setup(x => x.ReadJsonFile()).Returns(medicines);

            var serviceResponse = _medicineQuery.Object.GetMedicine(medicineId);
            Assert.IsNotNull(serviceResponse);
            Assert.Equals(serviceResponse, medicine);
        }
    }
}
