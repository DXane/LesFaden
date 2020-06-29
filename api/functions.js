const axios = require ("axios");

const PORT=8000;

const functions = {
    fetchThread: (id)=>{ 
        let url="http://localhost:8000/api/faden/get/%id%".replace("%id%",""+id);
       return axios.get(url);
    },
    fetchUser: (id)=>{
        let url="http://localhost:8000/api/benutzer/get/%id%".replace("%id%",""+id);
       return axios.get(url);
    },
    createUser: (id)=>{
        let url="http://localhost:8000/api/benutzer/new";
       return axios.post(url,{
           name:"karl2",
           passwort:"test2",
           datum:"2020-06-23T14:52:24.912Z"
       });
    }
}

module.exports=functions;