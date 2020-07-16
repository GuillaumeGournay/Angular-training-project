import { Component, OnInit } from '@angular/core';
import { AdminTagService } from '../../../services/admin-tag/admin-tag.service';
import { TagModel } from '../../../models/tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  tags: TagModel[];

  constructor(
    private adminTagService: AdminTagService
  ) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
    this.adminTagService.getTags()
    .subscribe(data => this.tags = data);
  }

  deleteTag(id: any) {
    this.adminTagService.deleteTag(id).subscribe();
    this.tags = this.tags.filter(element => element.id !== id);
  }
}
