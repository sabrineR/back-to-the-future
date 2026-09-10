export abstract class BaseController {
    public static jsonResponse(
        res,
        code: number,
        body?: any,
        additionalHeaders?: any
    ) {
        if (additionalHeaders) {
            res.set(additionalHeaders);
        }
        return res.status(code).json(body);
    }

    public fail(res, error: Error | string) {
        return BaseController.jsonResponse(res, 500, {
            message: error.toString(),
        });
    }

    public notFound(res, message?: string) {
        return BaseController.jsonResponse(res, 404, {
            message: message ? message : 'not found',
        });
    }
    public badRequest(res, message: string) {
        return BaseController.jsonResponse(res, 400, {
            message,
        });
    }

    public ok<T>(res, dto?: T, additionalHeaders?: any) {
        return BaseController.jsonResponse(res, 200, dto, additionalHeaders);
    }

    public created<T>(res, dto?: T) {
        return BaseController.jsonResponse(res, 201, dto);
    }

    public updated<T>(res, dto?: T) {
        return BaseController.jsonResponse(res, 200, dto);
    }

    public deleted(res) {
        return res.status(204).send();
    }
}
