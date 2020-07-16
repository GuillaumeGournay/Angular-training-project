import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatchService } from 'src/app/services/match/match.service';
import { UserModel } from 'src/app/models/user.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  // Animation des cartes onClick sur mobile
  showStyle = false;
  getHeight() {
    if (this.showStyle) {
      return '100%';
    } else {
      return '';
    }
  }

  matches: UserModel[];
  connectedUser: UserModel;
  imageUrls: SafeUrl[] = [];

  constructor(private authService: AuthService, private matchService: MatchService,
    private domSanitizer: DomSanitizer, private imageService: ImageService
  ) { }

  ngOnInit(): void {
    // On récupère l'utilisateur connecté
    this.authService.userSubject.subscribe(
      (user: UserModel) => {
        this.connectedUser = user;
      }
    );

    if (this.connectedUser !== null) {
      // On va chercher ses matches
      this.matchService.getMatches(this.connectedUser).subscribe(
        (users: UserModel[]) => {
          this.matches = users;
          console.log(users);

          for (let i in this.matches) {
            this.imageService.getUserImage(this.matches[i].id).subscribe(
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

      


    }
  }

  loadDefault(i) {
    this.matches[i].profilePic = "../../../../assets/img/default.png";
  }

}
