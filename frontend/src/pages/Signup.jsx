

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';
import { User, Mail, Lock, Eye, EyeOff, Code2, ArrowRight, Sparkles, Trophy } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">

      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-zinc-800">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </span>
            <span className="text-lg font-bold tracking-wide">STRIKE</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-zinc-50">
              Join thousands<br />levelling up daily.
            </h1>
            <p className="text-zinc-400 text-base max-w-sm">
              Create your account to save progress, build streaks, and unlock editorials for every problem.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <Sparkles size={16} className="text-violet-400 mb-2" />
                <p className="text-sm text-zinc-300 font-medium">AI hints</p>
                <p className="text-xs text-zinc-500 mt-0.5">Get unstuck faster</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <Trophy size={16} className="text-amber-400 mb-2" />
                <p className="text-sm text-zinc-300 font-medium">Track streaks</p>
                <p className="text-xs text-zinc-500 mt-0.5">Stay consistent</p>
              </div>
            </div>
          </div>

          <p className="text-zinc-600 text-xs">Free to start. No credit card required.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          {/* Mobile brand mark */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <span className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </span>
            <span className="text-lg font-bold tracking-wide">STRIKE</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-50">Create your account</h2>
            <p className="text-sm text-zinc-500 mt-1">Start solving in under a minute.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">First name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="John"
                  className={`w-full bg-zinc-900 border rounded-lg pl-10 pr-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-shadow
                    ${errors.firstName ? 'border-rose-500/60' : 'border-zinc-800'}`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <span className="text-rose-400 text-xs mt-1 block">{errors.firstName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full bg-zinc-900 border rounded-lg pl-10 pr-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-shadow
                    ${errors.emailId ? 'border-rose-500/60' : 'border-zinc-800'}`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && (
                <span className="text-rose-400 text-xs mt-1 block">{errors.emailId.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-zinc-900 border rounded-lg pl-10 pr-10 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-shadow
                    ${errors.password ? 'border-rose-500/60' : 'border-zinc-800'}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-rose-400 text-xs mt-1 block">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 mt-2 py-2.5 rounded-lg text-sm font-semibold
                bg-violet-600 hover:bg-violet-500 text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing up...
                </>
              ) : (
                <>
                  Sign up <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-zinc-500">
              Already have an account?{' '}
              <NavLink to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Log in
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;