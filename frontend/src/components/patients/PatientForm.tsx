import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Grid, MenuItem, Alert
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { UpdatePatientRequest, CreatePatientRequest, Patient } from '../../type/patient';
import { patientAPI } from '../../api/patientAPI';

interface PatientFormProps {
    open: boolean;
    patient: Patient | null;
    onClose: () => void;
    OnSuccess: () => void;
}

const genderOptions = ['Male', 'Female', 'Other'];

const emptyForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: ''
};

export default function PatientForm({ open, patient, onClose, OnSuccess }: PatientFormProps) {
    const isEditMode = patient !== null;

    const [form, setForm] = useState<CreatePatientRequest | UpdatePatientRequest>(emptyForm);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (patient) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setForm({
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email,
                phone: patient.phone,
                dateOfBirth: patient.dateOfBirth.split('T')[0], // Format for date input
                gender: patient.gender,
                address: patient.address
            });
        }
        else {
            setForm(emptyForm);
        }
    }, [open, patient]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        // setForm(emptyForm);
        setLoading(false);
        setError(null);
        onClose();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);
            if (isEditMode) {
                await patientAPI.update(patient.id, form as UpdatePatientRequest);
            } else {
                await patientAPI.create(form as CreatePatientRequest);
            }
            OnSuccess();
            handleClose();
        }
        catch (ex) {
            setLoading(false);
            setError(`Failed to ${isEditMode ? 'update' : 'create'} patient: ` + (ex instanceof Error ? ex.message : String(ex)));
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {isEditMode ? 'Edit Patient' : 'Add New Patient'}
            </DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ xs: 12 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            multiline
                            rows={2}
                        />
                    </Grid>
                    <Grid sx={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            select
                            label="Gender"
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                        >
                            {genderOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : (isEditMode ? 'Update Patient' : 'Create Patient')}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

