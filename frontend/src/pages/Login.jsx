import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore.js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../components/ui/Logo.jsx";

export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: { name: "", email: "", password: "", remember: true },
  });

  const {
    user,
    loading,
    error,
    info,
    login,
    register: registerUser,
  } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const redirect = params.get("redirect") || "/";

  useEffect(() => {
    if (user) navigate("/", { replace: true }); // always go to Dashboard
  }, [user, navigate]);

  async function onSubmit(values) {
    if (mode === "login") {
      const ok = await login(values.email, values.password);
      if (ok) navigate("/", { replace: true });
    } else {
      const ok = await registerUser(values.name, values.email, values.password);
      if (ok) {
        setMode("login");
        reset({ name: "", email: values.email, password: "", remember: true });
      }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="w-full px-4">
        {/* Logo */}
        <div className="mb-6 flex justify-center text-slate-900 dark:text-white">
          <Logo className="h-10" />
        </div>

        {/* Auth card */}
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-[#0F172A]/90">
          <div className="grid md:grid-cols-2">
            {/* Brand panel */}
            <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white min-h-[560px]">
              <div className="space-y-6">
                <Logo className="h-8" withText />
                <h2 className="text-3xl font-semibold leading-snug">
                  Track smarter. Stay consistent.
                </h2>
                <ul className="text-sm space-y-2 text-white/90">
                  <li>• Log meals with auto macros</li>
                  <li>• Hydration goals with quick add</li>
                  <li>• Workouts with auto calorie burn</li>
                  <li>• Daily rings, weekly insights</li>
                </ul>
              </div>
              <div className="text-xs text-white/80">
                B-FIT • Your daily fitness companion
              </div>
            </div>

            {/* Form panel */}
            <div className="p-8 md:p-12">
              <h1 className="text-3xl font-display mb-2">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                {mode === "login"
                  ? "Log in to continue tracking your goals."
                  : "Start tracking your fitness today."}
              </p>

              {info && mode === "login" && (
                <div className="mb-4 rounded-lg bg-green-50 text-green-700 px-3 py-2 border border-green-200">
                  {info}
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 text-red-700 px-3 py-2 border border-red-200">
                  {error}
                </div>
              )}

              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                {mode === "register" && (
                  <Field label="Name">
                    <input
                      type="text"
                      autoComplete="name"
                      className="w-full h-12 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                      {...register("name", { required: mode === "register" })}
                    />
                  </Field>
                )}

                <Field label="Email">
                  <input
                    type="email"
                    autoComplete="email"
                    spellCheck="false"
                    className="w-full h-12 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                    {...register("email", { required: true })}
                  />
                </Field>

                <Field label="Password">
                  <input
                    type="password"
                    autoComplete="current-password"
                    className="w-full h-12 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                </Field>

                {mode === "login" && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 select-none">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                        defaultChecked
                        {...register("remember")}
                      />
                      Remember me
                    </label>
                    <Link to="#" className="text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="h-12 rounded-lg bg-primary text-white hover:bg-blue-600 disabled:opacity-60"
                >
                  {mode === "login" ? "Log in" : "Sign up"}
                </button>

                <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                  {mode === "login" ? (
                    <>
                      Don’t have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setMode("register");
                          reset({
                            name: "",
                            email: "",
                            password: "",
                            remember: true,
                          });
                        }}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline"
                        onClick={() => {
                          setMode("login");
                          reset({
                            name: "",
                            email: "",
                            password: "",
                            remember: true,
                          });
                        }}
                      >
                        Log in
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          ©️ {new Date().getFullYear()} B-FIT. All rights reserved.
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="text-sm block">
      <div className="mb-1 text-slate-700 dark:text-slate-300">{label}</div>
      {children}
    </label>
  );
}
