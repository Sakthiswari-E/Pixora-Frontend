import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await API.get(`/products/${id}`);
    setProduct(res.data);
  };

  if (!product) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{product.name}</h1>

      <img
        src={`${process.env.REACT_APP_API_URL.replace("/api","")}${product.images[0]}`}
        alt={product.name}
      />

      <p>{product.description}</p>

      <h2>₹{product.price}</h2>
    </div>
  );
}

export default ProductDetails;