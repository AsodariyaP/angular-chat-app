import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FETCH_LATEST_MESSAGES, POST_MESSAGE, FETCH_MORE_MESSAGES } from '../../graphql/graphql.queries';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-message-panel',
  templateUrl: './message-panel.component.html',
  styleUrls: ['./message-panel.component.css']
})
export class MessagePanelComponent implements OnInit {

  chatLatestMessages: any[] = [];
  error: any;

  selectedUser: any;
  selectedChannel: any;
  currentChannelId: any;
  chatText: string = '';

  constructor(private apollo: Apollo, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.currentData.subscribe(data => {
      this.selectedUser = data.userId;
      this.selectedChannel = data.channelName;
      this.currentChannelId = data.channelId;
      this.getLatestMessages();
    });
  }

  getLatestMessages() {
    this.apollo.watchQuery({
      query: FETCH_LATEST_MESSAGES,
      variables: {
        channelId: this.currentChannelId
      }
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.chatLatestMessages = data.fetchLatestMessages.slice().reverse();
    }, (error) => {
      this.error = error;
    });
  }

  postMessage(text: any) {
    // apollo graphql query to post message
    if (text) {
      this.apollo.mutate({
        mutation: POST_MESSAGE,
        variables: {
          channelId: this.currentChannelId,
          text: text,
          userId: this.selectedUser,
        }
      }).subscribe(({ data }: any) => {
        this.chatText = '';
        this.chatLatestMessages = [...this.chatLatestMessages, data.postMessage];
        this.chatLatestMessages.slice().reverse();
      }, (error) => {
        // error handling for message status
        if (error.graphQLErrors[0].extensions.code == 500) {
          const data = {
            datetime: new Date().toLocaleString(),
            messageId: "",
            text: text,
            userId: this.selectedUser,
            isMessageSent: false
          }
          this.chatLatestMessages = [...this.chatLatestMessages, data];
          this.chatText = '';
        }
      });
    }
  }

  fetchMoreMessages(old: boolean) {
    let messageId;
    if (old) {
      messageId = this.chatLatestMessages[0]?.messageId;
    } else {
      const index = this.chatLatestMessages.length - 1;
      messageId = this.chatLatestMessages[index]?.messageId;
    }

    // apollo graphql query to fetch more msgs
    this.apollo.mutate({
      mutation: FETCH_MORE_MESSAGES,
      variables: {
        channelId: this.currentChannelId,
        messageId: messageId,
        old: old
      }
    }).subscribe(({ data }: any) => {
      if (data.fetchMoreMessages.length <= 10) {
        this.chatLatestMessages = [...this.chatLatestMessages, ...data.fetchMoreMessages];
      } else {
        this.chatLatestMessages = data.fetchMoreMessages;
      }
      this.chatLatestMessages.sort((a, b) => a.datetime.toLowerCase() > b.datetime.toLowerCase() ? 1 : -1);
    }, (error) => {
      this.error = error;
    });
  }

}
