"use server"

export const signUp = async (formData: FormData) => {
	try {
			const response = await fetch(
					`${process.env.BACKEND_URL}/auth/register`,
					{
							method: "POST",
							body: formData,
					},
			);
			const data = await response.json();
			console.log(data);
			return data;
	} catch (error) {
			console.log(error);
	}
};