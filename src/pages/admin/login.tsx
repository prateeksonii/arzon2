import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidator } from "../../shared/login-validator";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const { mutateAsync } = trpc.useMutation("admin.login");

  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof loginValidator>> = async (
    values
  ) => {
    try {
      const { token } = await mutateAsync(values);
      localStorage.setItem("arzon-token", token);
      router.replace("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-zinc-900 text-white">
      <h1 className="mb-8 text-4xl">Welcome to admin panel</h1>

      <form
        className="mx-auto w-1/4 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="block space-y-1">
          <span>Email address</span>
          <input
            type="text"
            className="form-input block w-full rounded bg-zinc-700"
            {...register("email")}
          />
          {errors.email && (
            <div className="text-red-400">{errors.email.message}</div>
          )}
        </label>
        <label htmlFor="password" className="block space-y-1">
          <span>Password</span>
          <input
            type="password"
            className="form-input block w-full rounded bg-zinc-700"
            {...register("password")}
          />
          {errors.password && (
            <div className="text-red-400">{errors.password.message}</div>
          )}
        </label>

        <button
          type="submit"
          className="!mt-5 block w-full rounded bg-indigo-600 px-4 py-2 text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
