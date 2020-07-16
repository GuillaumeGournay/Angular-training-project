import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AdminTagService } from '../../../services/admin-tag/admin-tag.service';
import { TagModel } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent implements OnInit {
  cities: TagModel[] = [];
  tag: TagModel = new TagModel();

  constructor(
    private adminTagService: AdminTagService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tag.name = '';
  }

  onSubmit() {
    this.adminTagService.addTag(this.tag)
    .subscribe(
      (data: TagModel) => {
        this.router.navigate(['/admin/tags']);
      }
    );
  }
}
