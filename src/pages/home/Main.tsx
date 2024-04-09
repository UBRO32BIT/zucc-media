import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { CreatePost } from "../../components/create-post/CreatePost";
import { PostList } from "../../components/PostList";
import { Box, CssBaseline, CssVarsProvider, Grid } from "@mui/joy";
import { Divider } from "@mui/material";
export const Main = () => {
    const [user] = useAuthState(auth);
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Grid container>
                <Grid xs={3}></Grid>
                <Grid xs={6}>
                    {user ? (
                        <>
                            <Box my={2}>
                                <CreatePost/>
                            </Box>
                            <Divider variant="middle"/>
                            <Box my={2}>
                                <PostList />
                            </Box>
                        </>
                    ) : (
                        <div>
                            <h1>HELLO</h1>
                            <p>Please login to continue</p>
                        </div>
                    )}
                </Grid>
                <Grid xs={3}></Grid>
            </Grid>
        </CssVarsProvider>

    );
}