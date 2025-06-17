import api from './api';

export const usuariosService = {
  async getAll() {
    const response = await api.get('/usuario');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/usuario/${id}`);
    return response.data;
  },

  async create(usuario) {
    const response = await api.post('/usuario', usuario);
    return response.data;
  },

  async update(id, usuario) {
    const response = await api.patch(`/usuario/${id}`, usuario);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/usuario/${id}`);
    return response.data;
  },
}; 