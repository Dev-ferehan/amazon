import React,{useState,useContext} from 'react'
import Layout from '../../Components/Layout/Layout'
import styles from './signup.module.css'
import { auth } from '../../Utility/firebase';
import {Type} from '../../Utility/action.type'
import {ClipLoader} from 'react-spinners'

import {signInWithEmailAndPassword,
  createUserWithEmailAndPassword} from 'firebase/auth';
import {DataContext} from '../../Components/DataProvider/DataContext'
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState({signIn:false,signup:false});
  const [user,dispatch]=useContext(DataContext)
  console.log(user);
  const navigate=useNavigate();
  const authHandler=async (e)=>{
    e.preventDefault();
if(e.target.name === 'signin'){
  setLoading({signIn:true})
signInWithEmailAndPassword(auth,email,password).then((userifo)=>{ 
  dispatch({
    type:Type.SET_USER,
    user:userifo.user
  })
  setLoading({signIn:false}) 
  navigate('/')
}
).catch((err)=>{
  setLoading({signIn:false}) 
  setError(err.message)
});
}else{
  setLoading({signup:true})
createUserWithEmailAndPassword(auth,email,password).then((userinfo)=>{

  dispatch({
    type:Type.SET_USER,
    user:userinfo.user
  })
  navigate('/')

  setLoading({signup:false})

}).catch((err)=>{ 
   setError(err.message);
  setLoading({signup:false})

})
}
  }
  return (
    <div>
   <Layout>

    <div className={styles.loginContainer}>
<Link to='/'>
<img
        className={styles.loginLogo}
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
      />
</Link>

      <div className={styles.loginFormBox}>
        <h1>Sign In</h1>

        <form>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email"  />

          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" />

          <button name='signin' type="submit" onClick={authHandler} className={styles.signInButton}>
            
            
            {loading.signIn ? ( <ClipLoader size={14} />):("Sign In")}
              
            
          </button>
        </form>

        <p className={styles.termsText}>
          By signing-in you agree to the <strong>AMAZON FAKE CLONE</strong> Conditions of Use & Sale. 
          Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={authHandler} name='signup' className={styles.createAccountButton}>
        {    loading.signup?(<ClipLoader size={14}/>) :

        ( " Create your Amazon Account")}
        </button>
        {
          <small style={{paddingTop:'5px',color:'red'}}>{error}</small>
        }
      </div>
    </div>



   </Layout>
    </div>
  )
}

export default Signup

