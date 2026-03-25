import type {
  Appointment,
  CreateAppointmentRequest,
  UpdateAppointmentRequest,
} from "./../type/appointment";
import axios from "axios";

const BASE_URL = "https://localhost:7224/api/appointments";

export const appointmentAPI = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await axios.get<Appointment[]>(BASE_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Appointment> => {
    const response = await axios.get<Appointment>(`${BASE_URL}/${id}`);
    return response.data;
  },

  getByPatientId: async (patientId: number): Promise<Appointment[]> => {
    const response = await axios.get<Appointment[]>(
      `${BASE_URL}/patient/${patientId}`,
    );
    return response.data;
  },

  create: async (data: CreateAppointmentRequest): Promise<Appointment> => {
    const response = await axios.post<Appointment>(BASE_URL, data);
    return response.data;
  },

  update: async (
    id: number,
    data: UpdateAppointmentRequest,
  ): Promise<Appointment> => {
    const response = await axios.put<Appointment>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  cancel: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
