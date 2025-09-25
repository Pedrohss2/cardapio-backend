export class Category {
    constructor(
        public readonly id: number,
        public name: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) { }
}