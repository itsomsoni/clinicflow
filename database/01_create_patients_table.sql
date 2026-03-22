-- Create Database
CREATE DATABASE ClinicFlowDB;
GO

USE ClinicFlowDB;
GO

-- Create Patients Table
CREATE TABLE Patients (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender NVARCHAR(10) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME NULL
);
GO

-- Insert Sample Data
INSERT INTO Patients (FirstName, LastName, Email, Phone, DateOfBirth, Gender, Address)
VALUES 
('Om', 'Soni', 'om.soni@email.com', '987x54x1x', '1995-05-15', 'Male', 'Surat, Gujarat'),
('Priya', 'Shah', 'priya.shah@email.com', '98x654xx1x', '1998-08-20', 'Female', 'Ahmedabad, Gujarat'),
('Raj', 'Patel', 'raj.patel@email.com', '987x543xx2', '1990-03-10', 'Male', 'Vadodara, Gujarat');
GO

-- Verify
SELECT * FROM Patients;