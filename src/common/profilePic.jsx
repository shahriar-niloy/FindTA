import React from "react";

const ProfilePic = ({ pic, width }) => {
  let css = {
    width: "150px",
    height: "150px",
    borderRadius: "150px",
    objectFit: "cover"
  };
  css.width = css.height = css.borderRadius = width;
  return (
    <div>
      <img
        src={pic}
        style={css}
        alt="UTA"
      />
    </div>
  );
};

ProfilePic.defaultProps = {
  pic: "/images/pp.png"
};

export default ProfilePic;
