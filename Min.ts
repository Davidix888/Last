class Patient {
    private name: string;
    private priority: number;
    private phone: string;

    constructor(name: string, priority: number, phone: string) {
        this.name = name;
        this.priority = priority;
        this.phone = phone;
    }

    public getName(): string {
        return this.name;
    }

    public getPriority(): number {
        return this.priority;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPriority(newPriority: number): void {
        this.priority = newPriority;
    }
}

class MinHeapEmergency {
    public heap: Patient[];
    private n: number;

    constructor(size: number) {
        this.heap = new Array(size + 1);
        this.n = 0;
    }

    public isEmpty(): boolean {
        return this.n == 0;
    }

    public getQuantity(): number {
        return this.n;
    }

    public insert(patient: Patient): void {
        if (this.n == (this.heap.length - 1)) {
            this.resize(2 * this.heap.length);
        }
        this.n++;
        this.heap[this.n] = patient;
        this.swim(this.n);
    }

    private swim(i: number): void {
        let parent: number = Math.floor(i / 2);
        while (i > 1 && this.heap[parent]!.getPriority() > this.heap[i]!.getPriority()) {
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
            parent = Math.floor(i / 2);
        }
    }

    private resize(newSize: number): void {
        let newHeap: Patient[] = new Array(newSize);
        for (let i = 1; i <= this.n; i++) {
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }

    public getMin(): Patient {
        let min = this.heap[1];
        this.heap[1] = this.heap[this.n];
        this.n--;
        this.sink(1);
        return min;
    }

    private sink(i: number): void {
        while (2 * i <= this.n) {
            let j: number = 2 * i;
            if (j < this.n && this.heap[j]!.getPriority() > this.heap[j + 1]!.getPriority()) {
                j++;
            }
            if (this.heap[i]!.getPriority() <= this.heap[j]!.getPriority()) {
                break;
            }
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
            i = j;
        }
    }

    public showPatients(): void {
        for (let i = 1; i <= this.n; i++) {
            const patient = this.heap[i];
            console.log(`${patient.getName()} - Priridad: ${patient.getPriority()} - Telefono: ${patient.getPhone()}`);
        }
    }

    public updatePriority(name: string, newPriority: number): void {
        for (let i = 1; i <= this.n; i++) {
            if (this.heap[i].getName() === name) {
                const oldPriority = this.heap[i].getPriority();
                this.heap[i].setPriority(newPriority);

                // Ajustar el heap según si la nueva prioridad es mayor o menor que la anterior
                if (newPriority < oldPriority) {
                    this.swim(i);
                } else if (newPriority > oldPriority) {
                    this.sink(i);
                }
                return;
            }
        }
        console.log("Paciente no encontrado.");
    }
}


let emergencyRoom = new MinHeapEmergency(5);

let patient1 = new Patient("Carlos", 5, "13515235");
let patient2 = new Patient("Ana", 8, "23512351");
let patient3 = new Patient("Juan", 3, "12345567");

emergencyRoom.insert(patient1);
emergencyRoom.insert(patient2);
emergencyRoom.insert(patient3);

console.log("Pacientes en espera:");
emergencyRoom.showPatients();
console.log("")
console.log("El paciente con mayor prioridad se ha ido: ", emergencyRoom.getMin().getName())
console.log("")
console.log("Actualizando la prioridad de Carlos a 1:");
emergencyRoom.updatePriority("Carlos", 1);
console.log("")
console.log("Pacientes en espera tras actualización de prioridad:");
emergencyRoom.showPatients();
