using System.Net;

namespace MedicineTrackingSystem.Models.Response
{
    public class BaseResponse
    {
        public int Id { get; set; }
        public string Error { get; set; }
        public string Warning { get; set; }
        public HttpStatusCode Status { get; set; }
    }
}
