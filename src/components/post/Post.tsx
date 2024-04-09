import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Dropdown, IconButton, Menu, MenuButton, MenuItem, Modal, ModalDialog, Typography } from '@mui/joy';
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Avatar } from '@mui/joy';
import DateConverter from '../../utils/DateConverter';

interface Like {
    userId: string,
    postId: string
}

export interface Post {
    id: string,
    userId: string,
    userProfileImage: string,
    title: string,
    username: string,
    description: string,
    createdAt: Timestamp,
}

export const Post = (props: Post) => {
    const { id, userId, title, username, description, createdAt } = props;
    const [user] = useAuthState(auth);
    const [likesAmount, setLikesAmount] = useState<number | null>();
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const likesRef = collection(db, "likes");
    //const userRef = collection(db, "users");
    const likesDoc = query(likesRef, where("postId", "==", id));
    //const userDoc = query(userRef, where("userId", "==", userId));

    const getUserProfilePicture = async () => {

    }
    const getLikes = () => {
        // const data = await getDocs(likesDoc);
        // setLikesAmount(data.docs.length);
        onSnapshot(likesDoc, (data) => {
            setLikesAmount(data.docs.length);
        })
    }
    const addLike = async () => {
        try {
            await addDoc(likesRef, {
                userId: user?.uid,
                postId: id,
            })
        }
        catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Request to server failed: ${error.message}`, {  variant: "error" });
        }
    }
    const deletePost = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'posts', id))
        }
        catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Request to server failed: ${error.message}`, {  variant: "error" });
        }
    }

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <Box ml={1}>
                    <Box display={"flex"} gap={1} alignItems={"center"} my={1}>
                        <Avatar src={""}/>
                        <Box>
                        <Typography color="neutral" gutterBottom>
                            {username}
                        </Typography>
                        <Typography color="neutral" level="body-xs">
                            {DateConverter(createdAt?.toDate())}
                        </Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography level="h2" fontSize="xl" mb={0.5}>
                            {title}
                        </Typography>
                        <Typography>
                            {description}
                        </Typography>
                    </Box>
                    <Box display={'flex'} justifyContent={'start'}>
                        <button onClick={addLike}>Zucc 👍</button>
                        {userId === user?.uid && (
                            <Dropdown>
                                <MenuButton
                                    slots={{ root: IconButton }}
                                    slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                                >
                                    <MoreHorizRoundedIcon />
                                </MenuButton>
                                <Menu size="sm">
                                    <MenuItem color='danger' onClick={() => setOpenDelete(true)}>
                                        Delete
                                    </MenuItem>
                                </Menu>
                            </Dropdown>
                        )}
                    </Box>
                    <p>Likes: {likesAmount}</p>
                </Box>
            </Card>
            <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                <WarningRoundedIcon />
                Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                Are you sure you want to delete this post?
                </DialogContent>
                <DialogActions>
                <Button variant="solid" color="danger" onClick={() => deletePost(id)}>
                    Yes
                </Button>
                <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
                    No
                </Button>
                </DialogActions>
            </ModalDialog>
            </Modal>
        </Box>
    );
}