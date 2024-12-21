// Seleciona os elementos do DOM
const uploadForm = document.getElementById("uploadForm");
const photoInput = document.getElementById("photoInput");
const gallery = document.getElementById("gallery");

// Salva imagens no localStorage
function saveImagesToLocalStorage(images) {
  const existingImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];
  localStorage.setItem("uploadedImages", JSON.stringify([...existingImages, ...images]));
}

// Carrega imagens do localStorage
function loadImagesFromLocalStorage() {
  const images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
  images.forEach((imageData, index) => {
    createImageElement(imageData, index);
  });
}

// Cria um elemento de imagem na galeria
function createImageElement(imageData, index) {
  const container = document.createElement("div");
  container.className = "image-container";

  const img = document.createElement("img");
  img.src = imageData;
  img.alt = "Uploaded Image";
  img.className = "uploaded-image";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Excluir";
  deleteButton.className = "delete-button";
  deleteButton.onclick = () => deleteImage(index);

  container.appendChild(img);
  container.appendChild(deleteButton);
  gallery.appendChild(container);
}

// Exclui uma imagem
function deleteImage(index) {
  const images = JSON.parse(localStorage.getItem("uploadedImages")) || [];
  images.splice(index, 1); // Remove a imagem pelo índice
  localStorage.setItem("uploadedImages", JSON.stringify(images)); // Atualiza o localStorage
  renderGallery(); // Atualiza a galeria
}

// Renderiza a galeria
function renderGallery() {
  gallery.innerHTML = ""; // Limpa a galeria
  loadImagesFromLocalStorage(); // Recarrega as imagens
}

// Lida com o envio do formulário
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const files = Array.from(photoInput.files);
  const images = [];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result;
      images.push(imageData);

      // Adiciona a imagem à galeria
      createImageElement(imageData, JSON.parse(localStorage.getItem("uploadedImages") || "[]").length);
      saveImagesToLocalStorage([imageData]);
    };
    reader.readAsDataURL(file);
  });
});

// Carrega imagens salvas ao iniciar
renderGallery();
