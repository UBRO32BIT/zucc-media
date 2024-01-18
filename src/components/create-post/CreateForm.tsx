import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onCreatePost)}>
                <TextField
                    variant="standard"
                    label="Title"
                    placeholder="Title..."
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    {...register("title", { required: "Title is required" })}
                />
                <br/>
                <TextField
                    variant="filled"
                    label="Description"
                    placeholder="Description..."
                    multiline
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register("description", { required: "Description is required" })}
                />
                <br/>
                <Button type="submit" variant="contained" color="success">Post</Button>
            </form>
        </>
    );
}