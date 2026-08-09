const IMAGE_BB = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export const uploadImage = async (image: File): Promise<string> => {
  const imageData = new FormData();

  imageData.append("image", image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMAGE_BB}`,
    {
      method: "POST",
      body: imageData,
    }
  );

  const result = await response.json();

  if (!result.success) {
    throw new Error("Image upload failed");
  }

  return result.data.display_url;
};