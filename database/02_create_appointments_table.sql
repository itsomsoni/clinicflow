USE ClinicFlowDB;
GO

-- Create Appointments Table
CREATE TABLE Appointments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PatientId INT NOT NULL,
    PatientName NVARCHAR(100) NOT NULL,
    DoctorName NVARCHAR(100) NOT NULL,
    Specialization NVARCHAR(100) NOT NULL,
    AppointmentDate DATE NOT NULL,
    AppointmentTime TIME NOT NULL,
    Status NVARCHAR(20) NOT NULL DEFAULT 'Scheduled',
    Notes NVARCHAR(500) NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME NULL,
    CONSTRAINT FK_Appointments_Patients 
        FOREIGN KEY (PatientId) REFERENCES Patients(Id)
);
GO

-- Insert Sample Data
INSERT INTO Appointments 
    (PatientId, PatientName, DoctorName, Specialization, AppointmentDate, AppointmentTime, Status, Notes)
VALUES
('1', 'Om Soni', 'Dr. Sharma', 'Cardiology', '2026-03-25', '10:00:00', 'Scheduled', 'Regular checkup'),
('2', 'Priya Shah', 'Dr. Mehta', 'Neurology', '2026-03-25', '11:00:00', 'Scheduled', 'Follow up'),
('3', 'Raj Patel', 'Dr. Sharma', 'Cardiology', '2026-03-25', '12:00:00', 'Scheduled', 'First visit');
GO

-- Verify
SELECT * FROM Appointments;