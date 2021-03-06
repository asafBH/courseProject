import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatIconModule, MatListModule, MatSelectModule } from '@angular/material';
import { MatTableModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDialogModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatCardAvatar } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { LangPipe } from './pipes/lang.pipe';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../core/services/user-state.service';



@NgModule({
  declarations: [
    HeaderComponent,
    LangPipe
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatBadgeModule,
    //MatCardAvatar,
    FormsModule,
    RouterModule
  ],
  exports: [
    FlexLayoutModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatBadgeModule,
    HeaderComponent,
    //MatCardAvatar,
    FormsModule,
    LangPipe
  ],
  providers:[UserStateService]
})
export class SharedModule { }
