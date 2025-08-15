async function getToken(code: string) {
  const res = await fetch("http://localhost:3000/api/spotify/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }), // send code here
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch token: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.access_token;
}
