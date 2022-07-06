"use strict";
exports.__esModule = true;
exports.CashMachine = void 0;
var CashMachine = /** @class */ (function () {
    function CashMachine(note) {
        if (note === void 0) { note = [
            { "note": 200, "quantity": 10 },
            { "note": 100, "quantity": 10 },
            { "note": 50, "quantity": 10 },
            { "note": 20, "quantity": 10 },
            { "note": 10, "quantity": 10 },
            { "note": 5, "quantity": 10 },
            { "note": 2, "quantity": 10 }
        ]; }
        this.notes = note;
    }
    CashMachine.prototype.getNotes = function () {
        return this.notes;
    };
    CashMachine.prototype.isAmountPossible = function (amount) {
        var stringAmount = amount.toString();
        var check = stringAmount[stringAmount.length - 1];
        if (Number(check) === 1 || Number(check) === 3) {
            return true;
        }
        return false;
    };
    CashMachine.prototype.withdraw = function (amount) {
        var _a, _b, _c;
        var rest = 0;
        var finalNotes = [];
        var totalNotes = 0;
        if (this.isAmountPossible(amount)) {
            throw new Error('Não é possível sacar esse valor');
        }
        for (var i = 0; i < this.notes.length; i++) {
            if (amount < this.notes[i].note) {
                continue;
            }
            totalNotes = Math.floor(amount / this.notes[i].note);
            rest = amount % this.notes[i].note;
            if (this.notes[i].note === 5 && (rest === 1 || rest === 3)) {
                finalNotes.push((_a = {}, _a[this.notes[i].note] = totalNotes - 1, _a));
                totalNotes = 0;
            }
            else if (this.notes[i].quantity >= totalNotes) {
                finalNotes.push((_b = {}, _b[this.notes[i].note] = totalNotes, _b));
                this.notes[i].quantity -= totalNotes;
                amount = rest;
                totalNotes = 0;
            }
            else if (this.notes[i].quantity > 0) {
                finalNotes.push((_c = {}, _c[this.notes[i].note] = this.notes[i].quantity, _c));
                amount -= this.notes[i].quantity * this.notes[i].note;
                this.notes[i].quantity = 0;
            }
            else {
                continue;
            }
        }
        console.log(amount);
        if (amount > 0) {
            throw new Error('Não há notas suficiente em caixa para o saque');
        }
        else {
            return finalNotes;
        }
    };
    return CashMachine;
}());
exports.CashMachine = CashMachine;
var test = new CashMachine();
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
