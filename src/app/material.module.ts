import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatChipsModule, MatStepperModule,
  MatListModule, MatSelectModule,
  MatTooltipModule, MatTableModule,
  MatSlideToggleModule, MatSortModule,
  MatPaginatorModule, MatProgressSpinnerModule
} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";



@NgModule({
  imports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule, MatStepperModule,
    MatListModule, MatSelectModule,
    MatTooltipModule, MatTableModule,
    MatSlideToggleModule, MatSnackBarModule,
    MatSortModule, FlexLayoutModule,
    MatPaginatorModule, MatProgressSpinnerModule
  ],
  exports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule, MatStepperModule,
    MatListModule, MatSelectModule,
    MatTooltipModule, MatTableModule,
    MatSlideToggleModule, MatSnackBarModule,
    MatSortModule, FlexLayoutModule,
    MatPaginatorModule, MatProgressSpinnerModule
  ]
})
export class MaterialModule {

}
