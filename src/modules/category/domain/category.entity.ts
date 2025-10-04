export class Category {
    constructor(
        public readonly id: string,
        public name: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) { }
}