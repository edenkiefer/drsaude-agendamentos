import axios from 'axios'

const token = import.meta.env.VITE_API_TOKEN

export const api = axios.create({
  baseURL: '/v1/api',
  headers: {
    'x-access-token': token,
  },
})
