import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignupPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
          New Account
        </p>
        <Button to="/" variant="secondary" className="rounded-xl border-pink-200">
          Return Home
        </Button>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        Create your account
      </h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Get started with a secure account to save routines and articles.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-sm font-medium text-neutral-800"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="text-sm font-medium text-neutral-800"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-neutral-800"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="hello@citruscorner.shop"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-neutral-800"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-neutral-800"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            className={inputClasses}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-pink-100 bg-pink-50 p-3 text-sm text-neutral-800">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-pink-200 accent-pink-600"
          />
          <span>
            I agree to the Terms of Service and Privacy Policy.
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
        >
          Create Account
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-pink-100" />
          </div>
          <p className="relative mx-auto w-fit bg-white px-3 text-xs text-neutral-500">
            OR SIGN UP WITH
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
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-pink-600 transition hover:text-pink-700"
        >
          Sign in now
        </Link>
      </div>
    </>
  );
};

export default SignupPage;
