import axios from "axios";

// axios.defaults.baseURL = "http://localhost:6000/";
axios.defaults.headers.get['Content-Type'] = "application/json";
axios.defaults.headers.post['Content-Type'] = "application/json";

export default axios;