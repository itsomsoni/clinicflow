import axios from "axios";
import type {
  CreatePatientRequest,
  Patient,
  UpdatePatientRequest,
} from "../type/patient";

const BASE_URL = "https://localhost:7213/api/patients";

export const patientAPI = {
  getAll: async (): Promise<Patient[]> => {
    const response = await axios.get<Patient[]>(BASE_URL);
    return response.data;
  },

  getById: async (id: number): Promise<Patient> => {
    const response = await axios.get<Patient>(`${BASE_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreatePatientRequest): Promise<number> => {
    const response = await axios.post<{ id: number }>(BASE_URL, data);
    return response.data.id;
  },

  update: async (id: number, data: UpdatePatientRequest): Promise<void> => {
    await axios.put(`${BASE_URL}/${id}`, data);
  },

  remove: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
