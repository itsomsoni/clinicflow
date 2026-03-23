using AppointmentService.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentService.Application.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<AppointmentResponseDto>> GetAllAsync();
        Task<AppointmentResponseDto?> GetByIdAsync(int id);
        Task<IEnumerable<AppointmentResponseDto>> GetByPatientIdAsync(int patientId);
        Task<int> CreateAsync(CreateAppointmentDto dto);
        Task<bool> UpdateAsync(int id, UpdateAppointmentDto dto);
        Task<bool> CancelAsync(int id);
        Task<bool> HasConflictAsync(string doctorName, DateTime date, TimeSpan time, int? excludeId = null);
    }
}
