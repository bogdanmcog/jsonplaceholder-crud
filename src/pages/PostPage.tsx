import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Button, Card, Modal, Form} from "antd";
import TextArea from "antd/es/input/TextArea";
import { BlogPost } from "./Blogs";

const PostPage: React.FC = () => {
    const [post, setPost] = useState<BlogPost | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const navigate = useNavigate()
    const { id } = useParams()
    const [form] = Form.useForm();
  
    const fetchPost = async () => {
        await fetch(`${import.meta.env.VITE_GET_POST}${id}`)
        .then((response) => response.json())
        .then((data) => setPost(data))
        .catch((err) => console.log(err))
      }
    useEffect(() => {
        fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ id ])
    
    const onDelete = async (id: React.MouseEvent<HTMLElement, MouseEvent>) => {
        await fetch(`${import.meta.env.VITE_GET_POST}${id}`, {
            method: 'DELETE'
          })
          .then((response) => {
            if (response.status !== 200) {
              return;
            } else {
              alert(`post number ${post?.id} for user: ${post?.userId} deleted`)
              navigate(-1)
            }
          })
          .catch((error) => console.log(error));
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePut = async (fieldsValue: any) => {
         const {title, body} = {
            ...fieldsValue,
            'title' : fieldsValue['title'],
            'body' : fieldsValue['body']
         }
        await fetch(`${import.meta.env.VITE_GET_POST}${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                title: title,
                body: body,
                userId: post?.userId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then((response) => {
            if (response.status !== 200) {
              return;
            } else {
                alert(`Post no. ${id} modified`)
                return response.json();
            }
          })
          .then((data) => console.log(data))
          .catch((error) => console.log(error))
          setIsModalOpen(false);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
      };

    return (
        <>
        <Card title={`Details for post no. ${post?.id} for user: ${post?.userId}`}>
            <p>Body: {post?.body}</p>
            <p>Title: {post?.title}</p>
        </Card>
        <div style={{display:"flex", justifyContent:'space-between', marginTop: '10px'}}>
             <Button type="primary" onClick={showModal}>Edit</Button>
             <Button type="primary" onClick={(id) => onDelete(id)}> Delete</Button>
        </div>
        <Modal title="Modify post" open={isModalOpen}  onOk={form.submit} onCancel={handleCancel}>
            <Form form={form} onFinish={handlePut}>
                <Form.Item name="title" label="Title" initialValue={post?.title} >
                    <TextArea rows={2} placeholder={post?.title} name='title'/>
                </Form.Item>
                <br />
                <br />
                <Form.Item name="body" label="Body" initialValue={post?.body} >
                    <TextArea rows={6} placeholder={post?.body} name='body'/>
                </Form.Item>
            </Form>   
        </Modal>
        </>
    )
}

export default PostPage;