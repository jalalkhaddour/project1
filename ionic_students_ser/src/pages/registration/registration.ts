import { HttpClient } from '@angular/common/http';
import { DataProvider } from './../../providers/data/data';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  @ViewChild('re_slider') re_slider: Slides;

  // slide 1
  name: string;
  father: string;
  mother: string;
  burn_place_date: string;
  burn_city: string;
  registered_place_num: string;
  nationality: string;
  // slide 2
  certificate: string;
  certificate_date: string;
  register_type: string;
  Payment_number: string;
  // slide 3
  image_1: File = null;
  imgURL_1 = null;
  // slide 4
  image_2: File = null;
  imgURL_2 = null;

  constructor(
    public navCtrl: NavController,
    public data: DataProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
  }

  ionViewDidEnter() {
    this.re_slider.lockSwipeToNext(true);
  }

  sendRegistrationForm() {
    let valid_input = true;
    for (let i = 0; i <= 3; i++) {
      valid_input = (valid_input && this.checkValidate(i));
    }

    if (!valid_input) {
      this.presentToast("تحقق من المدخلات قبل الإرسال", "error");
      return;
    }

    let loader = this.presentLoading('جاري ارسال طلب التسجيل');

    const fd = new FormData();
    fd.append('name', this.name);
    fd.append('mother', this.mother);
    fd.append('father', this.father);
    fd.append('burn_place_date', this.burn_place_date);
    fd.append('burn_city', this.burn_city);
    fd.append('registered_place_num', this.registered_place_num);
    fd.append('nationality', this.nationality);
    fd.append('certificate', this.certificate);
    fd.append('certificate_date', this.certificate_date);
    fd.append('register_type', this.register_type);
    fd.append('Payment_number', this.Payment_number);
    fd.append('personal_identification_img', this.image_1);
    fd.append('certificate_img', this.image_2);
    this.data.registrationStudent(fd).subscribe(
      res => {
        this.presentToast("تمت العملية بنجاح", "success");
        console.log(res),
        loader.dismiss();
        this.navCtrl.pop();
      },
      error => {
        this.presentToast("تأكد من الاتصال", "error");
        loader.dismiss();
      }
    )
  }

  checkValidate(slideIndex: number) {
    if (slideIndex == 0) {
      return (
        this.checkString(this.name) &&
        this.checkString(this.father) &&
        this.checkString(this.mother) &&
        (this.burn_place_date != undefined && this.burn_place_date != '') &&
        this.checkString(this.burn_city) &&
        (this.registered_place_num != undefined && this.registered_place_num != '') &&
        this.checkString(this.nationality)
      )
    }

    if (slideIndex == 1) {
      return (
        this.checkString(this.certificate) &&
        this.certificate_date != undefined &&
        this.register_type != undefined &&
        (this.Payment_number != undefined && this.Payment_number != '')
      )
    }

    if (slideIndex == 2) {
      return (
        this.image_1 != null
      )
    }

    if (slideIndex == 3) {
      return (
        this.image_2 != null
      )
    }
  }

  checkString(s: string) {
    var regex = new RegExp(/^[a-zA-Z\u0600-\u06FF- ]+/);
    return (s != undefined && s != '' && regex.test(s))
  }


  imagePreview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    return reader
  }

  onImgSelected1(event) {
    this.image_1 = <File>event.target.files[0];
    let reader = this.imagePreview(event.target.files);
    reader.onload = (_event) => {
      this.imgURL_1 = reader.result;
    }
  }

  onImgSelected2(event) {
    this.image_2 = <File>event.target.files[0];
    let reader = this.imagePreview(event.target.files);
    reader.onload = (_event) => {
      this.imgURL_2 = reader.result;
    }
  }

  nextSlide() {
    let current_slide_index = this.re_slider.getActiveIndex();
    if (this.checkValidate(current_slide_index)) {
      this.re_slider.lockSwipes(false);
      this.re_slider.slideNext();
    }
    else {
      this.presentToast("تحقق من المدخلات", "error");
    }
    this.re_slider.lockSwipes(true);
  }

  previousSlide() {
    this.re_slider.lockSwipes(false);
    this.re_slider.slidePrev();
    this.re_slider.lockSwipes(true);
  }

  private presentToast(text: string, toastType: string) {
    var toastClass;
    if (toastType === "success") {
      toastClass = "toast-success";
    } else {
      toastClass = "toast-error";
    }
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'down',
      cssClass: toastClass
    });
    toast.present();
  }

  presentLoading(text) {
    const loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: text,
      cssClass: "loaderCss"
    });
    loader.present();
    return loader;
  }

  dismissLoading(loader: any) {
    loader.dismiss();
  }

}

