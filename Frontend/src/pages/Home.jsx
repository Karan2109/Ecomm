import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrival from "../components/Products/NewArrival";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchProductsByFilter } from "../redux/slices/productsSlice";

// const placeholderProducts = [
//   {
//     _id: "1",
//     name: "Product 1",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=15",
//       },
//     ],
//   },
//   {
//     _id: "2",
//     name: "Product 2",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=16",
//       },
//     ],
//   },
//   {
//     _id: "3",
//     name: "Product 3",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=17",
//       },
//     ],
//   },
//   {
//     _id: "4",
//     name: "Product 4",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=18",
//       },
//     ],
//   },
//   {
//     _id: "5",
//     name: "Product 5",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=19",
//       },
//     ],
//   },
//   {
//     _id: "6",
//     name: "Product 6",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=20",
//       },
//     ],
//   },
//   {
//     _id: "7",
//     name: "Product 8",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=21",
//       },
//     ],
//   },
//   {
//     _id: "8",
//     name: "Product 8",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=22",
//       },
//     ],
//   },
// ];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    // Fetch Best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrival />

      {/* Best Seller */}
      <h2 className="text-3xl font-bold text-center mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
