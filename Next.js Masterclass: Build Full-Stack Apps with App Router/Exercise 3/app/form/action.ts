"use server";

export async function submitForm(
  prevState: { error: string; success: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  console.log("Email:", email);

  if (password.length < 6) {
    return {
      error: "Password must be at least 6 characters",
      success: "",
    };
  }

  return {
    error: "",
    success: `Thanks for submitting! Hello, ${firstName} ${lastName}!`,
  };
}