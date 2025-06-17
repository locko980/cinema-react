import api from './api';

const removeExtraFields = (filme) => {
  const { sessoes, criadoEm, atualizadoEm, ...filmeData } = filme;
  return filmeData;
};

export const filmesService = {
  async getAll() {
    const response = await api.get('/filmes');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/filmes/${id}`);
    return response.data;
  },

  async create(filme) {
    const filmeData = removeExtraFields(filme);
    const response = await api.post('/filmes', filmeData);
    return response.data;
  },

  async update(id, filme) {
    const filmeData = removeExtraFields(filme);
    const response = await api.patch(`/filmes/${id}`, filmeData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/filmes/${id}`);
    return response.data;
  },
}; 