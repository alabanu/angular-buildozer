import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISetupInterceptor, ModifiableInterceptor, CustomHeaders, getHeader, ECustomHeaders } from '../http/http.model';
import { map } from 'rxjs/operators';

@Injectable()
export class SetupInterceptor implements ISetupInterceptor, ModifiableInterceptor {
    public name = SetupInterceptor.name;
    private defaultSetting = new CustomHeaders();
    constructor() {
        this.configure(this.defaultSetting);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = this.setCustomHeaders(req.headers);
        this.configure(this.defaultSetting);
        return next.handle(req.clone({ headers }))
            .pipe(map(
                (response: HttpResponse<any>) => {
                    if (response instanceof HttpResponse && getHeader(req.headers, ECustomHeaders.FULL_RESPONSE)) {
                        return response.clone({ body: response.body.data });
                    }
                    return response;
                })
            );
    }

    configure(obj: Partial<CustomHeaders>) {
        Object.assign(this, obj);
    }

    setCustomHeaders(headers) {
        // tslint:disable-next-line: forin
        for (const header in (new CustomHeaders())) {
            headers = headers.set(header, String(this[header]));
        }
        return headers;
    }
}