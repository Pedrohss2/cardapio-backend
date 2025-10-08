export class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public price: number,
        public image?: string,
        public categoryId?: string
    ) { }

}