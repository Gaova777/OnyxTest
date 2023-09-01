import axios from "axios";
import { handleCall } from "../Utilities";

export default class BookService {
  constructor() {
    this.API_URL = `${import.meta.env.VITE_API_URL}`;
  }

  async get({ id = null } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (
          await axios.get(`${this.API_URL}/`)
        ).data;
      } else {
        return (
          await axios.get(`${this.API_URL}/`, )
        ).data;
      }
    });
  }

  async query({ id = null, title } = {}) {
    return await handleCall(async () => {
      if (id) {
        return (
          await axios.get(`${this.API_URL}/`)
        ).data;
      } else {
        return (
          await axios.get(`${this.API_URL}/?title=${title}`, )
        ).data;
      }
    });
  }

  async add({ body } = {}) {
    return await handleCall(
      async () =>
        (
          await axios.post(`${this.API_URL}/`, body)
        ).data
    );
  }

  async update({ id, body }) {
  
    return await handleCall(
      async () =>
        (
          await axios.patch(`${this.API_URL}/${id}`, body)
        ).data
    );
  }

  async delete({ id }) {
    return await handleCall(
      async () =>
        (
          await axios.delete(`${this.API_URL}/${id}`)
        ).data
    );
  }
}
