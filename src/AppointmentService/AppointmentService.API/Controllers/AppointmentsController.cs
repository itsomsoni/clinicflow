using Microsoft.AspNetCore.Mvc;
using AppointmentService.Application.DTOs;
using AppointmentService.Application.Interfaces;

namespace AppointmentService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly IAppointmentRepository _appointmentRepository;

        public AppointmentsController(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var appointments = await _appointmentRepository.GetAllAsync();
            return Ok(appointments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            if (appointment == null)
                return NotFound(new { message = $"Appointment with Id {id} not found" });
            return Ok(appointment);
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var appointments = await _appointmentRepository.GetByPatientIdAsync(patientId);
            return Ok(appointments);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAppointmentDto dto)
        {
            // Check for scheduling conflict
            var hasConflict = await _appointmentRepository.HasConflictAsync(
                dto.DoctorName, dto.AppointmentDate, dto.AppointmentTime);

            if (hasConflict)
                return Conflict(new { message = $"Dr. {dto.DoctorName} already has an appointment on {dto.AppointmentDate:dd-MM-yyyy} at {dto.AppointmentTime}" });

            var newId = await _appointmentRepository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = newId }, new { id = newId });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateAppointmentDto dto)
        {
            // Check for conflict excluding current appointment
            var hasConflict = await _appointmentRepository.HasConflictAsync(
                dto.DoctorName, dto.AppointmentDate, dto.AppointmentTime, excludeId: id);

            if (hasConflict)
                return Conflict(new { message = $"Dr. {dto.DoctorName} already has an appointment on {dto.AppointmentDate:dd-MM-yyyy} at {dto.AppointmentTime}" });

            var updated = await _appointmentRepository.UpdateAsync(id, dto);
            if (!updated)
                return NotFound(new { message = $"Appointment with Id {id} not found" });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(int id)
        {
            var cancelled = await _appointmentRepository.CancelAsync(id);
            if (!cancelled)
                return NotFound(new { message = $"Appointment with Id {id} not found" });
            return NoContent();
        }
    }
}