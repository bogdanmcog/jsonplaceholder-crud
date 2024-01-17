import { Link } from "react-router-dom";
import { List } from "antd";

const Post: React.FC <{id: number, title: string}> = ({id, title}) => {
    return (
        <Link to={`/blog/post/${id}`}>
          <List.Item>
            <List.Item.Meta title={`${id}: ${title}`}/>
          </List.Item>
        </Link>
    )
}

export default Post;