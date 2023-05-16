import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import ScoreRecommend from './pages/ScoreRecommend.tsx';

const { Header, Sider, Content } = Layout;

interface ScoreCount {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
}

const App: React.FC = () => {
    const readJsonFile = async (file: File) => {
        const fileContent = await file.text();
        return JSON.parse(fileContent);
    };

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ScoreRecommend />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
