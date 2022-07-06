interface INotes {
    "note": number,
    "quantity": number
}

export class CashMachine {
    private notes: INotes[];
    constructor(note: INotes[] = [
        { "note": 200, "quantity": 10 },
        { "note": 100, "quantity": 10 },
        { "note": 50, "quantity": 10 },
        { "note": 20, "quantity": 10 },
        { "note": 10, "quantity": 10 },
        { "note": 5, "quantity": 10 },
        { "note": 2, "quantity": 10 }
    ]) {
        this.notes = note;
    }

    public getNotes() {
        return this.notes;
    }

    private isAmountPossible(amount: number){
        const stringAmount = amount.toString();
        const check = stringAmount[stringAmount.length-1];
        if(Number(check) === 1 || Number(check) === 3){
            return true;
        }
        return false;
    }

    public withdraw(amount: number){
        let rest = 0;
        let finalNotes: Partial<INotes>[] = [];
        let totalNotes = 0;
        if(this.isAmountPossible(amount)){
            throw new Error('Não é possível sacar esse valor')
        }
        for(let i=0; i<this.notes.length; i++){
            if(amount < this.notes[i].note){
                continue;
            }
            totalNotes = Math.floor(amount / this.notes[i].note);
            rest = amount % this.notes[i].note;
            if(this.notes[i].note === 5 && (rest === 1 || rest === 3)){
                finalNotes.push({ [this.notes[i].note]: totalNotes - 1 });
                totalNotes = 0;
            } else if(this.notes[i].quantity >= totalNotes){
                finalNotes.push({ [this.notes[i].note]: totalNotes });
                this.notes[i].quantity -= totalNotes;
                amount = rest;
                totalNotes = 0;
            } else if(this.notes[i].quantity > 0){
                finalNotes.push({ [this.notes[i].note]: this.notes[i].quantity });
                amount -= this.notes[i].quantity * this.notes[i].note;
                this.notes[i].quantity = 0;
            } else {
                continue;
            }
        }
        console.log(amount)
        if(amount > 0){
            throw new Error('Não há notas suficiente em caixa para o saque');
        } else {
            return finalNotes;
        }
    }
}

const test = new CashMachine();

console.log(test.withdraw(3000));
console.log(test.getNotes());

console.log(test.withdraw(156));
console.log(test.getNotes());

console.log(test.withdraw(168));
console.log(test.getNotes());

console.log(test.withdraw(76));
console.log(test.getNotes());

console.log(test.withdraw(210));
console.log(test.getNotes());

console.log(test.withdraw(260));
console.log(test.getNotes());

console.log(test.withdraw(3000));
console.log(test.getNotes());





