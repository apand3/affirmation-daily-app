import React ,{useState,useEffect} from 'react'
import useStyles from './styles'
import {TextField,Button,Typography,Paper} from '@material-ui/core'
import  FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts'
import {useSelector} from 'react-redux'
const Form = ({currentId,setCurrentId}) => {
    const dispatch=useDispatch();

const post=useSelector((state)=>currentId?state.posts.find((p)=>p._id===currentId):null);
    const[postData,setPostData]=useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
        likeCount:0
    })
    const classes=useStyles();
useEffect(()=>{

if(post)setPostData(post);
},[post])

    const handleSubmit=async (e)=>{
        
e.preventDefault();
if(currentId){
    
    dispatch(updatePost(currentId,postData))
}
else{
    if(postData.creator==''||postData.title==''||postData.message==''||postData.tags==''){
        alert('Please fill the form')
        return;
    }
dispatch(createPost(postData))
}

clear()
    }
    const clear=()=>{
        setPostData({
            creator:'',
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })
        setCurrentId(null);
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off"  noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
<Typography variant="h6">{currentId?'Editing':'Creating'} a Affirmation</Typography>
<TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator:e.target.value})}/>
<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>

<TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/>
<div className={classes.fileInput}>
<FileBase type="file" name="selectedFile" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}></FileBase>
</div>
<Button className={classes.buttonSubmit} variant="contained" size="large" type="submit"  color="primary" fullWidth>Submit</Button>
<Button  variant="contained" size="small"   color="secondary" fullWidth onClick={clear} fullWidth>Clear</Button>
             </form>

        </Paper>
    )
}

export default Form
