class Product {
    private id: number;
    private name: string;
    private price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public toString(): string {
        return `Product ID: ${this.id}, Name: ${this.name}, Price: $${this.price.toFixed(2)}`;
    }
}

class NodeTree {
    private product: Product;
    private father: NodeTree | null;
    private leftChild: NodeTree | null;
    private rightChild: NodeTree | null;

    constructor(product: Product) {
        this.product = product;
        this.father = null;
        this.leftChild = null;
        this.rightChild = null;
    }

    public getProduct(): Product {
        return this.product;
    }

    public setProduct(product: Product): void {
        this.product = product;
    }

    public setFather(newFather: NodeTree | null): void {
        this.father = newFather;
    }

    public getFather(): NodeTree | null {
        return this.father;
    }

    public setLeftChild(newChild: NodeTree | null): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeTree | null {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeTree | null): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeTree | null {
        return this.rightChild;
    }
}

class BST {
    private root: NodeTree | null;

    constructor() {
        this.root = null;
    }

    public insert(product: Product): void {
        const newNode = new NodeTree(product);
        let parent: NodeTree | null = null;
        let current: NodeTree | null = this.root;

        while (current !== null) {
            parent = current;
            if (newNode.getProduct().getPrice() < current.getProduct().getPrice()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        newNode.setFather(parent);
        if (parent === null) {
            this.root = newNode;
        } else if (newNode.getProduct().getPrice() < parent.getProduct().getPrice()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }
    }

    public search(price: number): Product | null {
        let current: NodeTree | null = this.root;

        while (current !== null) {
            if (current.getProduct().getPrice() === price) {
                return current.getProduct();
            } else if (price < current.getProduct().getPrice()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        return null;
    }

    public delete(price: number): void {
        this.root = this.deleteNode(this.root, price);
    }

    private deleteNode(node: NodeTree | null, price: number): NodeTree | null {
        if (node === null) {
            return null;
        }

        if (price < node.getProduct().getPrice()) {
            node.setLeftChild(this.deleteNode(node.getLeftChild(), price));
        } else if (price > node.getProduct().getPrice()) {
            node.setRightChild(this.deleteNode(node.getRightChild(), price));
        } else {
            if (node.getLeftChild() === null && node.getRightChild() === null) {
                return null;
            }
            if (node.getLeftChild() === null) {
                return node.getRightChild();
            } else if (node.getRightChild() === null) {
                return node.getLeftChild();
            }

            const minNode = this.findMinNode(node.getRightChild());
            if (minNode !== null) {
                node.setProduct(minNode.getProduct());
                node.setRightChild(this.deleteNode(node.getRightChild(), minNode.getProduct().getPrice()));
            }
        }
        return node;
    }

    private findMinNode(node: NodeTree | null): NodeTree | null {
        let current = node;
        while (current?.getLeftChild() !== null) {
            current = current.getLeftChild();
        }
        return current;
    }

    public findMinProduct(): Product | null {
        const minNode = this.findMinNode(this.root);
        return minNode ? minNode.getProduct() : null;
    }

    public findMaxProduct(): Product | null {
        let current = this.root;
        while (current?.getRightChild() !== null) {
            current = current.getRightChild();
        }
        return current ? current.getProduct() : null;
    }

    public findProductsInRange(minPrice: number, maxPrice: number): Product[] {
        const productsInRange: Product[] = [];
        this.searchInRange(this.root, minPrice, maxPrice, productsInRange);
        return productsInRange;
    }

    private searchInRange(node: NodeTree | null, minPrice: number, maxPrice: number, productsInRange: Product[]): void {
        if (node === null) return;

        const price = node.getProduct().getPrice();
        if (price >= minPrice) {
            this.searchInRange(node.getLeftChild(), minPrice, maxPrice, productsInRange);
        }
        if (price >= minPrice && price <= maxPrice) {
            productsInRange.push(node.getProduct());
        }
        if (price <= maxPrice) {
            this.searchInRange(node.getRightChild(), minPrice, maxPrice, productsInRange);
        }
    }

    public printAll(): void {
        this.printNode(this.root);
    }

    private printNode(node: NodeTree | null): void {
        if (node === null) return;

        this.printNode(node.getLeftChild());
        console.log(node.getProduct().toString());
        this.printNode(node.getRightChild());
    }
}

// Uso del BST con la clase Product
const bst = new BST();
bst.insert(new Product(1, "Producto A", 10.5));
bst.insert(new Product(2, "Producto B", 5.75));
bst.insert(new Product(3, "Producto C", 20.0));

console.log("Árbol completo:");
bst.printAll();

console.log("Producto con el precio más bajo:");
console.log(bst.findMinProduct()?.toString());

console.log("Producto con el precio más alto:");
console.log(bst.findMaxProduct()?.toString());

console.log("Productos en el rango de precios entre 5 y 15:");
const productsInRange = bst.findProductsInRange(5, 15);
productsInRange.forEach(product => console.log(product.toString()));

console.log("Eliminando el producto con precio 10.5");
bst.delete(10.5);
bst.printAll();
