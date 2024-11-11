class Student {
    private name: string;
    private carnet: string;
    private carrer: string;

    constructor(name: string, carnet: string, carrer: string) {
        this.name = name;
        this.carnet = carnet;
        this.carrer = carrer;
    }

    public getName(): string {
        return this.name;
    }

    public getCarnet(): string {
        return this.carnet;
    }

    public getCarrer(): string {
        return this.carrer;
    }

    public toString(): string {
        return "Carnet: "+this.carnet + " " + "Nombre: "+ this.name + " " + " Carrera: " + this.carrer;
    }
}

class Nodo {
    student: Student;
    next: Nodo | null;

    constructor(student: Student) {
        this.student = student;
        this.next = null;
    }
}

class ListaEnlazada {
    head: Nodo | null;

    constructor() {
        this.head = null;
    }

    public insert(student: Student): void {
        const newnode = new Nodo(student);
        if (this.head === null) {
            this.head = newnode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newnode;
        }
    }

    public searchAll(carnet: string): Student[] {
        let current = this.head;
        const results: Student[] = [];
    
        while (current !== null) {
            if (current.student.getCarnet() === carnet) {
                results.push(current.student);
            }
            current = current.next;
        }
        return results;
    }

    public delete(carnet: string): boolean {
        if (this.head === null) return false;

        if (this.head.student.getCarnet() === carnet) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.student.getCarnet() === carnet) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    public print(): string {
        const students: string[] = [];
        let current = this.head;
        while (current !== null) {
            students.push(current.student.toString());
            current = current.next;
        }
        return students.join(", ");
    }
}

class HashTable {
    private size: number;
    private data: (ListaEnlazada | null)[];

    constructor() {
        this.size = 10;
        this.data = new Array(this.size).fill(null);
    }

    private hash(carnet: string): number {
        let numericPart = 0;
        for (let i = 0; i < carnet.length; i++) {
            const charCode = carnet.charCodeAt(i);
            if (charCode >= 48 && charCode <= 57) {
                numericPart = numericPart * 10 + (charCode - 48);
            }
        }
        return (numericPart * 31 + 7) % this.size;
    }

    public insert(student: Student): void {
        const index: number = this.hash(student.getCarnet());
        if (this.data[index] === null) {
            this.data[index] = new ListaEnlazada();
        }
        this.data[index]!.insert(student);
    }

    public search(carnet: string): void {
        const index: number = this.hash(carnet);
        if (this.data[index] !== null) {
            const students = this.data[index]!.searchAll(carnet);
            if (students.length > 0) {
                students.forEach(student => {
                    console.log("Estudiante encontrado:", student.toString());
                });
            } else {
                console.log("No se encontraron estudiantes con el carnet:", carnet);
            }
        } else {
            console.log("No se encontraron estudiantes con el carnet:", carnet);
        }
    }

    public delete(carnet: string): void {
        const index: number = this.hash(carnet);
        if (this.data[index] !== null) {
            const deleted = this.data[index]!.delete(carnet);
            if (deleted) {
                console.log(`Estudiante con carnet ${carnet} eliminado.`);
            } else {
                console.log(`No se encontró el estudiante con carnet ${carnet} para eliminar.`);
            }
        } else {
            console.log(`No se encontró el estudiante con carnet ${carnet} para eliminar.`);
        }
    }

    public printEstudiantes(): void {
        this.data.forEach((slot, index) => {
            if (slot === null) {
                console.log(`Espacio ${index}: null`);
            } else {
                console.log(`Espacio ${index}: ${slot.print()}`);
            }
        });
    }
}

// Crear instancias de estudiantes
const student1 = new Student("Alice", "EST1521223", "Computer Science");
const student2 = new Student("Bob", "EST1614255", "Mathematics");
const student3 = new Student("Charlie", "EST2614213", "Physics");
const student4 = new Student("David", "EST1523156", "Engineering");

const hashTable = new HashTable();

hashTable.insert(student1);
hashTable.insert(student2);
hashTable.insert(student3);
hashTable.insert(student4);
console.log("")
console.log("Tabla:");
hashTable.printEstudiantes();
console.log("")
console.log("Buscar:");
hashTable.search("EST1521223");
console.log("")
console.log("Eliminar:");
hashTable.delete("EST1523156");
console.log("")
console.log("Tabla:");
hashTable.printEstudiantes();
