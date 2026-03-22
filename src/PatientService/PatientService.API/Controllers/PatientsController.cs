using Microsoft.AspNetCore.Mvc;
using PatientService.Application.DTOs;
using PatientService.Application.Interfaces;

namespace PatientService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientsController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _patientRepository.GetAllAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            if (patient == null)
                return NotFound(new { message = $"Patient with Id {id} not found" });
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePatientDto dto)
        {
            var newId = await _patientRepository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = newId }, new { id = newId });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdatePatientDto dto)
        {
            var updated = await _patientRepository.UpdateAsync(id, dto);
            if (!updated)
                return NotFound(new { message = $"Patient with Id {id} not found" });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _patientRepository.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = $"Patient with Id {id} not found" });
            return NoContent();
        }
    }
}