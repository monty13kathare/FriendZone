import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, username, avatar }) => {
  return (


    <Link to={`/user/${userId}`} className="user-card">
      <img
        src={avatar || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-20 h-20"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{username}
        </p>
      </div>

      <button type="button" className="shad-button_primary px-5 py-2">
        Follow
      </button>
    </Link>
  );
};

export default User;
