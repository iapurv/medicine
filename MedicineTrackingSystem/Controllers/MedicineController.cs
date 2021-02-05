using MedicineTrackingSystem.Models.Request;
using MedicineTrackingSystem.Services.Contracts.Commands;
using MedicineTrackingSystem.Services.Contracts.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicineTrackingSystem.Controllers
{
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private readonly IMedicineQuery _medicineQuery;
        private readonly IMedicineCommand _medicineCommand;

        /// <summary>
        ///  Constructor of controller to initialize required services
        /// </summary>
        /// <param name="medicineQuery"></param>
        /// <param name="medicineCommand"></param>
        public MedicineController(IMedicineQuery medicineQuery, IMedicineCommand medicineCommand)
        {
            _medicineQuery = medicineQuery;
            _medicineCommand = medicineCommand;
        }

        /// <summary>
        /// Add a new medicine into the stock
        /// </summary>
        /// <param name="medicine"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost]
        [Route("api/medicine/add")]
        public IActionResult AddMedicine(MedicineRequest medicine)
        {
            var response = _medicineCommand.AddMedicine(medicine);
            if (response.Status != System.Net.HttpStatusCode.OK)
                return BadRequest(response);
            return Ok(response);
        }

        /// <summary>
        /// Get medicine details by id
        /// </summary>
        /// <param name="medicineId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/medicine/{medicineId}")]
        public IActionResult GetMedicine(int medicineId)
        {
            var response = _medicineQuery.GetMedicine(medicineId);
            if (response == null)
                return NotFound(response);
            return Ok(response);
        }

        /// <summary>
        /// Get all medicine details by abailable in stock
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/all-medicines")]
        public IActionResult GetAllMedicines()
        {
            var response = _medicineQuery.GetAllMedicines();
            return Ok(response);
        }
    }
}
