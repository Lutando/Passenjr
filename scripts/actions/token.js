import axios from 'axios';

export function fetchToken() {
    return function(dispatch) {
        axios.get("/api/token")
        .then((response) =>  {
            console.log(response);
            //dispatch()    
        })
        .catch((err) => {
            console.log(err);
        })
        console.log("action");
    }
}