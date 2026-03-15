import { API_BASE_URL, getSessionId } from "./api";

export interface CheckoutInfo {
  name: string;
  number: string;
  defaultAddress: string;
  otherAddresses: string[];
}

export async function fetchCheckoutInfo(): Promise<CheckoutInfo | null> {
  if (typeof window === "undefined") return null;
  const sessionId = getSessionId();
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/customer?sessionId=${encodeURIComponent(sessionId)}`
    );
    if (res.status === 204) return null;
    if (!res.ok) return null;
    const json = (await res.json()) as CheckoutInfo;
    return json;
  } catch {
    return null;
  }
}

export async function saveCheckoutInfo(
  data: CheckoutInfo
): Promise<CheckoutInfo | null> {
  if (typeof window === "undefined") return null;
  const sessionId = getSessionId();
  try {
    const res = await fetch(`${API_BASE_URL}/api/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, customer: data }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as CheckoutInfo;
    return json;
  } catch {
    return null;
  }
}

