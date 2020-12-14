export interface IFabricItem {
    id: number;
    name: string;
    width: number;
    length: number;
    grammage: number;
    price: number;
    created_at: Date;
    updated_at: Date;
}

export interface IFabricItems {
    data: Array<IFabricItem>;
    limit: number;
    page: number;
    pages: number;
    total: number;
}

export class Fabric implements IFabricItem, IFabricItems {
    id: number;
    name: string;
    width: number;
    length: number;
    grammage: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    data: Array<IFabricItem>;
    limit: number;
    page: number;
    pages: number;
    total: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public get $data(): Array<IFabricItem> { return this.data; }
    public get $limit(): number { return this.limit; }
    public get $page(): number { return this.page; }
    public get $pages(): number { return this.pages; }
    public get $total(): number { return this.total; }

    public set $data(value: Array<IFabricItem>) {this.data = value; }
    public set $limit(value: number) { this.limit = value; }
    public set $page(value: number) { this.page = value; }
    public set $pages(value: number) { this.pages = value; }
    public set $total(value: number) { this.total = value; }

}
