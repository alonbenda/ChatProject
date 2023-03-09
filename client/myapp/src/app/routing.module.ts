import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogInComponent } from "./components/log-in/log-in.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { ChatComponent } from "./components/chat/chat.component";
import { GameComponent } from "./components/games/game/game.component";
import { TicTacToeComponent } from "./components/games/tic-tac-toe/tic-tac-toe/tic-tac-toe.component";

const appRoutes: Routes = [
    { path: '', component: LogInComponent},
    { path: 'home-page/:userName', component: HomePageComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user-profile/:id', component: UserProfileComponent},
    { path: 'chat/:id1/:id2', component: ChatComponent},
    { path: 'game', component: GameComponent},
    { path: 'tictactoe/:id1/:id2/:id3', component: TicTacToeComponent}
]

export const routing = RouterModule.forRoot(appRoutes);