const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getGiftboxes() {
  const res = await fetch(`${BASE}/api/giftboxes`);
  if (!res.ok) throw new Error('Failed to fetch giftboxes');
  return res.json();
}

export async function createGiftbox(data) {
  const res = await fetch(`${BASE}/api/giftboxes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create giftbox');
  return res.json();
}
