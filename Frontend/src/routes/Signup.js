//React
import { useState } from 'react';
//Custom Hooks
import useLogSing from '../hooks/useLogSign';
//Component
import { LogSign } from '../components/LogSign';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isError, isLoading, fetchPost } = useLogSing();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPost(`${process.env.REACT_APP_SEVER_URL}/signup`, { email: email, password: password });
  };

  return (
    <div className="container">
      <div className="w-full md:w-30rem shadow-4 border-round surface-card">
        <h1 className="text-center">Sign up</h1>
        <LogSign
          email={email}
          password={password}
          isError={isError}
          isLoading={isLoading}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          btn={'Signup'}
        />
      </div>
    </div>
  );
};

export default Signup;
