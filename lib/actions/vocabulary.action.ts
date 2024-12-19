"use server";

import { auth } from "@/auth";
import { formSchema } from "@/components/CreateWordForm";
import { z } from "zod";
import { authenticatedFetch } from "./fetch.action";

export const getVocabularies = async () => {
  const session = await auth();
  const data = await authenticatedFetch(
    `${process.env.BACKEND_URL}/vocabulary?userId=${session?.user?.id}`,
  );
  return data;
};

export const addVocabulary = async (values: z.infer<typeof formSchema>) => {
  const session = await auth();
  const payload = {
    ...values,
    example: values.example ? values.example.split("\n").filter(Boolean) : [], // Convert example to array
    userId: session?.user?.id, // Replace with actual user ID from your auth system
  };

  const data = await authenticatedFetch(
    `${process.env.BACKEND_URL}/vocabulary`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
  return data;
};

export const updateVocabulary = async (
  id: string,
  values: z.infer<typeof formSchema>,
) => {
  const session = await auth();
  const payload = {
    ...values,
    example: values.example ? values.example.split("\n").filter(Boolean) : [],
    // userId: session?.user?.id,
  };

  const data = await authenticatedFetch(
    `${process.env.BACKEND_URL}/vocabulary/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  );
  return data;
};

export const deleteVocabulary = async (id: string) => {
  await authenticatedFetch(`${process.env.BACKEND_URL}/vocabulary/${id}`, {
    method: "DELETE",
  });
};
