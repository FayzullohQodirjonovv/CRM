import React from 'react'; 
import { Form, Input, Button, Typography, Spin } from 'antd';
import { useSignInMutation } from '../services/authApi';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import 'react-toastify/dist/ReactToastify.css';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();  

  const onFinish = async (values: { email: string; password: string }) => {
    toast.dismiss(); 
    const payload = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    try {
      const res = await signIn(payload).unwrap();
      console.log("LOGIN RESPONSE:", res);
      localStorage.setItem('token', res.accessToken || res.token);
      localStorage.setItem('loggedInEmail', payload.email);
toast.success('Muvaffaqiyatli kirdingiz!');
navigate('/dashboard');
window.location.reload();
    } catch (err: any) {
      toast.error('Login xato!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f9f9f9]">
      <div className="bg-white shadow-xl rounded-2xl p-12 w-full max-w-[450px] h-[430px] text-center">
        <Title level={2}>
          Xush kelibsiz <span className="inline-block animate-wiggle">👋</span>
        </Title>
        <Text className="block mb-2">
          Hisobingizga kirish uchun email va parolni kiriting
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Emailni kiriting!' }]}
          >
            <Input size="large" type="email" />
          </Form.Item>

          <Form.Item
            label="Parol"
            name="password"
            rules={[{ required: true, message: 'Parolni kiriting!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              className="!bg-black hover:bg-gray-800 flex justify-center items-center"
              disabled={isLoading}
              style={{ gap: 8 }}
            >
              {isLoading && (
                <Spin size="small" style={{ marginTop: 2, marginLeft: 50 }} tip={null} />
              )}
              Kirish
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Login;
