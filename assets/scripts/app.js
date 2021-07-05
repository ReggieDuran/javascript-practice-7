const productList = {
    products: [
        {
            title: 'A Pillow',
            imageUrl: 'https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=6&m=899226398&s=612x612&w=0&h=JtsWJqDPEQGmJnqWCkgUcHGHhCmjId1OkELo-uVeY-o=',
            price: 19.99,
            description: 'A soft pillow!'
        },
        {
            title: 'A Carpet',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wollteppich_1.jpg/1200px-Wollteppich_1.jpg',
            price: 89.99,
            description: 'A carpet which you might like - or not.'
        },
    ],
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul'); 
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}" >
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;

            prodList.append(prodEl);
            console.log(prodList);

        }
        renderHook.append(prodList);
    }
}

productList.render();