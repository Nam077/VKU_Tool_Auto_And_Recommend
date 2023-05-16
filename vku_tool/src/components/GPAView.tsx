import { Col, Divider, Layout, notification, Row, Tag, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { FunctionComponent, useEffect } from 'react';

interface GPAProps {
    GPA: number;
    GPAChange: number;
}

const GPAView: FunctionComponent<GPAProps> = (props) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        return () => {};
    }, [props.GPAChange, props.GPA]);

    return (
        <Content>
            {contextHolder}
            <Layout
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    padding: '24px',
                    borderRadius: '5px',
                }}
            >
                <Row style={{ borderRadius: '5px' }}>
                    <Col flex={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Divider dashed={false} orientation={'center'} style={{ background: '#fff', padding: '24px' }}>
                            <Typography.Title level={3}>GPA Cũ</Typography.Title>
                            <Typography.Text>
                                <Tag color={props.GPA >= props.GPAChange ? 'green' : 'red'}>{props.GPA}</Tag>
                            </Typography.Text>
                        </Divider>
                    </Col>
                    <Col flex={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Divider dashed={false} orientation={'center'} style={{ background: '#fff', padding: '24px' }}>
                            <Typography.Title level={3}>GPA Mới</Typography.Title>
                            <Typography.Text>
                                <Tag color={props.GPAChange >= props.GPA ? 'green' : 'red'}>{props.GPAChange}</Tag>
                            </Typography.Text>
                        </Divider>
                    </Col>
                    <Col flex={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Divider plain orientation={'center'} style={{ background: '#fff', padding: '24px' }}>
                            <Typography.Title level={3}>Độ Chênh Lệch</Typography.Title>
                            <Typography.Text>
                                <Tag color={props.GPA - props.GPAChange <= 0 ? 'green' : 'red'}>
                                    {props.GPAChange - props.GPA}
                                </Tag>
                            </Typography.Text>
                        </Divider>
                    </Col>
                </Row>
            </Layout>
        </Content>
    );
};

export default GPAView;
