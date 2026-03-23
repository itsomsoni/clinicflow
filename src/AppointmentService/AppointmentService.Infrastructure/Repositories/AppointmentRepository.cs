using Dapper;
using Microsoft.Data.SqlClient;
using AppointmentService.Application.DTOs;
using AppointmentService.Application.Interfaces;

namespace AppointmentService.Infrastructure.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly string _connectionString;

        public AppointmentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        private SqlConnection CreateConnection()
            => new SqlConnection(_connectionString);

        public async Task<IEnumerable<AppointmentResponseDto>> GetAllAsync()
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Appointments WHERE IsActive = 1";
            return await connection.QueryAsync<AppointmentResponseDto>(sql);
        }

        public async Task<AppointmentResponseDto?> GetByIdAsync(int id)
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Appointments WHERE Id = @Id AND IsActive = 1";
            return await connection.QueryFirstOrDefaultAsync<AppointmentResponseDto>(sql, new { Id = id });
        }

        public async Task<IEnumerable<AppointmentResponseDto>> GetByPatientIdAsync(int patientId)
        {
            using var connection = CreateConnection();
            var sql = @"SELECT * FROM Appointments 
                        WHERE PatientId = @PatientId AND IsActive = 1
                        ORDER BY AppointmentDate, AppointmentTime";
            return await connection.QueryAsync<AppointmentResponseDto>(sql, new { PatientId = patientId });
        }

        public async Task<int> CreateAsync(CreateAppointmentDto dto)
        {
            using var connection = CreateConnection();
            var sql = @"
                INSERT INTO Appointments 
                    (PatientId, PatientName, DoctorName, Specialization, AppointmentDate, AppointmentTime, Status, Notes, IsActive, CreatedAt)
                VALUES 
                    (@PatientId, @PatientName, @DoctorName, @Specialization, @AppointmentDate, @AppointmentTime, 'Scheduled', @Notes, 1, @CreatedAt);
                SELECT CAST(SCOPE_IDENTITY() AS int);";

            return await connection.ExecuteScalarAsync<int>(sql, new
            {
                dto.PatientId,
                dto.PatientName,
                dto.DoctorName,
                dto.Specialization,
                dto.AppointmentDate,
                dto.AppointmentTime,
                dto.Notes,
                CreatedAt = DateTime.UtcNow
            });
        }

        public async Task<bool> UpdateAsync(int id, UpdateAppointmentDto dto)
        {
            using var connection = CreateConnection();
            var sql = @"
                UPDATE Appointments
                SET DoctorName = @DoctorName, Specialization = @Specialization,
                    AppointmentDate = @AppointmentDate, AppointmentTime = @AppointmentTime,
                    Status = @Status, Notes = @Notes, UpdatedAt = @UpdatedAt
                WHERE Id = @Id AND IsActive = 1";

            var rows = await connection.ExecuteAsync(sql, new
            {
                dto.DoctorName,
                dto.Specialization,
                dto.AppointmentDate,
                dto.AppointmentTime,
                dto.Status,
                dto.Notes,
                UpdatedAt = DateTime.UtcNow,
                Id = id
            });

            return rows > 0;
        }

        public async Task<bool> CancelAsync(int id)
        {
            using var connection = CreateConnection();
            var sql = @"UPDATE Appointments 
                        SET Status = 'Cancelled', UpdatedAt = @UpdatedAt 
                        WHERE Id = @Id AND IsActive = 1";
            var rows = await connection.ExecuteAsync(sql, new
            {
                Id = id,
                UpdatedAt = DateTime.UtcNow
            });
            return rows > 0;
        }

        public async Task<bool> HasConflictAsync(string doctorName, DateTime date, TimeSpan time, int? excludeId = null)
        {
            using var connection = CreateConnection();
            var sql = @"SELECT COUNT(1) FROM Appointments
                        WHERE DoctorName = @DoctorName
                        AND AppointmentDate = @Date
                        AND AppointmentTime = @Time
                        AND Status != 'Cancelled'
                        AND IsActive = 1
                        AND (@ExcludeId IS NULL OR Id != @ExcludeId)";

            var count = await connection.ExecuteScalarAsync<int>(sql, new
            {
                DoctorName = doctorName,
                Date = date,
                Time = time,
                ExcludeId = excludeId
            });

            return count > 0;
        }
    }
}