const db = require("../config/db.postgres");

async function test() {
    const dbResult = await db.any("SELECT * FROM users");
    console.log(dbResult);
    
}
test();


class User {
    #id; #name; #email;

    constructor({ id, name, email }) {
        this.#id = id;
        this.setName(name);
        this.setEmail(email);
    }

    // ---------- Validation + Factory ----------
    static create({ id, name, email }) {
        if (typeof name !== "string" || !name.trim()) {
            throw new Error("Name must be a non-empty string");
        }
        // if (typeof email !== "string") {
        //     throw new Error("Email must be a positive number");
        // }
        return new User({ id, name: name.trim(), email });
    }
    // ---------- Encapsulation ----------
    get id() { return this.#id; }
    get name() { return this.#name; }
    get email() { return this.#email; }

    setName(name) {
        if (typeof name !== "string" || !name.trim()) throw new Error("Invalid name");
        this.#name = name.trim();
    }
    setEmail(email) {
        if (typeof email !== "number" || email < 0) throw new Error("Invalid email");
        this.#email = email;
    }

    toJSON() { return { id: this.#id, name: this.#name, email: this.#email } }

    // ---------- "Persistance" en mémoire ----------
    static #data = [];

    static nextId() { return Date.now(); }
    
    static findAll() {
        return this.#data.map(u => u.toJSON());
    }

    static findById(id) {
        const u = this.#data.find(u => u.id === id);
        return u ? u.toJSON() : null;
    }

    static createOne({ name, email }) {
        const user = User.create({ id: this.nextId(), name, email });
        this.#data.push(user);
        return user.toJSON();
    }

    static updateOne(id, dto) {
        const idx = this.#data.findIndex(u => u.id === id);
        if (idx === -1) return null;

        // Mise à jour avec validation via setters
        if (dto.name !== undefined) this.#data[idx].setName(dto.name);

        if (dto.email !== undefined) this.#data[idx].setEmail(dto.email);

        return this.#data[idx].toJSON();
    }
    
    static deleteOne(id) {
        const before = this.#data.length;
        this.#data = this.#data.filter(u => u.id !== id);
        return this.#data.length !== before; // true si supprimé
    }
}

module.exports = User;