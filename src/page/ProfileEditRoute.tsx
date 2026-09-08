import { useNavigate } from "react-router-dom";
import { useMyProfile } from "../hooks/useProfile";
import EditProfileModal from "../components/EditProfileModal";

export default function ProfileEditRoute() {
  const navigate = useNavigate();
  const { data } = useMyProfile();

  if (!data) return null;

  return (
    <EditProfileModal
      user={data.user}
      isOpen={true}
      onClose={() => navigate("/dashboard/profile")}
    />
  );
}