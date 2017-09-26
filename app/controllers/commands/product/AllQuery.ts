import {IProductRepository} from '../../../types';
import ProductEntity from '../../../models/ProductEntity';
import ProductRepository from '../../../models/repositories/ProductRepository';

export default class AllQuery {
    public execute(): Promise<any> {
        var self = this;
        return new Promise<any>((resolveToRouter, rejectToRouter) => {
            self._productRepository.all()
                .then((productEntities: ProductEntity[]) => {
                    resolveToRouter(
                        productEntities.map((productEntity: ProductEntity) => {
                            return productEntity.toJSON()
                        }));
                }, (reason: any) => {
                    rejectToRouter(reason);
                })
        });
    }

    private _productRepository: IProductRepository;
    public get productRepository (): IProductRepository { return this._productRepository; }
    public set productRepository (value: IProductRepository) { this._productRepository = value; }

    constructor({ productRepository = new ProductRepository() }: any = {}) {
        this._productRepository = productRepository;
    }
}