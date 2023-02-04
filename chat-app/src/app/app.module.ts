import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatScreenComponent } from './components/chat-screen/chat-screen.component';
import { MessagePanelComponent } from './components/message-panel/message-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatScreenComponent,
    MessagePanelComponent,
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
