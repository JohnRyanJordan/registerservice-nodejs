import * as restify from 'restify';

export default abstract class RouteController {
	//https://stackoverflow.com/questions/28158333/how-can-i-get-the-client-ip-from-a-request-object-with-restify
	protected extractClientIp(req: restify.Request): string {
		var clientIp: string = '';
		const forwardedForHeader: string = 'x-forwarded-for';

		if (req.headers[forwardedForHeader] && (req.headers[forwardedForHeader].length > 0)) {
			clientIp = req.headers[forwardedForHeader][0];
		} else if (req.connection.remoteAddress) {
			clientIp = req.connection.remoteAddress;
		}

		return clientIp;
	}
}