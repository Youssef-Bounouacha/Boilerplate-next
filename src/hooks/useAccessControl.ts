import useAuthStore from "../../store/AuthStore";

export default function useAccessControl() {
  const userRole = useAuthStore((state) => state.user?.role);
  return userRole;
}
