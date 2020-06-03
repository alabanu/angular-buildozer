import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestOptions } from '@ezzabuzaid/ngx-request-options';
import { FormWidgetManager } from '@partials/form';
import { IRequestOptions } from '@shared/common';
import { ProgressBarManager } from '@widget/progress-bar';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
    private showSnackbar = true;
    constructor(
        private readonly snackbar: MatSnackBar,
        private readonly formWidgetManager: FormWidgetManager,
        private readonly progressBarManager: ProgressBarManager,
        private readonly requestOptions: RequestOptions<IRequestOptions>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.showSnackbar = this.requestOptions.get(request, 'SNACKBAR') && request.method !== 'GET';
        if (this.showSnackbar) {
            Promise.resolve(null).then(() => this.snackbar.open('Please wait', '', { duration: Number.MAX_VALUE }));
        }

        this.formWidgetManager.notify(this.requestOptions.get(request, 'FORM_PROGRESS_BAR'));
        this.progressBarManager.notify(this.requestOptions.get(request, 'PROGRESS_BAR'));

        return next.handle(request)
            .pipe(
                tap(
                    (response) => {
                        if (response instanceof HttpResponse && this.showSnackbar) {
                            const { message = null } = response.body;
                            if (message) {
                                this.snackbar.open(message);
                            }
                        }
                    },
                    (error) => {
                        if (error instanceof HttpErrorResponse && error.error) {
                            this.snackbar.open(error.error.message);
                        }
                    }),
                finalize(() => {
                    this.progressBarManager.notify(false);
                    this.formWidgetManager.notify(false);
                }),
            );
    }
}
