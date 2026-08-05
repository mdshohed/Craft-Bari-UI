import axios from 'axios'

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to Base64"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};


// Image upload
export const imageUpload = async (image: any) => {
  const base64Image = await convertToBase64(image);

  const formData = new FormData();
  formData.append("image", base64Image.split(",")[1]); //

  formData.append('image', image)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=9e27602245bf52bfa9d649ab92057569`,
    formData
  )
  return data.data.display_url
}