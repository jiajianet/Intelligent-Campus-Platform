import './index.scss';
import { Card, Form, Input, Button, message } from 'antd';
import logo from '@/assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VerifySlideFixed from '@/components/Captcha/verifySlideFixed';
import CryptoJS from "crypto-js";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [captchaOpen, setCaptchaOpen] = useState(false);


    // 处理验证成功回调
    const handleVerifySuccess = (verification) => {
        const currentValues = form.getFieldsValue();
        handleLogin(currentValues, verification);
        // setCaptchaOpen(false);
    };

    // 处理验证失败回调
    const handleVerifyError = (error) => {
        message.error(error.message || '验证失败');
        setCaptchaOpen(false);
    };

    const handleLogin = async (values, verification) => {
        try {
            const hashedPassword = CryptoJS.SHA256(values.password).toString(CryptoJS.enc.Hex);
            const token = await dispatch(
                fetchLogin({
                    ...values,
                    password: hashedPassword,
                    captchaVerification: verification
                })
            );
            console.log("token:", token);
            if (token) {
                message.success('登录成功，即将跳转到首页', 1);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else {
                message.error('账户或者密码错误');
            }
        } catch (error) {
            message.error(error.message || '登录失败');
        }
    };


    const onFinish = () => {
        setCaptchaOpen(true);
    };

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo"
                    src={logo}
                    alt="XYCH logo"
                    draggable="false"
                    onDragStart={(e) => e.preventDefault()}
                />
                <Form form={form} onFinish={onFinish}>
                    {/* 保持原有表单项 */}
                    <Form.Item
                        name="uno"
                        rules={[
                            { required: true, message: '请输入学号' },
                            { pattern: /^[0-9]{3,20}$/, message: '仅包含数字' }
                        ]}
                    >
                        <Input placeholder="请输入用户名" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' },
                        {}
                        ]}
                    >
                        <Input.Password placeholder="请输入密码" size="large" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        登录
                    </Button>
                </Form>
            </Card>

            {captchaOpen && (
                <VerifySlideFixed
                    isSlideShow={captchaOpen}
                    verifyPointFixedChild={setCaptchaOpen}
                    onSuccess={handleVerifySuccess}
                    onError={handleVerifyError}
                    imgSize={{ width: "330px", height: "200px" }}
                    barSize={{ width: "310px", height: "40px" }}
                    vSpace={5}
                />
            )}
        </div>
    );
};

export default Login;