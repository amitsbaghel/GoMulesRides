import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessageUser, Message } from '../_models/message.model';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild('scrollMessages') private myScrollContainer: ElementRef;
  sentToId:string
  sentFromId:string
  newText:string
  newMessage:Message
  messageUser:MessageUser[]
  messagelist:Message[]
  disableSend:boolean
  msgUpdate:boolean
  constructor(private route: ActivatedRoute, private messageService: MessageService) {
    this.sentFromId=localStorage.getItem('currentUser')
    this.disableSend=true
    this.msgUpdate=false
    this.messagelist=[]
    this.messageUser=[]
   }
  // https://medium.com/@REPTILEHAUS/angular-2-and-socket-io-chat-app-f56afb9ceeb2 //must
  // https://hackernoon.com/build-real-time-app-with-mean2-angular-cli-and-socket-io-cedf1dc02fec
  // https://www.djamware.com/post/58e0d15280aca75cdc948e4e/building-chat-application-using-mean-stack-angular-4-and-socketio
  // https://medium.freecodecamp.org/building-a-chat-application-with-mean-stack-637254d1136d must //angular 1
  
  ngOnInit() {
      this.sentToId=this.route.snapshot.paramMap.has('id')? this.route.snapshot.paramMap.get('id'):null;
      this.messageService.getAllChatUserDetails(this.sentFromId,this.sentToId).subscribe(messageusers => {

        if (messageusers.length>0) {
          if(this.sentToId) // if redireted from somewhere.
          {
            // change user div to active div.
            this.messageUser=messageusers;
            this.getUserMessages()
          }
          else{ // if directly opened the page. //first message user to open.
                messageusers[0].tobeopened=true;
                // if current user and sender are same
                if(messageusers[0].sentById==this.sentFromId)
                this.sentToId=messageusers[0].sentToId; 
                else // if different.
                this.sentToId=messageusers[0].sentById;
                this.messageUser=messageusers;
                this.getUserMessages();
              }
      }}, err => {
        console.log('Something went wrong!');
      }
      );
    } //ngInit ends

    setCurrentUserinList(){
      this.messageUser.forEach(function(part, index, theArray) {
        theArray[index].tobeopened =false;
      });
      var msgUser:MessageUser=this.messageUser.find(value=>value.sentToId==this.sentToId)
      if(msgUser)
      msgUser.tobeopened=true
    }

    // get user specific messages 
    getUserMessages()
    {
      this.setCurrentUserinList()
      this.messagelist=[]
      this.messageService.getOnlyMsgbySentToUser(this.sentFromId,this.sentToId).subscribe(messages => {
        if (messages.length>0) {
      this.messagelist=messages
      console.log(this.messagelist)
      this.msgUpdate=false 
      }
      else{
        this.msgUpdate=true
      }
      this.disableSend=false
    }, err => {
        console.log('Something went wrong!');
      }
      );
    }

    ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

    scrollToBottom(): void {
      try {
        console.log()
          this.myScrollContainer.nativeElement.scrollBy(0,this.myScrollContainer.nativeElement.scrollHeight);
      } catch(err) { }                 
  }

    saveMessage()
    {
      
      if(typeof this.newText =="undefined" || this.newText.trim()=="")
        return;
      var newmsg:Message={
        sentById:this.sentFromId,
        message:this.newText,
        sentToId: this.sentToId
      }
      this.messageService.saveMessage(newmsg).subscribe(messages => {
        if (messages) {
      this.messagelist.push(messages)
      this.newText=""
      }}, err => {
        console.log('Something went wrong!');
      }
      );
    }
  } 