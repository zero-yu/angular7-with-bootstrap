export class Product {
    public id: number;
    public title: string;
    public price: number;
    public rating: number;
    public desc: string;
    public categroy: Array<string>
    public comments: Array<ProductComment>
    constructor(id: number, title: string, price: number, rating: number, desc: string, categroy: Array<string>, comments: Array<ProductComment>) {
        this.categroy = categroy;
        this.desc = desc;
        this.id = id;
        this.price = price;
        this.rating = rating;
        this.title = title,
        this.comments = comments
    }
}

export class ProductComment {
    constructor(public id: number, public productID: number, public content: string, public timestamp: string, public user: string, public rating: number) {

    }
}
