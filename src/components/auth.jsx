import { useState } from "react"
import {auth,googleProvider} from "../config/Firebase"
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from "firebase/auth"
export const Auth =()=>{
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    
    

    const signIn = async()=>{
        try{
        await createUserWithEmailAndPassword(auth,Email,Password);
        } catch(err){
            console.error(err)
        }




    };

    const SignInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);

        }
        catch(err){
            console.error(err)
        }


    }
    const logout=async()=>{
        try{
            await signOut(auth);

        }
        catch(err){
            console.error(err)
        }


    }


    return (
        <div>
            <input placeholder="Email..."
            onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password..."
            type="password"
            onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign in</button>

            <button onClick={SignInWithGoogle}>Sign in with Google</button>
            <button onClick={logout}>sign out</button>
        </div>
    );

};