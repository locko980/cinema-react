import api from './api';

export const sessoesService = {
  async getAll() {
    const response = await api.get('/sessoes');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/sessoes/${id}`);
    return response.data;
  },

  async create(sessao) {
    const response = await api.post('/sessoes', sessao);
    return response.data;
  },

  async update(id, sessao) {
    const response = await api.patch(`/sessoes/${id}`, sessao);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/sessoes/${id}`);
    return response.data;
  },
}; 