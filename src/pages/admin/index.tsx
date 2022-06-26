import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import AdminHOC from "../../components/hoc/AdminHOC";
import { createProductValidator } from "../../shared/create-product-validator";
import { loginValidator } from "../../shared/login-validator";
import { trpc } from "../../utils/trpc";

const AdminPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
    },
    resolver: zodResolver(createProductValidator),
  });

  const { mutateAsync } = trpc.useMutation("products.create");

  const onSubmit: SubmitHandler<z.infer<typeof createProductValidator>> = (
    values
  ) => {
    try {
      toast.promise(mutateAsync({ ...values, price: +values.price }), {
        error: "Something went wrong",
        success: "Product created successfully",
        pending: "Creating product...",
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <AdminHOC>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-zinc-900 text-white">
        <h1 className="mb-8 text-4xl">Create a product</h1>

        <form
          className="mx-auto w-1/4 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="block space-y-1">
            <span>Product name</span>
            <input
              type="text"
              className="form-input block w-full rounded bg-zinc-700"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-400">{errors.name.message}</div>
            )}
          </label>
          <label htmlFor="description" className="block space-y-1">
            <span>Description</span>
            <input
              type="description"
              className="form-input block w-full rounded bg-zinc-700"
              {...register("description")}
            />
            {errors.description && (
              <div className="text-red-400">{errors.description.message}</div>
            )}
          </label>
          <label htmlFor="price" className="block space-y-1">
            <span>Price</span>
            <input
              type="number"
              className="form-input block w-full rounded bg-zinc-700"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <div className="text-red-400">{errors.price.message}</div>
            )}
          </label>
          <label htmlFor="imageUrl" className="block space-y-1">
            <span>Image</span>
            <input
              type="text"
              className="form-input block w-full rounded bg-zinc-700"
              {...register("imageUrl")}
            />
            {errors.imageUrl && (
              <div className="text-red-400">{errors.imageUrl.message}</div>
            )}
          </label>

          <button
            type="submit"
            className="!mt-5 block w-full rounded bg-indigo-600 px-4 py-2 text-lg"
          >
            Create
          </button>
        </form>
      </div>
    </AdminHOC>
  );
};

export default AdminPage;
