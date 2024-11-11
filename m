class Palabra{
    private id: number;
    private palabra: string;
    private descripcion: string;

    constructor(id: number, palabra: string, descripcion: string){
        this.id = id;
        this.palabra = palabra;
        this.descripcion = descripcion;
    }
    
    getId(): number {
        return this.id;
    }

    getPalabra(): string {
        return this.palabra;
    }

    getDescripcion(): string{
        return this.descripcion;
    }


}
class NodeRBT {
    private data: number;
    private father!: NodeRBT;
    private leftChild!: NodeRBT; 
    private rightChild!: NodeRBT; 
    private color: string;

    constructor(data: number, isLeaf?: boolean) {
        this.data = data;
        this.color = "RED";
        if (isLeaf)
            this.color = "BLACK";
    }

    public getData(): number {
        return this.data;
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
}

class RBTree {
    private root: NodeRBT;
    private leaf: NodeRBT;

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() == "RED") {
            // si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // significa que el tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // significa que el tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // comprobamos si testNode es hijo izquierdo
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
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() != this.leaf)
            y.getLeftChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getLeftChild())
            x.getFather().setLeftChild(y);
        else
            x.getFather().setRightChild(y);
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() != this.leaf)
            y.getRightChild().setFather(x);
        y.setFather(x.getFather());
        if (x.getFather() == this.leaf)
            this.root = y;
        else if (x === x.getFather().getRightChild())
            x.getFather().setRightChild(y);
        else
            x.getFather().setLeftChild(y);
        y.setRightChild(x);
        x.setFather(y);
    }    

    public insert(data: number): void {
        // Inserción normal de BST
        let newNode: NodeRBT = new NodeRBT(data);
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        // Los RBT por la propiedad 5 inserta un nodo hoja a los hijos izquierdo y derecho
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);
        // Continua inserción normal de BST
        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        // Propiedades del RBT
        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack()
            return;
        }
        if (newNode.getFather().getFather() == this.leaf)
            return;
        // corregir inserción
        this.fixInsert(newNode);
    }

    public search(data: number): NodeRBT | null {
        let current: NodeRBT = this.root;
    
        while (current !== this.leaf) {
            if (data === current.getData()) {
                return current; // nodo encontrado
            } else if (data < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
    
        return null; // nodo no encontrado
    }

    public delete(data: number): void {
        let nodeToDelete = this.search(data);
        if (nodeToDelete === null) {
            console.log("El nodo no existe en el árbol");
            return;
        }
    
        let y = nodeToDelete;
        let yOriginalColor = y.getColor();
        let x: NodeRBT;
    
        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.rotate(nodeToDelete, nodeToDelete.getRightChild());
        } else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.rotate(nodeToDelete, nodeToDelete.getLeftChild());
        } else {
            y = this.get_min(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();
            if (y.getFather() === nodeToDelete) {
                x.setFather(y);
            } else {
                this.rotate(y, y.getRightChild());
                y.setRightChild(nodeToDelete.getRightChild());
                y.getRightChild().setFather(y);
            }
            this.rotate(nodeToDelete, y);
            y.setLeftChild(nodeToDelete.getLeftChild());
            y.getLeftChild().setFather(y);

            if (nodeToDelete.getColor() === "BLACK") {
                y.setNodeAsBlack();
            } else {
                y.setNodeAsRed();
            }
        }
    
        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }
    
    private rotate(testNode: NodeRBT, currentNode: NodeRBT): void {
        if (testNode.getFather() === this.leaf) {
            this.root = currentNode;
        } else if (testNode === testNode.getFather().getLeftChild()) {
            testNode.getFather().setLeftChild(currentNode);
        } else {
            testNode.getFather().setRightChild(currentNode);
        }
        currentNode.setFather(testNode.getFather());
    }
    
    private get_min(node: NodeRBT): NodeRBT {
        while (node.getLeftChild() !== this.leaf) {
            node = node.getLeftChild();
        }
        return node;
    }
    
    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let w = x.getFather().getRightChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    w = x.getFather().getRightChild();
                }
                if (w.getLeftChild().getColor() === "BLACK" && w.getRightChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getRightChild().getColor() === "BLACK") {
                        w.getLeftChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.rightRotate(w);
                        w = x.getFather().getRightChild();
                    }
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsBlack();
                    w.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let w = x.getFather().getLeftChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    w = x.getFather().getLeftChild();
                }
                if (w.getRightChild().getColor() === "BLACK" && w.getLeftChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getLeftChild().getColor() === "BLACK") {
                        w.getRightChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.leftRotate(w);
                        w = x.getFather().getLeftChild();
                    }
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsBlack();
                    w.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }    
    
}

// Evaluación final - 1a convocatoria
const myRBTree: RBTree = new RBTree();
myRBTree.insert(2);
myRBTree.insert(4);
myRBTree.insert(6);
myRBTree.insert(12);
myRBTree.insert(8);

let node_search = myRBTree.search(12);
if (node_search !== null) {
    console.log("Número encontrado:", node_search.getData());
} else {
    console.log("El número no se encuentra en el árbol");
}

console.log("Eliminando nodo...")
myRBTree.delete(8);
private delete(id: number): void {
    let nodeToDelete = this.search(id);
    if (nodeToDelete === null) {
        console.log("El nodo no existe en el árbol");
        return;
    }

    let y = nodeToDelete;
    let yOriginalColor = y.getColor();
    let x: NodeRBT;

    if (nodeToDelete.getLeftChild() === this.leaf) {
        x = nodeToDelete.getRightChild();
        this.rotate(nodeToDelete, nodeToDelete.getRightChild());
    } else if (nodeToDelete.getRightChild() === this.leaf) {
        x = nodeToDelete.getLeftChild();
        this.rotate(nodeToDelete, nodeToDelete.getLeftChild());
    } else {
        y = this.getMin(nodeToDelete.getRightChild());
        yOriginalColor = y.getColor();
        x = y.getRightChild();
        if (y.getFather() === nodeToDelete) {
            x.setFather(y);
        } else {
            this.rotate(y, y.getRightChild());
            y.setRightChild(nodeToDelete.getRightChild());
            y.getRightChild().setFather(y);
        }
        this.rotate(nodeToDelete, y);
        y.setLeftChild(nodeToDelete.getLeftChild());
        y.getLeftChild().setFather(y);
        y.setNodeAsBlack();
    }

    if (yOriginalColor === "BLACK") {
        this.fixDelete(x);
    }
}

private fixDelete(x: NodeRBT): void {
    while (x !== this.root && x.getColor() === "BLACK") {
        if (x === x.getFather().getLeftChild()) {
            let w = x.getFather().getRightChild();
            if (w.getColor() === "RED") {
                w.setNodeAsBlack();
                x.getFather().setNodeAsRed();
                this.leftRotate(x.getFather());
                w = x.getFather().getRightChild();
            }
            if (w.getLeftChild().getColor() === "BLACK" && w.getRightChild().getColor() === "BLACK") {
                w.setNodeAsRed();
                x = x.getFather();
            } else {
                if (w.getRightChild().getColor() === "BLACK") {
                    w.getLeftChild().setNodeAsBlack();
                    w.setNodeAsRed();
                    this.rightRotate(w);
                    w = x.getFather().getRightChild();
                }
                w.setColor("BLACK");
                x.getFather().setColor("BLACK");
                w.getRightChild().setColor("BLACK");
                this.leftRotate(x.getFather());
                x = this.root;
            }
        } else {
            let w = x.getFather().getLeftChild();
            if (w.getColor() === "RED") {
                w.setNodeAsBlack();
                x.getFather().setNodeAsRed();
                this.rightRotate(x.getFather());
                w = x.getFather().getLeftChild();
            }
            if (w.getRightChild().getColor() === "BLACK" && w.getLeftChild().getColor() === "BLACK") {
                w.setNodeAsRed();
                x = x.getFather();
            } else {
                if (w.getLeftChild().getColor() === "BLACK") {
                    w.getRightChild().setNodeAsBlack();
                    w.setNodeAsRed();
                    this.leftRotate(w);
                    w = x.getFather().getLeftChild();
                }
                w.setNodeAsBlack();
                x.getFather().setNodeAsBlack();
                w.getLeftChild().setNodeAsBlack();
                this.rightRotate(x.getFather());
                x = this.root;
            }
        }
    }
    x.setNodeAsBlack();
}

private rotate(testNode: NodeRBT, currentNode: NodeRBT): void {
    if (testNode.getFather() === this.leaf) {
        this.root = currentNode;
    } else if (testNode === testNode.getFather().getLeftChild()) {
        testNode.getFather().setLeftChild(currentNode);
    } else {
        testNode.getFather().setRightChild(currentNode);
    }
    currentNode.setFather(testNode.getFather());
}

private getMin(node: NodeRBT): NodeRBT {
    while (node.getLeftChild() !== this.leaf) {
        node = node.getLeftChild();
    }
    return node;
}
