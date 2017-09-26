import * as restify from 'restify';
import {logger} from '../services/logger';
import RouteController from './RouteController';
import AllProductsQuery from './commands/product/AllQuery';
import ProductByIdQuery from './commands/product/ByIdQuery';
import ProductSaveCommand from './commands/product/SaveCommand';
import ProductByLookupCodeQuery from './commands/product/ByLookupCodeQuery';

export default class ProductRouteController extends RouteController {
	public queryAllProducts(req: restify.Request, res: restify.Response, next: restify.Next) {
		(new AllProductsQuery())
			.execute()
			.then((body: any) => {
				res.send(201, body);
				return next();
			}, (reason: any) => {
				return next(new Error(reason.message));
			});
	}

	public queryProductById(req: restify.Request, res: restify.Response, next: restify.Next) {
		(new ProductByIdQuery({ id: req.params.id }))
			.execute()
			.then((body: any) => {
				res.send(201, body);
				return next();
			}, (reason: any) => {
				return next(new Error(reason.message));
			});
	}

	public queryProductByLookupCode(req: restify.Request, res: restify.Response, next: restify.Next) {
		(new ProductByLookupCodeQuery({ lookupCode: req.params.lookupCode }))
			.execute()
			.then((body: any) => {
				res.send(201, body);
				return next();
			}, (reason: any) => {
				return next(new Error(reason.message));
			});
	}

    public saveProduct(req: restify.Request, res: restify.Response, next: restify.Next) {
		(new ProductSaveCommand({ productToSave: req.body }))
			.execute()
			.then((productAsJson: any) => {
				res.send(201, productAsJson);
				return next();
			}, (reason) => {
				return next(new Error(reason.message));
			});
	}
}