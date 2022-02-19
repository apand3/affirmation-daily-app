import * as api from '../api';
import {FETCHALL,CREATE,DELETE,UPDATE,LIKE} from '../constants/actionTypes'
//Actions Creators

export const getPosts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
  
      dispatch({ type: FETCHALL, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
export const createPost=(post)=>async(dispatch)=>{
    try{
const {data}=await api.createPost(post)
dispatch({type:CREATE,payload:data});
    }
    catch(err){

    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
  try{
const {data}=await api.updatePost(id,post)
dispatch({type:UPDATE,payload:data});
  }
  catch(err){
console.log(err.message)
  }
}
export const deletePost=(id)=>async(dispatch)=>{
  try{
  await api.deletePost(id)
dispatch({type:DELETE,payload:id});
  }
  catch(err){
console.log(err)
  }
}
export const likePost=(id)=>async(dispatch)=>{
  try{
  const {data}=await api.likePost(id)

dispatch({type:LIKE,payload:data});
  }
  catch(err){
console.log(err)
  }
}
