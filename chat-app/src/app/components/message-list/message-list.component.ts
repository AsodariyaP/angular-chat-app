import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() message: any;
  @Input() selectedUser:any;
  constructor() { }

  ngOnInit(): void {

    console.log('call from child',this.message);
  }

}
