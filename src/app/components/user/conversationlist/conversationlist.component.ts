import { Component, OnInit } from '@angular/core';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { UserModel } from 'src/app/models/user.model';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { ImageService } from 'src/app/services/image/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatchService } from 'src/app/services/match/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversationlist',
  templateUrl: './conversationlist.component.html',
  styleUrls: ['./conversationlist.component.scss']
})
export class ConversationlistComponent implements OnInit {

  connectedUser;
  conversations: ConversationModel[] = [];
  matches: UserModel[] = [];

  constructor(private conversationService: ConversationService,
    private authService: AuthService,
    private adminUserService: AdminUserService,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer,
    private matchService : MatchService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(
      user => {
        this.connectedUser = user;

        this.matchService.getMatches(user).subscribe(
          results => {
            this.matches = results ;
            for (let i in results) {
              this.imageService.getUserImage(results[i].id).subscribe(
                buff => {
                  let TYPED_ARRAY = new Uint8Array(buff.data);
                  const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
                  let base64String = btoa(STRING_CHAR);
                  this.matches[i].profilePic =  this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
                }
              )
            }
          }
        )

        // this.conversationService.getlastConversations(user).subscribe(
        //   convs => {
        //     this.conversations = convs;

        //     for (let i in convs) {
        //       if (this.connectedUser.id == convs[i].user1Id) {
        //         this.adminUserService.getUserDetail(convs[i].user2Id).subscribe(
        //           user => {
        //             this.imageService.getUserImage(user.id).subscribe(
        //               buff => {
        //                 let TYPED_ARRAY = new Uint8Array(buff.data);
        //                 const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        //                 let base64String = btoa(STRING_CHAR);
        //                 user.profilePic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
        //                 this.matches.push(user);
        //               }
        //             )
        //           }
        //         )
        //       }

        //       else {
        //         this.adminUserService.getUserDetail(convs[i].user1Id).subscribe(
        //           user => {
        //             this.imageService.getUserImage(user.id).subscribe(
        //               buff => {
        //                 let TYPED_ARRAY = new Uint8Array(buff.data);
        //                 const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        //                 let base64String = btoa(STRING_CHAR);
        //                 user.profilePic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
        //                 this.matches.push(user);
        //               }
        //             )
        //           }
        //         )
        //       }


        //     }
        //   }
        // )
      }
    )


  }

  // startChat() {
  //   for (let match in this.matches) {
  //     // this.router.navigate([{outlets : {conversation: ['chat',user.id] } }]);
  //     console.log(match.id);
  //   }
  // }

  loadDefault(i) {
    this.matches[i].profilePic = "../../../../assets/img/default.png";
  }
}
