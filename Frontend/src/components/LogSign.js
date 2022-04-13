//Prime React
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

export const LogSign = ({
  isLoading,
  isError,
  handleSubmit,
  setEmail,
  setPassword,
  email,
  password,
  btn,
  sub,
  setSub,
  passwordRep,
  setPasswordRep,
  same,
}) => {
  const subscription = [
    { label: '5mb Free', value: 5 },
    { label: '10mb 0.99$/month', value: 10 },
    { label: '15mb 1.99$/month', value: 15 },
    { label: '20mb 2.99$/month', value: 20 },
  ];

  return (
    <div className="flex justify-content-center pb-4">
      <div className="px-5">
        {!isLoading && (
          <form onSubmit={(e) => handleSubmit(e)}>
            <InputText
              type="email"
              placeholder="Email"
              className="w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {btn === 'Login' && (
              <InputText
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-2"
                required
              />
            )}

            {btn === 'Signup' && (
              <div>
                <InputText
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-auto mr-2 mb-2"
                  required
                />
                <InputText
                  type="password"
                  placeholder="Password again"
                  value={passwordRep}
                  onChange={(e) => setPasswordRep(e.target.value)}
                  className="w-auto mb-2"
                  required
                />
              </div>
            )}

            {btn === 'Signup' && (
              <Dropdown
                value={sub}
                options={subscription}
                onChange={(e) => setSub(e.value)}
                placeholder="Subscription"
                className="w-full mb-2"
              />
            )}

            {btn === 'Login' && (
              <Button type="submit" className="w-full">
                <div className="m-auto">{btn}</div>
              </Button>
            )}

            {btn === 'Signup' && (
              <Button type="submit" className="w-full" disabled={same}>
                <div className="m-auto">{btn}</div>
              </Button>
            )}
          </form>
        )}
        {isLoading && (
          <Button className="p-button-outlined" type="submit" disabled>
            <ProgressSpinner
              style={{ width: '1rem', height: '1rem', padding: '0.5rem 1rem' }}
              strokeWidth="12"
              animationDuration="2s"
            />
          </Button>
        )}
        {isError && <p className="text-pink-500 font-bold text-center">{isError}</p>}
      </div>
    </div>
  );
};
