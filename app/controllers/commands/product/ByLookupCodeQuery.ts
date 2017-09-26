import {IProductRepository} from '../../../types';
import ProductEntity from '../../../models/ProductEntity';
import ProductRepository from '../../../models/repositories/ProductRepository';

export default class ByLookupCodeQuery {
    public execute(): Promise<any> {
        var self = this;
        return new Promise<any>((resolveToRouter, rejectToRouter) => {
            self._productRepository.byLookupCode(self._lookupCode)
                .then((productEntity: ProductEntity | undefined) => {
                    if (productEntity) {
                        resolveToRouter(productEntity.toJSON());
                    } else {
                        rejectToRouter({ status: 404, message: "Not found" });
                    }
                }, (reason: any) => {
                    rejectToRouter(reason);
                })
        });
    }

    private _lookupCode: string;
    public get lookupCode (): string { return this._lookupCode; }
    public set lookupCode (value: string) { this._lookupCode = value; }

    private _productRepository: IProductRepository;
    public get productRepository (): IProductRepository { return this._productRepository; }
    public set productRepository (value: IProductRepository) { this._productRepository = value; }

    constructor({ lookupCode = '', productRepository = new ProductRepository() }: any = {}) {
        this._lookupCode = lookupCode;
        this._productRepository = productRepository;
    }
}