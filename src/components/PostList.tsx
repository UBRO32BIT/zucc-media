import { Post } from "./post/Post";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export const PostList = () => {
    const postsRef = collection(db, "posts");
    const [postList, setPostList] = useState<Post[] | null>(null);
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostList(
            data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]
        );
    }
    useEffect(() => {
        getPosts(); // Move getPosts into useEffect to avoid potential issues
    }, []); // Empty dependency array to ensure it runs only once
    return (
        <>
            {postList?.map((post) => (
                <Post key={post.id} {...post}/>
            ))}
        </>
    );
}