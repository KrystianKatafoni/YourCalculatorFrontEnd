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
  MatTooltipModule, MatTableModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule, MatStepperModule,
    MatListModule, MatSelectModule,
    MatTooltipModule, MatTableModule
  ],
  exports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule, MatStepperModule,
    MatListModule, MatSelectModule,
    MatTooltipModule, MatTableModule
  ]
})
export class MaterialModule {

}
