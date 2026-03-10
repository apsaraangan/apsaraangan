import { useLocation, useNavigate, useParams } from "react-router";

export function usePathname() {
  return useLocation().pathname;
}

export function useRouter() {
  const navigate = useNavigate();
  return {
    back: () => navigate(-1),
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
  };
}

export { useParams };
