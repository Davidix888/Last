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

class HashTable {
    private size: number;
    private data: (Student | null)[];

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

    private findNextEmptySlot(startIndex: number): number {
        let index = startIndex;
        while (this.data[index] !== null) {
            index = (index + 1) % this.size;
            if (index === startIndex) {
                throw new Error("La tabla hash está llena");
            }
        }
        return index;
    }

    public insert(student: Student): void {
        let index: number = this.hash(student.getCarnet());
        
        if (this.data[index] !== null) {
            // Si hay colisión, buscar siguiente espacio disponible
            index = this.findNextEmptySlot(index);
        }
        
        this.data[index] = student;
    }

    public search(carnet: string): void {
        const startIndex: number = this.hash(carnet);
        let index = startIndex;
        
        do {
            if (this.data[index] === null) {
                console.log("No se encontró el estudiante con carnet:", carnet);
                return;
            }
            
            if (this.data[index]?.getCarnet() === carnet) {
                console.log("Estudiante encontrado:", this.data[index]?.toString());
                return;
            }
            
            index = (index + 1) % this.size;
        } while (index !== startIndex);
        
        console.log("No se encontró el estudiante con carnet:", carnet);
    }

    public delete(carnet: string): void {
        const startIndex: number = this.hash(carnet);
        let index = startIndex;
        
        do {
            if (this.data[index] === null) {
                console.log(`No se encontró el estudiante con carnet ${carnet} para eliminar.`);
                return;
            }
            
            if (this.data[index]?.getCarnet() === carnet) {
                this.data[index] = null;
                console.log(`Estudiante con carnet ${carnet} eliminado.`);
                return;
            }
            
            index = (index + 1) % this.size;
        } while (index !== startIndex);
        
        console.log(`No se encontró el estudiante con carnet ${carnet} para eliminar.`);
    }

    public printEstudiantes(): void {
        this.data.forEach((student, index) => {
            if (student === null) {
                console.log(`Espacio ${index}: null`);
            } else {
                console.log(`Espacio ${index}: ${student.toString()}`);
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