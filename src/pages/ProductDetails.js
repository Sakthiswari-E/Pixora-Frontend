import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await API.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                <h2 className="text-2xl">Loading...</h2>
            </div>
        );
    }

    const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");

    return (
        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-4xl font-bold mb-6">
                {product.name}
            </h1>

            {product.video ? (
                <video
                    controls
                    className="w-full max-w-3xl rounded-2xl mb-6"
                >
                    <source
                        src={`${BASE_URL}${product.video}`}
                        type="video/mp4"
                    />
                </video>
            ) : (
                <img
                    src={`${BASE_URL}${product.images[0]}`}
                    alt={product.name}
                    className="w-full max-w-3xl rounded-2xl mb-6"
                />
            )}

            <p className="text-gray-300 text-lg mb-4">
                {product.description}
            </p>

            <h2 className="text-3xl font-bold text-fuchsia-400">
                ₹{product.price}
            </h2>

        </div>
    );
}

export default ProductDetails;