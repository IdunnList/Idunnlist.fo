// Function to open artwork detail page
function viewArt(file) {
  localStorage.setItem("selectedArtFile", file);
  window.location.href = "art.html";
}

document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("gallery");
  const artImage = document.getElementById("artImage");
  const artTitle = document.getElementById("artTitle");
  const artDescription = document.querySelector(".art-description");

  try {
    const res = await fetch("artworks.json");
    const artworks = await res.json();

    // --- Render GALLERY (index.html) ---
    if (gallery) {
      artworks.forEach((art) => {
        const card = document.createElement("div");
        card.className = "art-card";
        card.innerHTML = `
          <img src="./images/${art.file}" alt="${art.title}">
          <div class="overlay"><h3>${art.title}</h3></div>
        `;
        card.onclick = () => viewArt(art.file);
        gallery.appendChild(card);
      });
    }

    // --- Render ART PAGE (art.html) ---
    if (artImage && artTitle && artDescription) {
      const selectedFile = localStorage.getItem("selectedArtFile");
      const selectedArt = artworks.find((a) => a.file === selectedFile);

      if (selectedArt) {
        artImage.src = `./images/${selectedArt.file}`;
        artTitle.textContent = selectedArt.title;
        artDescription.textContent = selectedArt.description;
      } else {
        artTitle.textContent = "Artwork not found";
      }
    }
  } catch (err) {
    console.error("Error loading artworks.json:", err);
    if (gallery) gallery.innerHTML = "<p>Failed to load artworks.</p>";
  }
});
