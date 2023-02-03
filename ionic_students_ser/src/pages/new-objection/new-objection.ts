import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-new-objection',
  templateUrl: 'new-objection.html',
})
export class NewObjectionPage {
  type: number;
  course: string;
  body: string;
  year: number;
  part: number
  university_id: string;

  valid_inputs = false;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public data_: DataProvider, ) {

  }

  sendObjection() {
    this.checkInput();
    console.log(this.course, this.body, this.year, this.part, this.type, this.university_id)
    if (this.valid_inputs == true) {
      let loader = this.presentLoading('جاري  الاراسال');
      this.data_.sendObjection(this.course, this.body, this.year, this.part, this.type, this.university_id).subscribe(
        res => {
          this.presentToast("تم ارسال طلب الاعتراض بنجاح", "success");
          this.dismissLoading(loader);
        }, error => {
          this.presentToast("لم يتم ارسال طلب الاعتراض بنجاح", "error");
          this.dismissLoading(loader);
        }
      );
    }
  }

  checkInput() {
    if (this.course == '' || this.course == undefined) {
      this.presentToast("ادخل اسم المادة", "error");
      return;
    }
    if (this.type == undefined || this.year == undefined || this.part == undefined) {
      this.presentToast("لم تقم بادخال بعض الحقول", "error");
      return;
    }
    if (!Number.isInteger(parseInt(this.university_id))) {
      this.presentToast("ادخل رقم جامعي صحيح", "error");
      return;
    }
    this.valid_inputs = true;
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
