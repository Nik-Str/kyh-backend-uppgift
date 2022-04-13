//React
import { useState, useEffect } from 'react';
//Custom Hooks
import useLogSing from '../hooks/useLogSign';
//Component
import { LogSign } from '../components/LogSign';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sub, setSub] = useState(0);
  const [passwordRep, setPasswordRep] = useState('');
  const [same, setSame] = useState(true);

  const { isError, isLoading, fetchPost } = useLogSing();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPost(`${process.env.REACT_APP_SEVER_URL}/signup`, { email: email, password: password, subscription: sub });
  };

  useEffect(() => {
    if (password === passwordRep && sub !== 0) {
      setSame(false);
    } else {
      setSame(true);
    }
  }, [passwordRep, password, sub]);

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
          sub={sub}
          setSub={setSub}
          passwordRep={passwordRep}
          setPasswordRep={setPasswordRep}
          same={same}
          setSame={setSame}
        />
      </div>
    </div>
  );
};

export default Signup;
