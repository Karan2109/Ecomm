import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// const selectedProduct = {
//   name: "Stylish Jacket",
//   price: 120,
//   OriginalPrice: 150,
//   discription: "This is a stylish jackect perfect for any ocassion",
//   brand: "Levis",
//   material: "Leather",
//   sizes: ["XS", "S", "M", "L", "XL"],
//   colors: ["Red", "Black"],
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=9",
//       alText: "Stylish Jacket",
//     },
//     {
//       url: "https://picsum.photos/500/500?random=10",
//       alText: "Stylish Jacket",
//     },
//   ],
// };

// const similarProducts = [
//   {
//     _id: "1",
//     name: "Product 1",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=11",
//       },
//     ],
//   },
//   {
//     _id: "2",
//     name: "Product 2",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=12",
//       },
//     ],
//   },
//   {
//     _id: "3",
//     name: "Product 3",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=13",
//       },
//     ],
//   },
//   {
//     _id: "4",
//     name: "Product 4",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=14",
//       },
//     ],
//   },
// ];

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductById(productFetchId)); //X fetchProductDetails
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // useEffect(() => {
  //   if (selectedProduct.images.length > 0) {
  //     setMainImage(selectedProduct.images[0].url);
  //   }
  // }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1500,
      });
      return;
    }

    setIsButtonDisabled(true);
    // setTimeout(() => {
    //   toast.success("Product added to cart successfully.", {
    //     duration: 1500,
    //   });
    //   setIsButtonDisabled(false);
    // }, 500);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully.", {
          duration: 1000,
        });
        // setIsButtonDisabled(false);
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error}</p>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main Product Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.alText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Product Details Right Section */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                ${selectedProduct.OriginalPrice}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                ${selectedProduct.price}
              </p>
              <p className="text-gray-600 mb-4">
                {selectedProduct.discription}
              </p>
              <div className="mb-4">
                <p className="text-gray-700">Colors:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? " border-4  border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div className="mb-4">
                <p className="text-gray-700">Sizes:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border border-gray-300  ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center spac-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg p-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 uppercase ${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "Add to cart"}
              </button>

              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Matrial</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* You like section */}
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium  mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
