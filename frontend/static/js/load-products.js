fetch('data/products.json')
  .then(res => res.json())
  .then(products => {
    const grid = document.getElementById("product-grid");
    products.forEach(product => {
      const card = `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <a href="${product.link}" target="_blank">View Product</a>
        </div>
      `;
      grid.innerHTML += card;
    });
  });
