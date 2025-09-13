import { api } from '@frontend/lib/configs/api';
import { useAuthStore } from '@frontend/lib/hooks/use-auth-store';
// import { useSession } from '@frontend/lib/hooks/use-session';
import { APP_ROUTES } from '@frontend/resources/routes.constants';
import { firebaseAuth } from '@frontend/services/auth/firebase.config';
// import { signInWithGoogle } from '@frontend/services/auth/firebase.service';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  // const session = useSession();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  // const loginMutation = api.auth.login.useMutation({
  //   onSuccess: (data) => {
  //     authStore.set({
  //       status: 'authenticated',
  //       user: data.body,
  //     });
  //     navigate(APP_ROUTES.MY_FLOCK);
  //   },
  // });

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // setIsLoading(true);
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', formData.email, formData.password);
      const { name, ...signInData } = formData;

      try {
        // const authResponse = await signInWithEmailAndPassword(
        //   firebaseAuth,
        //   signInData.email,
        //   signInData.password
        // );

        authStore.set({
          status: 'authenticated',
          user: {
            // email: authResponse.user.email as string,
            // name: authResponse.user.displayName,
            email: 'carlmark.carambas@gmail.com',
            name: 'Carl Mark Carambas',
          },
        });
        navigate(APP_ROUTES.MY_FLOCK);

        // const signInCredentials = await signInWithGoogle();
        // const accessToken = await signInCredentials.user?.getIdToken();
        // await loginMutation.mutateAsync({
        //   headers: {
        //     authorization: `Bearer ${accessToken}`,
        //   },
        //   body: null,
        // });
        // console.log('Access token:', authResponse);
      } catch (error) {
        // TODO validation here
        console.log('Error signing in:', error);
      }
    } else {
      console.log(
        'Signing up with:',
        formData.name,
        formData.email,
        formData.password
      );
      try {
        const signUpResponse = await createUserWithEmailAndPassword(
          firebaseAuth,
          formData?.email,
          formData?.password
        );
        console.log('## signUpResponse', signUpResponse);
        setIsLogin(true); // will switch to login
      } catch (signUpError) {
        console.log('## error', signUpError);
      }
    }
    // setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {isLogin ? 'Aero' : 'Sign Up'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {isLogin ? 'Sign in to your account.' : 'Create a new account.'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // disabled={
            //   session.status === 'loading' || session.status === 'authenticated'
            // }
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-indigo-600 hover:text-indigo-700 text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
