const uuid = require('uuidv4');
import {IProductRepository} from '../../../types';
import ProductEntity from '../../../models/ProductEntity';
import ProductRepository from '../../../models/repositories/ProductRepository';

export default class ByIdQuery {
    public execute(): Promise<any> {
        var self = this;
        return new Promise<any>((resolveToRouter, rejectToRouter) => {
            self._productRepository.get(self._id)
                .then((productEntity: ProductEntity | undefined) => {
                    if (productEntity) {
                        resolveToRouter(productEntity.toJSON());
                    } else {
                        rejectToRouter({ message: "Not found" });
                    }
                }, (reason: any) => {
                    rejectToRouter(reason);
                })
        });
    }

    private _id: string;
    public get id (): string { return this._id; }
    public set id (value: string) { this._id = value; }

    private _productRepository: IProductRepository;
    public get productRepository (): any { return this._productRepository; }
    public set productRepository (value: any) { this._productRepository = value; }

    constructor({ id = uuid.empty(), productRepository = new ProductRepository() }: any = {}) {
        this._id = id;
        this._productRepository = productRepository;
    }
}