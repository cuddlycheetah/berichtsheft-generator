import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatBadgeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatPaginatorModule,
  MatSortModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatRadioModule,
  MatStepperModule,

  MatCardModule,

  MatCheckboxModule,
  MatProgressBarModule,
  MatMenuModule,
  MatTabsModule,
} from '@angular/material';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  imports: [
    MatTableModule,
    MatBadgeModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressBarModule,

    MatCardModule,

    MatCheckboxModule,
    ScrollingModule,
  ],
  exports: [
    MatTableModule,
    MatBadgeModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressBarModule,

    MatTabsModule,
    MatCardModule,

    MatMenuModule,
    MatCheckboxModule,
    ScrollingModule,
  ],
  providers: [
    MatMomentDateModule
  ]
})
export class MaterialModule {}
