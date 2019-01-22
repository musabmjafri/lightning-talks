import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MainContentComponent } from './main-content/main-content.component';
import { GeneralShellComponent } from './general/general-shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, MainContentComponent, GeneralShellComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class ShellModule { }
