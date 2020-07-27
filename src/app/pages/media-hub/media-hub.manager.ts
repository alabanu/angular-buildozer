import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubjectFactory } from '@core/helpers/subject-factory';
import { AppUtils, typeaheadOperator } from '@core/helpers/utils';
import { RouteUtility } from '@shared/common';
import { MediaModel } from '@shared/models';
import { merge, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ILightBoxData, MediaLightboxComponent } from './media-lightbox/media-lightbox.component';
import { MediaPickerComponent } from './media-picker/media-picker.component';

@Injectable({
    providedIn: 'root'
})
export class MediaHubManager {

    subscription = new Subject();
    uploadListener = new SubjectFactory<MediaModel.File>();

    constructor(
        private readonly routeUtility: RouteUtility,
        private readonly router: Router,
        private readonly dialog: MatDialog
    ) { }

    onFolderChange() {
        return this.routeUtility.onQueryParamChange('folder');
    }

    onSearch() {
        return merge(
            this.routeUtility.onQueryParamChange('file').pipe(filter(AppUtils.isTruthy)),
            this.routeUtility.onQueryParamChange('tag').pipe(filter(AppUtils.isTruthy)),
            this.onFolderChange().pipe(filter(AppUtils.isTruthy)),
        )
            .pipe(
                takeUntil(this.subscription),
                map(() => ({
                    fileName: this.getFileName(),
                    folder: this.getFolderID(),
                    tag: this.getTagID()
                })),
                typeaheadOperator()
            );
    }

    search(query: MediaModel.FileSearchQuery) {
        const defaultQuery = query || new MediaModel.FileSearchQuery(
            this.getFileName(),
            this.getFolderID(),
            this.getTagID(),
            {}
        );
        return this.router.navigate(['.'], {
            relativeTo: this.routeUtility.route,
            queryParams: {
                folder: defaultQuery.folder,
                file: defaultQuery.file,
                tag: defaultQuery.tag,
                shared: this.isShared()
            }
        });
    }

    /**
     * Get selected folder id
     */
    getFolderID() {
        return this.routeUtility.getQueryParam('folder');
    }

    getFileName() {
        return this.routeUtility.getQueryParam('file') || undefined;
    }

    getTagID() {
        return this.routeUtility.getQueryParam('tag') || undefined;
    }

    isShared() {
        return this.routeUtility.getQueryParam('shared');
    }

    viewChange() {
        return this.routeUtility.onQueryParamChange('shared');
    }

    openMediaPicker(folder: string) {
        return this.dialog.open<MediaPickerComponent, any, MediaModel.File[]>(MediaPickerComponent, {
            width: '1000px',
            height: '750px',
            panelClass: ['media-dialog'],
            data: { folder }
        });
    }

    openLightbox(data: ILightBoxData) {
        this.dialog.open(MediaLightboxComponent, {
            width: '100vw',
            height: '100vh',
            panelClass: ['media-dialog'],
            data
        });
    }
}
