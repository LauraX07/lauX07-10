document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const files = document.getElementById('photoInput').files;
    const apiKey = 'e8352eed09465a8ae69f73a2809a9b12'; // Sua chave da API
    const gallery = document.getElementById('gallery');
    
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
        // Adicionar imagem à galeria
        const img = document.createElement('img');
        img.src = data.data.url; // URL da imagem no ImgBB
        gallery.appendChild(img);
      } else {
        console.error('Erro ao enviar a imagem:', data.error);
      }
    }
  });
  