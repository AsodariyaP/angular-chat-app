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
  currentChannelId: any

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
      this.chatLatestMessages = data.fetchLatestMessages;
      console.log(this.chatLatestMessages);
      this.error = error;
    });
  }
}
