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

class NodeRBT {
    private product: Product;
    private father!: NodeRBT;
    private leftChild!: NodeRBT;
    private rightChild!: NodeRBT;
    private color: string;

    constructor(product: Product, isLeaf = false) {
        this.product = product;
        this.color = isLeaf ? "BLACK" : "RED";
    }

    public getProduct(): Product {
        return this.product;
    }

    public setFather(newFather: NodeRBT): void {
        this.father = newFather;
    }

    public getFather(): NodeRBT {
        return this.father;
    }

    public setLeftChild(newChild: NodeRBT): void {
        this.leftChild = newChild;
    }

    public getLeftChild(): NodeRBT {
        return this.leftChild;
    }

    public setRightChild(newChild: NodeRBT): void {
        this.rightChild = newChild;
    }

    public getRightChild(): NodeRBT {
        return this.rightChild;
    }

    public setNodeAsRed(): void {
        this.color = "RED";
    }

    public setNodeAsBlack(): void {
        this.color = "BLACK";
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
    }
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(new Product(0, "", 0), true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        // Mismo código de corrección de inserción
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                let uncle = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                let uncle = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        // Rotación a la izquierda
        let y = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) this.root = y;
        else if (x === x.getFather().getLeftChild()) x.getFather().setLeftChild(y);
        else x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        // Rotación a la derecha
        let y = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf) y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) this.root = y;
        else if (x === x.getFather().getRightChild()) x.getFather().setRightChild(y);
        else x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }

    private transplant(u: NodeRBT, v: NodeRBT): void {
        // Transplante de nodos
        if (u.getFather() === this.leaf) this.root = v;
        else if (u === u.getFather().getLeftChild()) u.getFather().setLeftChild(v);
        else u.getFather().setRightChild(v);
        v.setFather(u.getFather());
    }

    private minimum(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }

    private fixDelete(x: NodeRBT): void {
        // Corrección tras la eliminación
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let sibling = x.getFather().getRightChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    sibling = x.getFather().getRightChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (sibling.getRightChild().getColor() === "BLACK") {
                        sibling.getLeftChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.rightRotate(sibling);
                        sibling = x.getFather().getRightChild();
                    }
                    sibling.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let sibling = x.getFather().getLeftChild();
                if (sibling.getColor() === "RED") {
                    sibling.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    sibling = x.getFather().getLeftChild();
                }
                if (sibling.getLeftChild().getColor() === "BLACK" && sibling.getRightChild().getColor() === "BLACK") {
                    sibling.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (sibling.getLeftChild().getColor() === "BLACK") {
                        sibling.getRightChild().setNodeAsBlack();
                        sibling.setNodeAsRed();
                        this.leftRotate(sibling);
                        sibling = x.getFather().getLeftChild();
                    }
                    sibling.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    sibling.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }

    public insert(product: Product): void {
        let newNode = new NodeRBT(product);
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        let parent = this.leaf;
        let current = this.root;

        while (current !== this.leaf) {
            parent = current;
            current = newNode.getProduct().getPrice() < current.getProduct().getPrice()
                ? current.getLeftChild()
                : current.getRightChild();
        }

        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getProduct().getPrice() < parent.getProduct().getPrice()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }

        this.fixInsert(newNode);
    }

    public delete(price: number): void {
        let z = this.search(price);
        if (z === this.leaf) return;

        let y = z;
        let yOriginalColor = y.getColor();
        let x: NodeRBT;

        if (z.getLeftChild() === this.leaf) {
            x = z.getRightChild();
            this.transplant(z, z.getRightChild());
        } else if (z.getRightChild() === this.leaf) {
            x = z.getLeftChild();
            this.transplant(z, z.getLeftChild());
        } else {
            y = this.minimum(z.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();

            if (y.getFather() === z) {
                x.setFather(y);
            } else {
                this.transplant(y, y.getRightChild());
                y.setRightChild(z.getRightChild());
                y.getRightChild().setFather(y);
            }

            this.transplant(z, y);
            y.setLeftChild(z.getLeftChild());
            y.getLeftChild().setFather(y);
            y.setColor(z.getColor());
        }

        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    public search(price: number): NodeRBT {
        let current = this.root;
        while (current !== this.leaf && price !== current.getProduct().getPrice()) {
            current = price < current.getProduct().getPrice()
                ? current.getLeftChild()
                : current.getRightChild();
        }
        return current;
    }

    public printAll(): void {
        this.printNode(this.root);
    }

    private printNode(node: NodeRBT): void {
        if (node.getLeftChild() !== this.leaf) this.printNode(node.getLeftChild());
        console.log(node.getProduct().toString() + ` (${node.getColor()})`);
        if (node.getRightChild() !== this.leaf) this.printNode(node.getRightChild());
    }

        // Encuentra el producto con el precio más bajo
    public findMinProduct(): Product | null {
        let node = this.minimum(this.root);
        return node !== this.leaf ? node.getProduct() : null;
    }
    
        // Encuentra el producto con el precio más alto
    public findMaxProduct(): Product | null {
        let node = this.root;
        while (node.getRightChild() !== this.leaf) {
            node = node.getRightChild();
        }
        return node !== this.leaf ? node.getProduct() : null;
    }
    
        // Encuentra todos los productos cuyo precio esté dentro de un rango
    public findProductsInRange(minPrice: number, maxPrice: number): Product[] {
        const productsInRange: Product[] = [];
        this.searchInRange(this.root, minPrice, maxPrice, productsInRange);
        return productsInRange;
    }
    
        // Método auxiliar para buscar en un rango específico
    private searchInRange(node: NodeRBT, minPrice: number, maxPrice: number, productsInRange: Product[]): void {
        if (node === this.leaf) return;
    
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
    
    }



const rbTree = new RBTree();
const product1 = new Product(10, "Producto 1", 12.99);
const product2 = new Product(20, "Producto 2", 8.99);
const product3 = new Product(30, "Producto 3", 15.99);

rbTree.insert(product1);
rbTree.insert(product2);
rbTree.insert(product3);


console.log("Producto con el precio más bajo:");
console.log(rbTree.findMinProduct()?.toString());

console.log("Producto con el precio más alto:");
console.log(rbTree.findMaxProduct()?.toString());

console.log("Productos con precios entre 10 y 16:");
const productsInRange = rbTree.findProductsInRange(10, 16);
productsInRange.forEach(product => console.log(product.toString()));

rbTree.printAll();