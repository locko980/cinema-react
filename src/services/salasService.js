import api from './api';

export const salasService = {
  async getAll() {
    try {
      const response = await api.get('/salas');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      console.log('Buscando sala por ID:', id);
      const response = await api.get(`/salas/${id}`);
      console.log('Resposta da API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sala por ID:', error);
      throw error;
    }
  },

  async create(sala) {
    try {
      const response = await api.post('/salas', sala);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar sala:', error);
      throw error;
    }
  },

  async update(id, sala) {
    try {
      console.log('Atualizando sala:', { id, sala });
      const response = await api.patch(`/salas/${id}`, sala);
      console.log('Resposta da atualização:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar sala:', error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/salas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar sala:', error);
      throw error;
    }
  },
}; 