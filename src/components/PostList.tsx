import { Post } from "./post/Post";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";

export const PostList = () => {
    const postsRef = collection(db, "posts");
    const [postList, setPostList] = useState(null);
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getPosts();
    return (
        <>
            <Post/>
        </>
    );
}