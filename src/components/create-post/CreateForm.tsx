import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/joy/Button";
import { enqueueSnackbar } from "notistack";
import { Box, Input, Typography } from "@mui/joy";
interface CreateFormData {
    title: string;
    description: string;
}
export const CreateForm = () => {
    const [user] = useAuthState(auth);

    const schema = yup.object().shape({
        title: yup.string().required("Title is required!"),
        description: yup.string().required("You must add description!"),
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })

    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: CreateFormData) => {
        try {
            console.log(data);
            await addDoc(postsRef, {
                ...data,
                username: user?.displayName,
                userId: user?.uid,
                createdAt: serverTimestamp()
            });
        }
        catch (error: any) {
            console.error(error);
            enqueueSnackbar(`Cannot create a post: ${error.message}`, {  variant: "error" });
        }
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <Input
                    size="sm"
                    placeholder="Title..."
                    error={!!errors.title}
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <Typography level="body-xs" color="danger">{errors.title.message}</Typography>}
                <br/>
                <Input
                    size="sm"
                    placeholder="Description..."
                    error={!!errors.description}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && <Typography level="body-xs" color="danger">{errors.description.message}</Typography>}
                <br/>
                <Button type="submit" color="success">Post</Button>
            </form>
        </Box>
    );
}