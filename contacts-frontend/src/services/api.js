import axios from "axios";

const API = axios.create({
    //baseURL: "http://localhost:8080"
    baseURL: "https://contact-tdtm.onrender.com"
});

export default API;