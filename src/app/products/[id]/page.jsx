// app/products/[id]/page.jsx

import { notFound } from 'next/navigation';

const ProductPage = async ({ params }) => {
  const { id } = params; // Get product ID from the URL

  // Fetch product data using the ID
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`);

  if (!res.ok) {
    return notFound(); // If product not found, show 404 page
  }

  const product = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <div className="">
        {/* Product Images */}
        <div className="w-full p-3  m-5">
          <div className="flex flex-wrap gap-4">
            {product.images?.map((image, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 flex justify-around">
                <img
                  src={image.url || "/placeholder.png"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='mt-3 p-3 text-white'>
          <p className="text-2xl mb-4 ml-5">Price: ${product.price}</p>
          <p className='text-center my-10 underline text-xl'>product description</p>
          <p className="mb-6 ml-4">{product.description}</p>

          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg my-8">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
