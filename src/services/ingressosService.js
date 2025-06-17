import api from './api';

export const ingressosService = {
  async getAll() {
    const response = await api.get('/ingressos');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/ingressos/${id}`);
    return response.data;
  },

  async create(ingresso) {
    const response = await api.post('/ingressos', ingresso);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/ingressos/${id}`);
    return response.data;
  },
}; 