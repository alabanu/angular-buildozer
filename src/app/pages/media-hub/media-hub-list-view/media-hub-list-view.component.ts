import { Component, Input, OnInit } from '@angular/core';
import { MediaModel } from '@shared/models';
import { UploadsService } from '@shared/services/upload';

@Component({
  selector: 'app-media-hub-list-view',
  templateUrl: './media-hub-list-view.component.html',
  styleUrls: ['./media-hub-list-view.component.scss']
})
export class MediaHubListViewComponent implements OnInit {
  @Input() files: MediaModel.File[] = [];

  constructor(
    private readonly uploadsService: UploadsService
  ) { }

  ngOnInit() { }

  deleteFile(id: string, index: number) {
    this.uploadsService.deleteFile(id)
      .subscribe(() => {
        this.files.splice(index, 1);
      });
  }
}
