import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const LOGIN = 'login';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=skumar568';

export function doLogin(values){
    console.log('in doLogin action for ',values);
    const authPromise = new Promise((resolve, reject) => {
        if(values.password === 'hello123'){
            resolve({isAuthenticated:true});
        }else{
            reject({isAuthenticated:false});            
        }
    });

    return {
        type: LOGIN,
        payload: authPromise
    };
}

export function fetchPosts(values){
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`, values);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export function createPost(values, callback){
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,values)
            .then(()=> callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id, callback){
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
            .then(()=> callback());

    return {
        type: DELETE_POST,
        payload: id
    };
}