import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { GameComponent } from './components/games/game/game.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { routing } from './routing.module';
import { FormsModule } from '@angular/forms';
import ProductService from './services/user.service';
import LogInService from './services/logIn.service';
import ChatService from './services/chat.service';
import HubConnectionService from './services/hub-connection/hub-connection.service';
import { SitenavigatorComponent } from './components/sitenavigator/sitenavigator.component';
import { TicTacToeComponent } from './components/games/tic-tac-toe/tic-tac-toe/tic-tac-toe.component';
import { CellComponent } from './components/games/tic-tac-toe/cell/cell/cell.component';
import TicTacToeService from './services/games/tictactoe.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChatComponent,
    GameComponent,
    LogInComponent,
    RegisterComponent,
    UserProfileComponent,
    SitenavigatorComponent,
    TicTacToeComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [ProductService, LogInService, ChatService, HubConnectionService, TicTacToeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
