import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Divider, Layout, List, Menu,  Spin,  Image,Card } from 'antd'
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../assets/image.png'

const { Sider } = Layout;

const StyledIderDiv = styled.div`
  background-color: #4e92f2; 
  height:64px; 
  padding: 5px 25px ;
  display:flex;
  justify-content:space-between
`
interface User {
    name: string,
    phone: string,
    email: string,
    website: string
}

const Aside: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    await fetch(import.meta.env.VITE_GET_USER)
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    //delay getting user for showing a loading state
    setTimeout(  ()=>  fetchUser(), 2000)
  }, [])

    return(
        <Sider style={{background: '#ffffff'}}>
        <StyledIderDiv>
          <Image width={80} src={logo}/>
          <MenuOutlined style={{color: '#ffffff', fontSize: '25px'}}/>
       </StyledIderDiv>
         <div style={{textAlign: 'center', margin: '15px'}}>
            {user ? <Avatar style={{ backgroundColor: '#4e92f2' }} size={64} icon={<UserOutlined />} /> : <Spin size="small" />}
         </div>
         <Menu
           theme="light"
           mode="inline"
           defaultSelectedKeys={["1"]}
         >
           <Menu.Item key="1">
             <Link to="/">
               <span>Dashboard</span>
             </Link>
           </Menu.Item>
           <Menu.Item key="2">
             <Link to="/blog">
               <span>Blogs</span>
             </Link>
           </Menu.Item>
         </Menu>
 
         {user ?   
         <Card style={{margin: '10px 5px 0 0', display: 'flex', justifyContent: 'center'}}>
           <Divider>Profile</Divider>
           <List  >
              <List.Item>{user?.name}</List.Item>
              <List.Item>{user?.email}</List.Item>
              <List.Item>{user?.phone}</List.Item>
              <List.Item>{user?.website}</List.Item>
           </List>
         </Card> : 
         <Spin size="small" />}
       </Sider>
    )
}

export default Aside;