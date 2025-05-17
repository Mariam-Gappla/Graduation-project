import { PackagesService } from './../../services/packages/packages.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';

@Component({
  selector: 'app-edit-service',
  imports: [NgFor, NgIf, FormsModule, HttpClientModule],
  providers: [VendorsService, PackagesService],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {
  serviceData = {
    title: '',
    category: '',
    experience: '',
    Summary: '',
    phone: '',
    facebook: '',
    instagram: '',
    address: ''
  };
  fileInputs = [{ uploaded: false }];
  servicefields: any;
  selectedFiles: File[] = [];
  Fields: { title: string; price: string }[] = [
    { title: '', price: '' }
  ];
  profileImage: File | null = null;
  imageSrc: string | ArrayBuffer | null = null;
  constructor(private vendorservice: VendorsService, private packageservice: PackagesService, private route: ActivatedRoute) {
    this.Fields = [
      { title: '', price: '' }
    ];
  }



  onImageSelected(event: any): void {
    this.profileImage = event.target.files[0];
    if (this.profileImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.profileImage);
    }
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFiles.push(file);              // نخزن الملف

      this.fileInputs[index].uploaded = true;     // نعلم إن input ده تم استخدامه

      this.fileInputs.push({ uploaded: false });  // نضيف input جديد تلقائي
    }
  }


  addInput() {
    console.log(this.Fields);
    this.Fields.push({ title: '', price: '' });
  }

  canAddMore(): boolean {
    const last = this.Fields[this.Fields.length - 1];
    return last.title.trim() !== '' && last.price.trim() !== '';
  }
  sendData() {
    const formData1 = new FormData();
    formData1.append('title', this.serviceData.title);
    formData1.append('category', this.serviceData.category);
    formData1.append('exprience', this.serviceData.experience);
    formData1.append('serviceDetails', this.serviceData.Summary);
    formData1.append('phone', this.serviceData.phone);
    formData1.append('facebookLink', this.serviceData.facebook);
    formData1.append('instgrameLink', this.serviceData.instagram);
    if (this.profileImage) {
      formData1.append('image', this.profileImage);
    }
    formData1.append('address', this.serviceData.address);
    // إضافة كل الملفات
    this.selectedFiles.forEach((file, index) => {
      formData1.append('serviceimages', file); // ممكن تغير key لو الباك إند طالب اسم تاني
    });
    this.vendorservice.addservice(formData1).subscribe(
      (res) => {
        console.log(res)
        const id = res.data._id;
        this.packageservice.addPackage(id, this.Fields).subscribe(
          (res) => {
            alert("service added sucessfully" + res.message)
          },
          (error) => {
            this.vendorservice.deleteService(id).subscribe({
              next: () => console.log("Service deleted due to package failure"),
              error: (delErr) => console.error("Error deleting service:", delErr)
            });
            alert(error.error.message)
          })
      },
      (error) => {
        console.log(error.error.message)
      }
    )
    for (const [key, value] of formData1.entries()) {
      console.log(`${key}:`, value);
    }





  }
}
