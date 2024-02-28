import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isRegistered, setIsRegistered] = useState(false);
    let personEmail;

    const formItemLayout =
    {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const onFinish = async (values) => {
        try {
            let response = await axios.post(
                'http://localhost:5283/api/Person/new',
                values,
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            message.success('Registration successful!');
            setIsRegistered(true);

            const email = values.email
            navigate(`/quiz/${email}`);
        } catch (error) {
            console.error('Error registering:', error);
            message.error('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <Form
                {...formItemLayout}
                layout={"horizontal"}
                form={form}
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>

            {/* {isRegistered && (
                <div>
                    <Link to={{ pathname: '/quiz', state: personEmail }}>
                        Go to Quiz</Link>
                </div>
            )} */}
        </div>
    );
};

export default RegistrationPage;