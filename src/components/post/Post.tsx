import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Like {
    userId: string,
    postId: string
}

export interface Post {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string,
}

export const Post = (props: Post) => {
    const { id, userId, title, username, description } = props;
    const [user] = useAuthState(auth);
    const [likesAmount, setLikesAmount] = useState<number | null>();
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikesAmount(data.docs.length);
    }
    const addLike = async () => {
        await addDoc(likesRef, {
            userId: userId,
            postId: id,
        })
    }

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {username}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {description}
                </Typography>
                <button onClick={addLike}>Zucc 👍</button>
                <p>Likes: {likesAmount}</p>
            </Card>
            
        </Box>
    );
}