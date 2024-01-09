import { Link } from "react-router-dom"
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
export const Navbar = () => {
    const [user] = useAuthState(auth);

    const logout = async () => {
        await signOut(auth);
    }

    return (
    <div>
        <div>
            <Link to="/">Home</Link>
            {!user && <Link to="/login">Login</Link>}
        </div>
        {user?.displayName}
        {user && <button onClick={logout}>Logout</button>}
    </div>
    );
}