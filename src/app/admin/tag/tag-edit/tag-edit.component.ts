import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminTagService } from '../../../services/admin-tag/admin-tag.service';
import { TagModel } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss']
})
export class TagEditComponent implements OnInit {

  tag: TagModel = new TagModel();

  constructor(
    private adminTagService: AdminTagService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( param => {
      this.tag.id = parseInt(param.get('id'))
      })
  }

  onSubmit(): void {
    this.adminTagService.editTag(this.tag)
    .subscribe(
        (tag: TagModel)=> {
          this.router.navigate(['/admin/tags']);
        }
      );
  }

}
