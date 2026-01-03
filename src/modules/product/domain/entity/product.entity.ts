export class Product {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public categoryId: string,
        public readonly companyId: string,
        public readonly id?: string,
        public image?: string,
    ) { }

}