export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateAppointmentRequest {
  patientId: number;
  patientName: string;
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

export interface UpdateAppointmentRequest {
  doctorName: string;
  specialization: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  notes?: string;
}
