import { Box, Card, Divider, Typography } from "@mui/joy";
import { CreateForm } from "./CreateForm";

export const CreatePost = () => {
    return (

        <Box width={"100%"}>
            <Card>
                <Typography level="h2" textAlign={'center'}>Create a post</Typography>
                <Divider/>
                    <CreateForm />
                </Card>
        </Box>
    );
}