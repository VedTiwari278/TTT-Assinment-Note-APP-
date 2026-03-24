import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../hooks/auth.hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";

function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (_err) {}
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-md sm:p-7"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-500">
            {loginMutation.error?.response?.data?.message || "Login failed"}
          </p>
        )}

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2.5"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
