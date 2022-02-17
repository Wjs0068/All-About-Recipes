import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./profile.css";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    isAuthenticated && (
      <div>
        <img className="profile" src={user.picture} alt={user.name} />
      </div>
    )
  );
};

export default Profile;
