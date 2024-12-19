"use server";

import { auth } from "@/auth";

export const authenticatedFetch = async (url: string, options?: RequestInit) => {
  const session = await auth();
	console.log(options);
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
        ...options?.headers,
      },
    });
		const data = await response.json();
		if (data.message) {
			console.log("data authenticated fetch", data);
		}
    if (!response.ok) {
			console.log("data authenticated fetch", data);
      throw new Error(data);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Error fetching data" };
  }
};
