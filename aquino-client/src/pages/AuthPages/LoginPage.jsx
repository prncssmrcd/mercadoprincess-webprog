import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-orange-300 bg-orange-50 px-4 py-3 text-sm text-orange-950 outline-none transition placeholder:text-orange-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
          Account Access
        </p>
        <Button to="/" variant="secondary" className="rounded-xl border-orange-400">
          Return Home
        </Button>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-orange-950 sm:text-4xl">
        Welcome back
      </h1>
      <p className="mt-3 text-sm leading-6 text-orange-800">
        Log in to continue to your dashboard and manage your account.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-orange-900"
          >
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="hello@citruscorner.shop"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="text-sm font-medium text-orange-900"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-orange-700">
            Use at least 8 characters with letters, numbers, and symbols.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-orange-900">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-orange-300 accent-orange-600"
            />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-orange-700 transition hover:text-orange-900"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Sign In
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-orange-200" />
          </div>
          <p className="relative mx-auto w-fit bg-orange-50 px-3 text-xs text-orange-600">
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

      <div className="mt-8 border-t border-orange-200 pt-6 text-sm text-orange-800">
        New here?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-orange-700 transition hover:text-orange-900"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
