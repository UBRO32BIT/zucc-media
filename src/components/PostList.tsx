import { Post } from "./post/Post";
import { db } from "../config/firebase";
import { getDocs, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { Stack } from "@mui/joy";

export const PostList = () => {
    const postsRef = collection(db, "posts");
    const [postList, setPostList] = useState<Post[] | null>(null);
    const getPosts = async () => {
        try {
            const getPostsQuery = query(postsRef, orderBy("createdAt", "desc"), limit(5));
            // const data = await getDocs(queryStatement);
            onSnapshot(getPostsQuery, (data) => {
                setPostList(
                    data.docs.map((doc) => ({...doc.data(), id: doc.id})) as Post[]
                );
            })
        }
        catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Cannot get posts: ${error.message}`, {  variant: "error" });
        }
    }
    useEffect(() => {
        getPosts(); // Move getPosts into useEffect to avoid potential issues
    }, []); // Empty dependency array to ensure it runs only once
    return (
        <Stack spacing={2}>
            {postList?.map((post) => (
                <Post key={post.id} {...post}/>
            ))}
        </Stack>
    );
}