using Dapper;
using Microsoft.Data.SqlClient;
using PatientService.Application.DTOs;
using PatientService.Application.Interfaces;

namespace PatientService.Infrastructure.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly string _connectionString;
        public PatientRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        private SqlConnection CreateConnection() => new SqlConnection(_connectionString);
        public async Task<IEnumerable<PatientResponseDto>> GetAllAsync()
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Patients WHERE IsActive = 1";
            return await connection.QueryAsync<PatientResponseDto>(sql);
        }

        public async Task<PatientResponseDto?> GetByIdAsync(int id)
        {
            using var connection = CreateConnection();
            var sql = "SELECT * FROM Patients WHERE Id = @Id AND IsActive = 1";
            return await connection.QueryFirstOrDefaultAsync<PatientResponseDto>(sql, new { Id = id });
        }
        public async Task<int> CreateAsync(CreatePatientDto dto)
        {
            using var connection = CreateConnection();
            var sql = @"
                INSERT INTO Patients (FirstName, LastName, Email, Phone, DateOfBirth, Gender, Address, IsActive, CreatedAt)
                VALUES (@FirstName, @LastName, @Email, @Phone, @DateOfBirth, @Gender, @Address, 1, @CreatedAt);
                SELECT CAST(SCOPE_IDENTITY() AS int);";

            return await connection.ExecuteScalarAsync<int>(sql, new
            {
                dto.FirstName,
                dto.LastName,
                dto.Email,
                dto.Phone,
                dto.DateOfBirth,
                dto.Gender,
                dto.Address,
                CreatedAt = DateTime.UtcNow
            });
        }
        public async Task<bool> UpdateAsync(int id, UpdatePatientDto dto)
        {
            using var connection = CreateConnection();
            var sql = @"
                UPDATE Patients 
                SET FirstName = @FirstName, LastName = @LastName, Email = @Email,
                    Phone = @Phone, DateOfBirth = @DateOfBirth, Gender = @Gender,
                    Address = @Address, UpdatedAt = @UpdatedAt
                WHERE Id = @Id AND IsActive = 1";

            var rows = await connection.ExecuteAsync(sql, new
            {
                dto.FirstName,
                dto.LastName,
                dto.Email,
                dto.Phone,
                dto.DateOfBirth,
                dto.Gender,
                dto.Address,
                UpdatedAt = DateTime.UtcNow,
                Id = id
            });

            return rows > 0;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = CreateConnection();
            var sql = "UPDATE Patients SET IsActive = 0 WHERE Id = @Id";
            var rows = await connection.ExecuteAsync(sql, new { Id = id });
            return rows > 0;
        }

    }
}
