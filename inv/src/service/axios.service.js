import * as axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:3005/",
    timeout: 30000,
    responseType: "json"
});


const postItem = (url, data, is_strict =false) => {
    return new Promise((res, rej) => {
        http.post(url, data, getHeaders(is_strict))
        .then((response) => {
            res(response);
        }) 
        .catch((err) => {
            rej(err);
        })
    
    })
}

let headers = {};
const getHeaders = (is_strict = false) => {
    if(is_strict) {
        headers = {
            headers: {
                "authorization": localStorage.getItem('reactuser_token') 
            }
        }
    }
    return headers;
}

const getItems = (url, is_strict = false) => {
    
    return new Promise((res, rej) => {
        http.get(url, getHeaders(is_strict))
        .then((success) => {
            res(success);
        })
        .catch((err) => {
            rej(err);
        })
    });
}

const uploader = (method,url, data, file= [], is_strict=false) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        
        if(!file){
        if(file && file.length > 0){
            let image = file;
            image.map((o) => {
                formData.append("image", o, o.name);
            })
        }
        else{
            formData.append("image",file,file.name); 
        }
    }
        // console.log(this.state.data);
        for(let item in data){
            
            formData.append(item, data[item]);
        }


        xhr.onreadystatechange = function() {
            let response =null;
            if(this.readyState == 4){
                if(typeof this.response != "object"){
                    response = JSON.parse(this.response);
                }
                // console.log(response);
                if(response.status){
                    resolve(response)
                }   else {
                    reject(response)
                }
            }
        }
        console.log("url:",url)
        xhr.open(method, process.env.REACT_APP_API_URL+"/"+url);
        // Set header if required
        if(is_strict){
            let token = localStorage.getItem("reactuser_token");
            xhr.setRequestHeader("Authorization","Bearer "+token);
        }
        xhr.send(formData);
    })
}

const deleteItem = (url, is_strict =false) => {

    return new Promise((res, rej) => {
        http.delete(url, getHeaders(is_strict))
        .then((success) => {
            res(success);
        })
        .catch((err) => {
            rej(err);
        })
    });
}
export {postItem, getItems,deleteItem,uploader};
