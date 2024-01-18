import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreatePost } from "../../components/create-post/CreatePost";
import { PostList } from "../../components/PostList";
export const Main = () => {
    const [user] = useAuthState(auth);
    return (
        <>
            {user ? (
                <>
                    <CreatePost/>
                    <PostList/>
                </>
            ) : (
                <div>
                    <h1>HELLO</h1>
                    <p>Please login to continue</p>
                </div>
            )}
            
        </>
    );
}