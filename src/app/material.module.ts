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
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule
  ],
  exports: [MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatTabsModule,
    MatAutocompleteModule, MatSnackBarModule,
    MatDialogModule, MatCardModule,
    MatChipsModule
  ]
})
export class MaterialModule {

}
