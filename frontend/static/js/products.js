document.addEventListener('DOMContentLoaded', () => {
  fetch('/static/data/products.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(products => {
      const grid = document.getElementById('product-grid');
      if (!grid) return;

      // Clear loading or previous state
      grid.innerHTML = '';

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Prepare the image path with a fallback strategy
        let imagePath = product.image;
        if (!imagePath.startsWith('/static/')) {
          // Assuming your static assets like images live under /static/assets/
          imagePath = `/static/assets/${imagePath}`;
        }

        // Sanitize text to prevent breaking HTML attributes or injection
        const safeName = product.name.replace(/"/g, '&quot;');
        const safeDescription = product.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeLink = product.link;

        card.innerHTML = `
          <img src="${imagePath}"
               alt="${safeName}"
               class="product-img"
               loading="lazy"
          <h3>${safeName}</h3>
          <p>${safeDescription}</p>
          <a href="${safeLink}"
             target="_blank"
             rel="sponsored nofollow noopener noreferrer"
             class="buy-button">
            Buy Now
          </a>
        `;

        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading products:', error);
      const grid = document.getElementById('product-grid');
      if (grid) {
        grid.innerHTML = `
          <div class="error-message">
            <p>⚠️ Failed to load products. Please try again later.</p>
            <button onclick="window.location.reload()">Retry</button>
          </div>
        `;
      }
    });
});
