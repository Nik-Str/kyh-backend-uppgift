//Prime React
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';

export const LogSign = ({ isLoading, isError, handleSubmit, setEmail, setPassword, email, password, btn }) => {
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
            <InputText
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2"
              required
            />
            <Button type="submit" className="w-full">
              <div className="m-auto">{btn}</div>
            </Button>
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
