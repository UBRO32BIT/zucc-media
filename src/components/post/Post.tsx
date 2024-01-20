import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';

export interface Post {
    id: string,
    userId: string,
    title: string,
    username: string,
    description: string,
}

export const Post = (props: Post) => {
    const { id, userId, title, username, description } = props;
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
            </Card>
            
        </Box>
    );
}