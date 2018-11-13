import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../_services/upload.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  uploadForm: FormGroup
  files: FileList
  // formData:FormData

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private uploadService: UploadService) { }

  // ng init
  ngOnInit() {
    this.uploadForm = this.fb.group({
      itemname: ['', Validators.required],
      uploadfile: ['', Validators.required]
    });
  } //ends


  // func to check 
  // https://medium.com/@amcdnl/file-uploads-with-angular-reactive-forms-960fd0b34cb5
  // Thanks Austin for ChangeDetection.
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      this.files = event.target.files;

      reader.readAsDataURL(this.files[0]);

      reader.onload = () => {
        this.uploadForm.patchValue({
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  } //func to check files ends

  // login :: validation check
  get itemname() { return this.uploadForm.get('itemname'); }
  get uploadfile() { return this.uploadForm.get('uploadfile'); }

  // 
  upload() {

    this.uploadService
      .uploadfiles(this.files,this.itemname.value)
      .subscribe(res => {
        console.log(res);
      });
  }
}