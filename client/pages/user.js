import * as React from 'react';

export default function User() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/auth/user', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return <h1>Welcome, {user?.username}</h1>;
}
