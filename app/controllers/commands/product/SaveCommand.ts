const uuid = require('uuidv4');
import {IProductRepository} from '../../../types';
import ProductEntity from '../../../models/ProductEntity';
import {StringExtensions} from '../../../extensions/StringExtensions';
import ProductRepository from '../../../models/repositories/ProductRepository';

export default class SaveCommand {
    public execute(): Promise<any> {
        var self = this;

        return new Promise<any>((resolveToRouter, rejectToRouter) => {
            if (StringExtensions.isNullOrWhitespace(self._productToSave.lookupCode)) {
                rejectToRouter({ status: 422, message: 'Invalid lookup code.' });
            }

            if (StringExtensions.isNullOrWhitespace(self._productToSave.id)) {
                self.saveOnUniqueLookupCode()
                    .then(
                        (productAsJson: any) => { resolveToRouter(productAsJson); }
                        , (reason: any) => { rejectToRouter(reason); }
                        );
            } else {
                self._productRepository.get(self._productToSave.id)
                    .then((existingProductEntity: ProductEntity | undefined) => {
                        if (existingProductEntity) {
                            existingProductEntity.synchronize(self._productToSave);
                            existingProductEntity.save()
                                .then(
                                    (value: string) => { resolveToRouter(existingProductEntity.toJSON()); }
                                    , (reason: any) => { rejectToRouter(reason); }
                                    );
                        } else {
                            self.saveOnUniqueLookupCode()
                                .then(
                                    (productAsJson: any) => { resolveToRouter(productAsJson); }
                                    , (reason: any) => { rejectToRouter(reason); }
                                    );
                        }
                    }, (reason: any) => {
                        rejectToRouter(reason);
                    });
            }
        });
    }

    private saveOnUniqueLookupCode(): Promise<any> {
        var self = this;

        return new Promise<any>((resolve, reject) => {
            self._productRepository.byLookupCode(self._productToSave.lookupCode)
                .then((existingProductEntity: ProductEntity | undefined) => {
                    if (!existingProductEntity) {
                        var newProductEntity = new ProductEntity({
                            lookupCode: (self._productToSave.lookupCode || '')
                            , count: (self._productToSave.count || -1)
                        });
                        newProductEntity.save()
                            .then(
                                (value: string) => { resolve(newProductEntity.toJSON()); }
                                , (reason: any) => { reject(reason); }
                                );
                    } else {
                        reject({ status: 422, message: 'Lookup code already exists.' });
                    }
                }, (reason: any) => {
                    reject(reason);
                });
        });
    }

    private _productToSave: any;
    public get productToSave (): any { return this._productToSave; }
    public set productToSave (value: any) { this._productToSave = value; }

    private _productRepository: IProductRepository;
    public get productRepository (): IProductRepository { return this._productRepository; }
    public set productRepository (value: IProductRepository) { this._productRepository = value; }

    constructor({ productToSave = {}, productRepository = new ProductRepository() }: any = {}) {
        this._productToSave = productToSave;
        this._productRepository = productRepository;
    }
}