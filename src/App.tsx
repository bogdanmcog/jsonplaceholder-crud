import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import { Avatar,  Layout, theme, Space, Input, Badge, } from 'antd'
import {  ClockCircleOutlined,  SearchOutlined, UserOutlined } from '@ant-design/icons';
import BlogsPage from './pages/Blogs';
import DahboardPage from './pages/Dashboard';
import PostPage from './pages/PostPage';
import styled from 'styled-components';
import Aside from './components/Aside';

const {  Content, Header } = Layout;
// examples for some css properties using styled components
const StyledLayout = styled(Layout)`
  height: 95vh
`
const App: React.FC = () => {
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

  return (
    <Router>
      <StyledLayout>
        <Aside />
        <Layout>
        <Header style={{background: colorBgContainer, display: 'flex', justifyContent:'space-between', paddingTop: '15px'}}>
          <div>
          <Space size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Type here to search ..." />
          </Space>
          </div>
    
        <div style={{lineHeight: 0}}>
          <Space size='middle'>
            <Badge count={5}>
              <Avatar shape="square" size='small' />
            </Badge>
            <Badge count={9} showZero>
              <Avatar shape="square" size="small" />
            </Badge>
            <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
              <Avatar shape="square" size="small" />
            </Badge>
            <Avatar style={{ backgroundColor: '#4e92f2' }} size={32} icon={<UserOutlined />} />
          </Space>
        </div>
        </Header>

        <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          <Routes>
            <Route path='/' element={<DahboardPage/>}/>
            <Route path='/blog' element={<BlogsPage/>}/>
            <Route path='blog/post/:id' element={<PostPage/>}/>
          </Routes>
        </Content>
        </Layout>
      </StyledLayout>
    </Router>
  );
};

export default App
