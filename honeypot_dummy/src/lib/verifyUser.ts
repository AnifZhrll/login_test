export async function verifyUserJWT(token: string) {
    const res = await fetch('http://localhost:8080/auth/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error(`JWT verification failed with status: ${res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  