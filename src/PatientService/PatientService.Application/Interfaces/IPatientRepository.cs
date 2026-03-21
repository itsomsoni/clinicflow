using PatientService.Application.DTOs;
using PatientService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PatientService.Application.Interfaces
{
    public interface IPatientRepository
    {
        Task<IEnumerable<PatientResponseDto>> GetAllAsync();
        Task<PatientResponseDto?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreatePatientDto dto);
        Task<bool> UpdateAsync(int id, UpdatePatientDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
