import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser, loginUser } from '../../services/UserService.js';

const inputClasses =
  'mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100';

const actionButtonClassName =
  'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const initialForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  address: '',
  role: 'user',
  isActive: true,
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const required = [
      'firstName',
      'lastName',
      'email',
      'username',
      'password',
    ];

    if (required.some((field) => !String(form[field]).trim())) {
      setError('Please complete all required fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!acceptedTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    try {
      setLoading(true);
      const userData = { ...form };
      delete userData.confirmPassword;
      await createUser(userData);
      const { data } = await loginUser({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('firstName', data.firstName || data.user?.firstName || '');
      localStorage.setItem('type', data.role || data.type || data.user?.role || 'user');
      navigate('/dashboard');
    } catch (signupError) {
      setError(signupError.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
              name="firstName"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              value={form.firstName}
              onChange={handleChange}
              required
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
              name="lastName"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              value={form.lastName}
              onChange={handleChange}
              required
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
            name="email"
            type="email"
            placeholder="hello@mercado.beauty"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-username"
              className="text-sm font-medium text-neutral-800"
            >
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="signup-contact"
              className="text-sm font-medium text-neutral-800"
            >
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contactNumber"
              type="tel"
              placeholder="09171234567"
              autoComplete="tel"
              value={form.contactNumber}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="signup-age"
              className="text-sm font-medium text-neutral-800"
            >
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="number"
              min="1"
              placeholder="24"
              value={form.age}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="signup-gender"
              className="text-sm font-medium text-neutral-800"
            >
              Gender
            </label>
            <select
              id="signup-gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="signup-address"
            className="text-sm font-medium text-neutral-800"
          >
            Address
          </label>
          <input
            id="signup-address"
            name="address"
            type="text"
            placeholder="Address"
            autoComplete="street-address"
            value={form.address}
            onChange={handleChange}
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
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
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
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-pink-100 bg-pink-50 p-3 text-sm text-neutral-800">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
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
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
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
