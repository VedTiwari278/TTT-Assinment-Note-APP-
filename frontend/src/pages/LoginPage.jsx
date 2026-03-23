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
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-7 space-y-5"
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
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
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
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {loginMutation.isError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
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

        <p className="text-sm text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
