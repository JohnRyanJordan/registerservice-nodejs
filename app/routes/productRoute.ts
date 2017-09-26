import * as restify from 'restify';
import productRouteController from '../controllers/ProductRouteController'

function productRoute(server: restify.Server) {
  let routeController = new productRouteController();

  server.get({ path: '/products/', version: '0.0.1' }, routeController.queryAllProducts);
  
  server.get({ path: '/product/:id', version: '0.0.1' }, routeController.queryProductById);

  server.get({ path: '/product/bylookupcode/:lookupCode', version: '0.0.1' }, routeController.queryProductByLookupCode);
  
  server.post({ path: '/product/', version: '0.0.1' }, routeController.saveProduct)

  server.get({ path: '/product/test/', version: '0.0.1' }, (req: restify.Request, res: restify.Response, next: restify.Next) => {
    res.send(200, 'Successful test. (Product routing).');
    return next();
  });
}

module.exports.routes = productRoute;