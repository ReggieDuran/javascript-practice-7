class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ShoppingCart {
    item = [];

    addProduct(product) {
        this.item.push(product);
        this.totalOutput.innerHTML = `<h2>Total: \$${1}<h2>`;
    }

    render() {
        const cartEl = document.createElement('section');
        cartEl.className = 'cart';
        cartEl.innerHTML = `
            <h2>Total: \$${0}<h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" >
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;

        const addToCartButton = prodEl.querySelector('button');
        addToCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}

class ProductList {
    products = [
        new Product(
            'A Pillow', 
            'https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=6&m=899226398&s=612x612&w=0&h=JtsWJqDPEQGmJnqWCkgUcHGHhCmjId1OkELo-uVeY-o=',
            19.99,
            'A soft pillow!'
        ),
        new Product(
            'A Carpet', 
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wollteppich_1.jpg/1200px-Wollteppich_1.jpg',
            89.99,
            'A carpet which you might like - or not.'
        ),
        // {
        //     title: 'A Pillow',
        //     imageUrl: 'https://media.istockphoto.com/photos/pillow-isolated-on-white-background-picture-id899226398?k=6&m=899226398&s=612x612&w=0&h=JtsWJqDPEQGmJnqWCkgUcHGHhCmjId1OkELo-uVeY-o=',
        //     price: 19.99,
        //     description: 'A soft pillow!'
        // },
        // {
        //     title: 'A Carpet',
        //     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wollteppich_1.jpg/1200px-Wollteppich_1.jpg',
        //     price: 89.99,
        //     description: 'A carpet which you might like - or not.'
        // },
    ];
    
    constructor() {}

    render() {
        const prodList = document.createElement('ul'); 
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render();
            prodList.append(prodEl);
        }

        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');

        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();
       
        renderHook.append(cartEl); 
        renderHook.append(prodListEl);
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        console.log(this.cart, product)
        this.cart.addProduct(product);
    }
}

App.init();