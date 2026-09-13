
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Code2, ArrowRight, Terminal, Braces } from 'lucide-react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex bg-zinc-950 text-zinc-100">

      {/* Left brand panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden border-r border-zinc-800">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center">
              <Code2 size={18} className="text-white" />
            </span>
            <span className="text-lg font-bold tracking-wide">STRIKE</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-zinc-50">
              Sharpen your code,<br />one problem at a time.
            </h1>
            <p className="text-zinc-400 text-base max-w-sm">
              Solve curated challenges, track your progress, and get instant feedback — all in one place.
            </p>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-sm text-zinc-400 shadow-lg max-w-sm">
              <div className="flex items-center gap-1.5 mb-3 text-zinc-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <div><span className="text-violet-400">class</span> <span className="text-amber-300">Solution</span> {'{'}</div>
              <div className="pl-4"><span className="text-violet-400">public:</span></div>
              <div className="pl-4 text-zinc-500">// your next accepted run</div>
              <div>{'}'}</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-zinc-500 text-sm">
            <div className="flex items-center gap-1.5">
              <Terminal size={14} /> 500+ problems
            </div>
            <div className="flex items-center gap-1.5">
              <Braces size={14} /> Multi-language
            </div>
          </div>
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
            <h2 className="text-2xl font-bold text-zinc-50">Welcome back</h2>
            <p className="text-sm text-zinc-500 mt-1">Log in to keep your streak going.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  Logging in...
                </>
              ) : (
                <>
                  Log in <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-zinc-500">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Sign up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;