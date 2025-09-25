export class Product {
    constructor(
        public readonly id: number,
        public name: string,
        public description: string,
        public price: number,
        public categoryId?: number
    ) { }

}