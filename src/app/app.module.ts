import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CellDirective } from './shared/directives/cell.directive';
import { MatDialogModule} from '@angular/material/dialog';
import { EndgameDialogComponent } from './shared/modals/endgame-dialog/endgame-dialog.component';
import { ScoreboardComponent } from './shared/components/scoreboard/scoreboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CellDirective,
    EndgameDialogComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent, ]
})
export class AppModule { }
