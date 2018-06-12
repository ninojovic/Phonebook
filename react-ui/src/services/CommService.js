import axios from 'axios'

import { BASE_URL } from "../shared/constants";

export default class CommService {
    static getContacts = () => {
        return axios.get(`${BASE_URL}/contacts`)
            .then(response => response.data)
    }

    static deleteContact = (id) => {
        return axios.delete(`${BASE_URL}/remove/${id}`)
    }

    static addContact = (contact) => {
        return axios.post(`${BASE_URL}/new`, contact)
    }
}