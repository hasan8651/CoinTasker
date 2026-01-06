// src/lib/imageUploader.js

export async function uploadToImgbb(file) {
  const formData = new FormData();
  formData.append("image", file);

  // .env ফাইলে NEXT_PUBLIC_IMGBB_KEY থাকতে হবে
  const apiKey = import.meta.env.VITE_IMGBB_KEY; 

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return data.data.url; // ইমেজের সরাসরি URL
  } else {
    throw new Error("Image upload failed");
  }
}