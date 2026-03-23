import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../hooks/auth.hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";

function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (err) {}
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-7 space-y-5"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create account
          </h1>
          <p className="text-sm text-gray-500">Start organizing your notes</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
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

        {registerMutation.isError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
            {registerMutation.error?.response?.data?.message ||
              "Register failed"}
          </p>
        )}

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-2.5"
        >
          {registerMutation.isPending ? "Creating..." : "Register"}
        </Button>

        <p className="text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
