import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { MessageService } from 'src/app/services/message/message.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageModel } from 'src/app/models/message.model';
import { ConversationModel } from 'src/app/models/conversation.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminUserService } from 'src/app/services/admin-user/admin-user.service';
import { UserModel } from 'src/app/models/user.model';
import { ImageService } from 'src/app/services/image/image.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600 )
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})

export class ConversationComponent implements OnInit {

  user2Id: number;
  connectedUserId: number;
  connectedUser : UserModel;
  previousmessages: MessageModel[] = [];
  actualConversation: ConversationModel;
  message: MessageModel = new MessageModel('');
  typing: boolean = false;
  otherIsTyping: boolean= false;
  userTwo: UserModel;

  constructor(
    private route : ActivatedRoute, 
    private conversationService : ConversationService,
    private messageService : MessageService, 
    private authService : AuthService,
    private chatService : ChatService,
    private userService : AdminUserService,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.user2Id = parseInt(param.get('id'));
      // console.log(this.user2Id);
      this.getUserDetail(this.user2Id);

      this.authService.userSubject.subscribe(
        user => {
          this.connectedUserId = user.id;
          this.connectedUser = user;
          //On cherche ou on crée la conversation entre les utilisateurs
          let conversation = new ConversationModel(this.connectedUserId, this.user2Id);
          this.findCreateConvFromService(conversation);
          
        }
      )
    });

    this.chatService.getMessages().subscribe(
      (message: MessageModel) => {
        this.previousmessages.push(message);
      }
    );

    this.chatService.receiveTyping().subscribe(
      ()=> {
        this.otherIsTyping = true ;
      }
    );

    this.chatService.receiveNotTyping().subscribe(
      ()=> {
        this.otherIsTyping = false ;
      }
    )

  }

  getMessagesFromService(conversation: ConversationModel) {
    this.messageService.getLastMessages(conversation).subscribe(
      (messages: MessageModel[]) => {
        this.previousmessages = messages;
        this.previousmessages.reverse();
      },
      (error: Error) => {
        console.log(error);

      }
    )

  }

  findCreateConvFromService(conversation: ConversationModel) {
    this.conversationService.createConversation(conversation).subscribe(
      (conv: ConversationModel) => {
        this.actualConversation = conv;
        
        this.message.setConversation(this.actualConversation);
        this.message.senderId = this.connectedUserId;

        this.getMessagesFromService(conv);
        this.chatService.createRoom(conv);
        this.chatService.getRoom();
       
      }
      ,
      (error: Error) => {
        console.log(error);

      }
    )
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messageService.createMessage(this.message).subscribe(
      (message: MessageModel) => {
        console.log('message enregistré', message);

      }
    );
    this.message.setContent('');
  }

  updateTyping() {

    if (!this.typing) {
      this.typing = true;
      this.chatService.sendTyping();
    }
    let lastTypingTime = (new Date()).getTime();

    setTimeout(() => {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= 4000 && this.typing) {
        this.chatService.sendStopTyping();
        this.typing = false;
      }
    }, 4000);
  }

  getUserDetail(user2Id: number) {
    this.userService.getUserDetail(user2Id)
      .subscribe(data => {
        this.userTwo = data
          this.imageService.getUserImage(this.userTwo.id).subscribe(
            buff => {
              let TYPED_ARRAY = new Uint8Array(buff.data);
              const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
              let base64String = btoa(STRING_CHAR);
              this.userTwo.profilePic = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String)
            }
          )
        console.log(this.userTwo);  
      });
  }

  loadDefault() {
    this.userTwo.profilePic = "../../../../assets/img/default.png" ;
 }

}
