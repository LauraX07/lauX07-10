const uploadForm = document.getElementById("uploadForm");
const photoInput = document.getElementById("photoInput");
const gallery = document.getElementById("gallery");

// Substitua pela sua chave API do ImgBB
const API_KEY = "SUA_API_KEY_AQUI";

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", photoInput.files[0]);

  fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.data.display_url;
      addImageToGallery(imageUrl);
      alert("Imagem enviada com sucesso!");
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Houve um erro no upload. Tente novamente.");
    });
});

function addImageToGallery(url) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Imagem enviada";
  img.className = "uploaded-image";
  gallery.appendChild(img);
}
