document.addEventListener('DOMContentLoaded', () => {
  fetch('/products/api/')
    .then(response => response.json())
    .then(products => {
      const grid = document.getElementById('product-grid');

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageUrl = product.image.startsWith('http')
          ? product.image
          : `${window.location.origin}${product.image}`;

        card.innerHTML = `
          <img src="${imageUrl}" alt="${product.name}" class="product-img"/>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <a 
            href="${product.link}" 
            target="_blank" 
            rel="sponsored nofollow noopener noreferrer" 
            class="buy-button"
          >
            Buy Now
          </a>
        `;

        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });
});
