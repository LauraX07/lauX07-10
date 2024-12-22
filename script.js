document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const files = document.getElementById('photoInput').files;
    const apiKey = 'e8352eed09465a8ae69f73a2809a9b12'; // Sua chave da API
    const gallery = document.getElementById('gallery');
    const images = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        // Enviar a imagem para o ImgBB
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.data.url) {
            // Adicionar imagem à galeria do ImgBB
            const img = document.createElement('img');
            img.src = data.data.url; // URL pública da imagem no ImgBB
            gallery.appendChild(img);

            // Salva a URL da imagem no localStorage (para exibir posteriormente)
            images.push(data.data.url);
            saveImagesToLocalStorage(images);
        } else {
            console.error('Erro ao enviar a imagem:', data.error);
        }
    }
});

// Salva URLs de imagens no localStorage
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
    img.src = imageData; // A URL da imagem salva
    img.alt = "Uploaded Image";
    img.className = "uploaded-image";

    container.appendChild(img);
    gallery.appendChild(container);
}

// Renderiza a galeria
function renderGallery() {
    gallery.innerHTML = ""; // Limpa a galeria
    loadImagesFromLocalStorage(); // Recarrega as imagens
}

// Carrega imagens salvas ao iniciar
renderGallery();
