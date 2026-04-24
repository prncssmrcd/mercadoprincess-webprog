import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="relative grid min-h-screen overflow-hidden bg-orange-950 lg:grid-cols-[1.05fr_1fr]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.3),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(239,68,68,0.28),_transparent_45%)]" />

      <section className="relative hidden border-r border-orange-200/20 px-10 py-12 lg:flex lg:items-center">
        <div className="max-w-lg space-y-8">
          <p className="inline-flex rounded-full border border-orange-200/30 bg-orange-100/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-100">
            Orange Dashboard
          </p>
          <h1 className="text-5xl font-bold leading-tight text-orange-50">
            Welcome back to your workspace.
          </h1>
          <p className="text-base leading-7 text-orange-100/90">
            Sign in to manage your account, track activity, and keep your
            dashboard in sync across devices.
          </p>
          <div className="grid gap-3 text-sm text-orange-100/90">
            <p>Secure authentication experience</p>
            <p>Fast account access and onboarding</p>
            <p>Simple flow designed for clarity</p>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl rounded-3xl border border-orange-100/20 bg-orange-50/95 p-6 shadow-2xl backdrop-blur sm:p-10">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
