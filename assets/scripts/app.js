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

class Component {
    constructor(renderHookId) {
        this.hoodId = renderHookId;
    }
    
    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attrName, attrValue);
            }
        }
        document.getElementById(this.hoodId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}<h2>`;
    }

    get totalAmount() {
        console.log(this.items)

        const sum = this.items.reduce( (prevValue, curItem) => 
            prevValue + curItem.price
        , 0);
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2>Total: \$${0}<h2>
            <button>Order Now!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
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
            'A soft pillow!',
            19.99,
        ),
        new Product(
            'A Carpet', 
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wollteppich_1.jpg/1200px-Wollteppich_1.jpg',
            'A carpet which you might like - or not.',
            89.99,
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

        this.cart = new ShoppingCart('app');
        this.cart.render();
        const productList = new ProductList();
        const prodListEl = productList.render();
       
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
        this.cart.addProduct(product);
    }
}

App.init();