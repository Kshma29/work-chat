import React, { useState } from 'react'
import { Col, Container, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css'
import {Link, useNavigate} from 'react-router-dom';
import './Signup.css';
import pfp from '../assets/pfp.jpg'
import {useSignupUserMutation} from '../services/appApi';



function Signup() {
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [name, setName]=useState("");
    const [signupUser, {isLoading, error}]=useSignupUserMutation()
    const navigate=useNavigate();


    const [image, setImage]=useState(null);
    const [uploadingImg, setUploadingImg]=useState(false);
    const [imagePreview, setImagePreview]=useState(null);
    
    function validateImg(e){
        const file=e.target.files[0];
        if(file.size> 1048576){
            return alert("File size should not be greater than 1mb.")
        }else{
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }
    
    async function uploadImage(){
        const data=new FormData();
        data.append('file', image);
        data.append('upload_preset', 'myapp29');
        try{
            setUploadingImg(true);
            let res=await fetch('https://api.cloudinary.com/v1_1/dn7dxwumy/image/upload', {
                method: 'post',
                body: data
            });
            const urlData=await res.json();
            setUploadingImg(false);
            return urlData.url;
        }catch(error){
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e){
        e.preventDefault();
        if(!image)return alert('Please upload your profile picture');
        const url=await uploadImage(image);
        console.log(url);

        signupUser({name, email, password, picture: url}).then(({data})=>{
            if(data){
                console.log(data);
                navigate('/chat');
            }
        })
    }
   
    return (
        <Container>
            <Row>
                <Col md={15} class="column">
                    <Form class="form"  style={{width:"80%", maxWidth:600}} onSubmit={handleSignup}> 
                    <h1 className='text-center'>Register your Account</h1>
                    <div className='signup-profile-pic__container'>
                        <img src={imagePreview || pfp} className='signup-profile-pic'/>
                        <label htmlFor="image-upload" className='image-upload-label'>
                            <i className="fas fa-plus-circle add-picture-icon"></i>
                        </label>
                        <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg}></input>
                    </div>
                    {error && <p className='alert alert-danger'>{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Your Name" onChange={(e)=> setName(e.target.value)} value={name}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadingImg || isLoading? 'Signing you up...': "Signup"}
                        </Button>
                        <div className='py-4'>
                            <p className='text-center'>
                                Already have an account?<Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
}

export default Signup;
