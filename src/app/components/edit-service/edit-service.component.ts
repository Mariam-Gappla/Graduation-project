import { PackagesService } from './../../services/packages/packages.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-service',
  imports: [NgFor, NgIf, FormsModule, HttpClientModule],
  providers: [VendorsService, PackagesService],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  serviceData = {
    title: '',
    category: '',
    exprience: '',
    serviceDetails: '',
    phone: '',
    facebookLink: '',
    instgrameLink: '',
    Address: '',
    profileImage: '', // ❗️ ده هيبقى اسم الصورة القديمة فقط
  };

  recievedId: any;
  existingFileNames: string[] = [];
  selectedFiles: File[] = [];
  fileInputs = [{ uploaded: false }];
  Fields: { title: string; price: string }[] = [{ title: '', price: '' }];
  newProfileImage: File | null = null; // ❗️ ده ملف الصورة الجديدة فقط
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private vendorservice: VendorsService,
    private packageservice: PackagesService,
    private route: ActivatedRoute
  ) {
    this.recievedId = this.route.snapshot.paramMap.get('id');
  }
  alerrtSucess(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText:"ok",
      customClass: {
    popup: 'custom-swal-popup',
  }
    })
  }
  alertFail(title:string, text:string) {
    Swal.fire({
       icon: 'error',
      title: title,
      text: text,
      confirmButtonText:"ok",
      customClass: {
    popup: 'custom-swal-popup',
  }
    })
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vendorservice.getVendorById(id).subscribe((res) => {
        this.serviceData = res.data[0];
        this.imageSrc = "http://localhost:3000/" + res.data[0].profileImage;
        this.existingFileNames = res.data[0].serviceImage;
        this.Fields = res.data[0].packages;
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newProfileImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFiles.push(file);
      this.fileInputs[index].uploaded = true;
      this.fileInputs.push({ uploaded: false });
    }
  }

  addInput() {
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
    formData1.append('exprience', this.serviceData.exprience);
    formData1.append('serviceDetails', this.serviceData.serviceDetails);
    formData1.append('phone', this.serviceData.phone);
    formData1.append('facebookLink', this.serviceData.facebookLink);
    formData1.append('instgrameLink', this.serviceData.instgrameLink);
    formData1.append('address', this.serviceData.Address);

    // ✅ ابعت الصورة الشخصية لو موجودة
    if (this.newProfileImage) {
      formData1.append('image', this.newProfileImage);
      console.log("الصورة الشخصية:", this.newProfileImage);
    }

    // ✅ إضافة الصور اللي المستخدم اختارها للخدمة
    this.selectedFiles.forEach((file) => {
      formData1.append('serviceimages', file);
    });

    this.vendorservice.addservice(formData1).subscribe(
      (res) => {
        console.log(res);
        const id = res.data._id;

        this.packageservice.addPackage(id, this.Fields).subscribe(
          (res) => {
            this.alerrtSucess("success", res.message);
          },
          (error) => {
            this.vendorservice.deleteService(id).subscribe({
              next: () => console.log("service deleted"),
              error: (delErr) => console.error("خطأ أثناء حذف الخدمة:", delErr)
            });
            alert(error.error.message);
          }
        );
      },
      (error) => {
        console.log(error.error.message);
        this.alertFail("error",error.error?.message );
      }
    );
  }

  updateService() {
    const formData1 = new FormData();
    formData1.append('title', this.serviceData.title);
    formData1.append('category', this.serviceData.category);
    formData1.append('exprience', this.serviceData.exprience);
    formData1.append('serviceDetails', this.serviceData.serviceDetails);
    formData1.append('phone', this.serviceData.phone);
    formData1.append('facebookLink', this.serviceData.facebookLink);
    formData1.append('instgrameLink', this.serviceData.instgrameLink);
    formData1.append('address', this.serviceData.Address);

    // ✅ فقط ابعت الصورة لو المستخدم اختار واحدة جديدة
    if (this.newProfileImage) {
      formData1.append('image', this.newProfileImage);
    }

    // ✅ أضف الصور الجديدة
    this.selectedFiles.forEach(file => {
      formData1.append('serviceimages', file);
    });

    // ✅ أضف أسماء الصور اللي لسة موجودة
    formData1.append('existingImages', JSON.stringify(this.existingFileNames));

    this.vendorservice.editService(this.recievedId, formData1).subscribe(
      res => {
        console.log(res);
        this.alerrtSucess("success", res.message);
      },
      err => {
        console.error(err);
        this.alertFail("error",err.error.message);


      }
    );
  }

  deleteFile(index: number): void {
    if (index >= this.existingFileNames.length) {
      const selectedIndex = index - this.existingFileNames.length;
      this.selectedFiles.splice(selectedIndex, 1);
    } else {
      this.existingFileNames.splice(index, 1);
    }
  }
}
