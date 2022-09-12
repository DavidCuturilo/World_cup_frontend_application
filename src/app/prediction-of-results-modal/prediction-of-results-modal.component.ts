import { GeneralHelper } from './../helpers/general-helper.service';
import { DialogDataModel } from './model/dialog-data.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-prediction-of-results-modal',
  templateUrl: './prediction-of-results-modal.component.html',
  styleUrls: ['./prediction-of-results-modal.component.scss']
})
export class PredictionOfResultsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PredictionOfResultsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataModel,
    private generalHelper: GeneralHelper,
  ) {}

  ngOnInit(): void {
    console.log(JSON.stringify(this.data))
  }

  onCancel() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close(this.data);
  }

  getImage(nameCode: string) {
    return this.generalHelper.getImage(nameCode);
  }

  matchStarted() {
    return this.data.isStarted;
  }
}
