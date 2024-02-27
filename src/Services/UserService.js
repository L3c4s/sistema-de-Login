import axios from 'axios';

export default class UserServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOGIN + '/api'
    })
  }

  async login(dados) {
    try {
      const { data } = await this.axios.post('/login', dados);
  
      if (data) {
        localStorage.setItem("nome", data.user.nome);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("token", data.token.token);
  
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Endpoint não encontrado. Verifique o caminho da API.');
      } else {
        console.error('Erro durante o login:', error.message);
      }
  
      throw error; 
    }
  
    return false;
  }
  

  async cadastrar (dados) {
    return this.axios.post('/user', dados)
  }

  usuarioAutenticado () {
    return localStorage.getItem("token") != undefined ? true : false
   
  }


  async logout () {
    localStorage.removeItem("token")
    localStorage.removeItem("nome")
    localStorage.removeItem("email")
  }
}