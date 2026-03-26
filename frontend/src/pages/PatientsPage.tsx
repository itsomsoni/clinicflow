import { Add, Delete, Edit } from "@mui/icons-material";
import { Alert, Box, Button, Chip, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { type Patient } from "../type/patient";
import { patientAPI } from "../api/patientAPI";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await patientAPI.getAll();
      setPatients(data);
    }
    catch (ex) {
      setError('Failed to fetch patients: ' + (ex instanceof Error ? ex.message : String(ex)));
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientAPI.remove(id);
        setPatients(prev => prev.filter(p => p.id !== id));
      }
      catch (ex) {
        setError('Failed to delete patient: ' + (ex instanceof Error ? ex.message : String(ex)));
      }
    }
  };

  if (loading) {
    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <CircularProgress></CircularProgress>
    </Box>
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
        <Typography variant="h4" fontWeight={'bold'} mb={3}>Patients</Typography>
        <Button variant="contained" startIcon={<Add />}>
          Add Patient
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Chip
                      label={patient.isActive ? 'Active' : 'Inactive'}
                      color={patient.isActive ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small">
                      <Edit />
                    </IconButton>
                    <IconButton color="error" size="small"
                      onClick={() => handleDelete(patient.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
