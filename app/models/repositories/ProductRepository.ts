import BaseRepository from './BaseRepository';
import ProductEntity from '../ProductEntity';
import {IProductRepository} from '../../types';
import WhereClause from './helpers/where/WhereClause';
import {SQLComparison} from '../constants/sql/comparisons';
import WhereContainer from './helpers/where/WhereContainer';
import {DatabaseTableName} from '../constants/databaseTableNames';
import {ProductFieldName} from '../constants/fieldNames/productFieldNames';

export default class ProductRepository extends BaseRepository<ProductEntity> implements IProductRepository {
    public byLookupCode(lookupCode: string): Promise<ProductEntity | undefined> {
        return this.firstOrDefaultWhere({
            whereContainer: new WhereContainer({
                whereClauses: [
                    new WhereClause({
                        tableName: this.tableName,
                        fieldName: ProductFieldName.LOOKUP_CODE,
                        comparison: SQLComparison.EQUALS
                    })
                ]
            })
            , values: { [this.tableName + ProductFieldName.LOOKUP_CODE]: lookupCode.toLowerCase() }
        });
    }

    protected createOne(row: any): ProductEntity {
        var entity = new ProductEntity();
        entity.fillFromRecord(row);
        return entity;
    }

    constructor() {
        super(DatabaseTableName.PRODUCT);
    }
}