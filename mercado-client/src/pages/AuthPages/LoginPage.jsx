import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService.js';

const inputClasses =
  'mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      const { data } = await loginUser(form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName || data.user?.firstName || '');
      localStorage.setItem('type', data.role || data.type || data.user?.role || 'user');
      navigate('/dashboard');
    } catch (loginError) {
      setError(loginError.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
          Account Access
        </p>
        <Button to="/" variant="secondary" className="rounded-xl border-pink-200">
          Return Home
        </Button>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Log in to continue and manage your NU Skin routine.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-neutral-800"
          >
            Email Address here
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            placeholder="admin@mercado.beauty"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-neutral-800"
          >
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-neutral-800">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-pink-200 accent-pink-600"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-pink-600 transition hover:text-pink-700"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-pink-100" />
          </div>
          <p className="relative mx-auto w-fit bg-white px-3 text-xs text-neutral-500">
            OR CONTINUE WITH
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={actionButtonClassName}
          >
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-pink-100 pt-6 text-sm text-neutral-600">
        New here?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-pink-600 transition hover:text-pink-700"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
