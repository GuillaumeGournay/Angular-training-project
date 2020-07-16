import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../../../services/admin-user/admin-user.service';
import { UserModel } from '../../../models/user.model';
import { ImageService } from 'src/app/services/image/image.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private adminUserService: AdminUserService,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer
  ) { }

  users: UserModel[];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminUserService.getUsers()
      .subscribe(data => {
        this.users = data
        for (let i in this.users) {
          this.imageService.getUserImage(this.users[i].id).subscribe(
            buff => {
              let TYPED_ARRAY = new Uint8Array(buff.data);
              const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
              let base64String = btoa(STRING_CHAR);
              this.users[i].profilePic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
            }
          )
        }
      }
      );
  }

  deleteUser(id: any) {
    this.adminUserService.deleteUser(id).subscribe();
    this.users = this.users.filter(element => element.id !== id);
  }
}
