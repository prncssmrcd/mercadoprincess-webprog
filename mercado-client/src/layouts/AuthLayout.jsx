import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="relative grid min-h-screen overflow-hidden bg-neutral-950 lg:grid-cols-[1.05fr_1fr]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.32),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.26),_transparent_45%)]" />

      <section className="relative hidden border-r border-white/10 px-10 py-12 lg:flex lg:items-center">
        <div className="max-w-lg space-y-8">
          <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
            NU Skin Account
          </p>
          <h1 className="text-5xl font-bold leading-tight text-white">
            Welcome back.
          </h1>
          <p className="text-base leading-7 text-white/80">
            Sign in to save routines, bookmark articles, and keep your skincare
            plan in sync across devices.
          </p>
          <div className="grid gap-3 text-sm text-white/80">
            <p>Save your routine in one place</p>
            <p>Quick access to skincare guides</p>
            <p>Simple flow designed for clarity</p>
          </div>
        </div>
      </section>

      <section className="relative flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-10">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
