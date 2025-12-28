export class Product {
    constructor(
        public readonly id: string,
        public name: string,
        public description: string,
        public price: number,
        public categoryId: string,
        public readonly companyId: string,
        public image?: string,
    ) { }

}