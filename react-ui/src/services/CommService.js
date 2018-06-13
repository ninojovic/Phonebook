import axios from 'axios'

//For local testing uncomment line above and comment BASE_URL declaration
//import { BASE_URL } from "../shared/constants";

const BASE_URL = "";

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