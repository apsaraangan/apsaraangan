import { useParams, useNavigate } from "react-router";
import { ProductDetailContent } from "@/components/ProductDetailContent";

export default function ProductDetailRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const id = (params.id as string) || "";

  return (
    <ProductDetailContent
      id={id}
      onBack={() => {
        navigate(-1);
      }}
    />
  );
}

