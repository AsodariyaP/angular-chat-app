import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  users = [
    { id: 1, name: 'Joyse' },
    { id: 2, name: 'Sam' },
    { id: 3, name: 'Russell' }
  ];

  channelList = [
    { channelId: '1', name: 'General Channel' },
    { channelId: '2', name: 'Technology Channel' },
    { channelId: '3', name: 'LGTM Channel' }
  ];

  selectedUser = 'Joyse';
  selectedChannel = 'General Channel';
  channelId = '1';
  selectedItem = '1';

  ngOnInit(): void {
    this.onSetDataSharedService();
  }

  onSelectedUser() {
    this.onSetDataSharedService();
  }

  onSelectedChannel(channel: any) {
    this.selectedChannel = channel.name;
    this.channelId = channel.channelId;
    this.selectedItem = channel.channelId;
    this.onSetDataSharedService();
  }

  onSetDataSharedService() {
    const data = { userId: this.selectedUser, channelId: this.channelId, channelName: this.selectedChannel }
    this.sharedService.setData(data);
  }

}
