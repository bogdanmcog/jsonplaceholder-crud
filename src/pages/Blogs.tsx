import { useEffect, useState } from "react";
import { List } from "antd";

import Post from "../components/Post";

export interface BlogPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

const BlogsPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost [] | null>(null)

    const fetchPosts = async () => {
        await fetch(import.meta.env.VITE_GET_POSTS)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((err) => console.log(err))
      }

    useEffect(() => {
      fetchPosts();
      }, [])
    
    const renderPosts = () =>  {
        return (
          <List>
            {posts?.map(post => <Post key={post.id} id={post.id} title={post.title} />)}
          </List>
        )
    }
    return <>{posts && renderPosts()}</>
}

export default BlogsPage;