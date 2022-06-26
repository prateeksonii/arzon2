import Image from "next/image";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const CatalogPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = trpc.useQuery(["products.all"]);

  if (isLoading) return <div>Loading products...</div>;

  if (isError) return <div>Something went wrong. Please reload</div>;

  return (
    <div className="mx-auto my-8 w-3/5">
      <nav className="sticky flex items-center justify-between">
        <h1 className="text-3xl">Catalog</h1>
        <Link href="/signin">
          <a className="rounded bg-slate-600 py-2 px-4">Sign in</a>
        </Link>
      </nav>

      <section className="mt-8">
        {products && products.length > 0 ? (
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[20%_80%] overflow-hidden rounded-lg border border-zinc-800 shadow shadow-zinc-800"
              >
                <div className="relative min-h-[200px]">
                  <Image
                    src={
                      product.images[0]?.imageUrl ??
                      "http://via.placeholder.com/640x360"
                    }
                    alt={product.name}
                    layout="fill"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex flex-col p-4">
                  <h4 className="text-xl">{product.name}</h4>
                  <p>{product.description}</p>
                  <div className="mt-1 flex grow items-end">
                    <div className="flex w-full items-center justify-between">
                      <div className="text-2xl font-bold">
                        Rs. {product.prices[0]?.price.toFixed(2)}
                      </div>
                      <div className="space-x-4">
                        <button className="rounded bg-green-600 py-2 px-4">
                          Add to cart
                        </button>
                        <button className="rounded bg-indigo-600 py-2 px-4">
                          Buy now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No products found</div>
        )}
      </section>
    </div>
  );
};

export default CatalogPage;
