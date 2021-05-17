import * as React from 'react';
import Link from 'next/link';

export default function Index() {
  function handleLogout() {
    fetch('http://localhost:5000/api/auth/logout', {
      credentials: 'include',
    })
      .then((res) => res)
      .then((data) => {
        console.log(data);
        console.log('Logged out');
      });
  }

  return (
    <main>
      <h2>Register</h2>
      <Link href="/register">
        <a>Register</a>
      </Link>
      <h2>Login</h2>
      <Link href="/login">
        <a>Login</a>
      </Link>
      <h2>User</h2>
      <Link href="/user">
        <a>User</a>
      </Link>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Log out</button>
    </main>
  );
}
