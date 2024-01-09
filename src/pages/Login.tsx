import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

export const Login = () => {
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        navigate("/");
    };
    return (
        <>
            <h1>LOGIN</h1>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </>
    );
}