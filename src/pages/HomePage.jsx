import React from "react";

const HomePage = ({ user }) => {
  return (
    <div>
      <h1>Homepage</h1>
      {user ? <p>Welcome back, {user.username}!</p> : <p>Login for more!!</p>}
    </div>
  );
};

export default HomePage;
