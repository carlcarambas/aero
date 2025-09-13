import { Button, Card, Typography, Spin, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '@frontend/lib/configs/api';
import { useAuthStore } from '@frontend/lib/hooks/use-auth-store';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
import { signInWithGoogle } from '@frontend/services/auth/firebase.service';
import axios from 'axios';
import apiRest from '@frontend/lib/configs/api-rest';

const { Title, Text } = Typography;

export function FirebaseLogin() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // const loginMutation = api.auth.login.useMutation({
  //   onSuccess: (data) => {
  //     authStore.set({
  //       status: 'authenticated',
  //       user: data.body,
  //     });
  //     message.success('Successfully logged in!');
  //     navigate(APP_ROUTES.MY_FLOCK);
  //   },
  //   onError: (error) => {
  //     console.log('### ERROR ', error);
  //     message.error('Failed to authenticate with the server');
  //     setIsLoading(false);
  //   },
  // });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const signInCredentials = await signInWithGoogle();
      const accessToken = await signInCredentials.user?.getIdToken();

      console.log('## ACCESS TOKEN ', accessToken);

      // const res = await axios.post(
      //   'http://127.0.0.1:5001/aero-racehub/us-central1/api/auth/login',
      //   {},
      //   {
      //     headers: {
      //       // authorization: `Bearer ${accessToken}`,
      //       Authorization: `Bearer ${accessToken}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      const res = await apiRest.post(
        '/auth/login',
        {},
        {
          headers: {
            // authorization: `Bearer ${accessToken}`,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('### RES', res);

      // * CORS issue
      // await loginMutation.mutateAsync({
      //   headers: {
      //     authorization: `Bearer ${accessToken}`,
      //   },
      //   body: null,
      // });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      message.error('Google sign-in failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-lg" variant="outlined">
        <div className="text-center mb-6">
          <Title level={2} className="mb-2">
            Welcome to Aero
          </Title>
          <Text type="secondary">Sign in to continue to your account</Text>
        </div>

        <div className="mt-8">
          <Button
            type="primary"
            icon={isLoading ? <Spin size="small" /> : <GoogleOutlined />}
            size="large"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            block
            className="h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <Text type="secondary">Don't have an account?</Text>
          <Button
            type="link"
            className="ml-1 p-0"
            // onClick={() => navigate('/signup')}
          >
            Register
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default FirebaseLogin;
