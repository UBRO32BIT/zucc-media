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
        <div>
            <div>
                <h5>{username}</h5>
            </div>
            <h2>{title}</h2>
            <div>
                <p>{description}</p>
            </div>
        </div>
    );
}