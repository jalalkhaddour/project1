import { HomePage } from './../home/home';
import { DataProvider } from './../../providers/data/data';

import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email_regex: string = "^[a-z]+[a-z_.0-9]*(@gmail\.com|@hotmail\.com)";

  public loginForm: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'pattern', message: "* " + "تأكد من صيغة البريد الإلكتروني (gmail.com/hotmail.com)" },
    ],
    'password': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'minlength', message: "* " + "على الأقل 8 محارف" }
    ]
  };

  password: string;
  email: string;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public data_: DataProvider,
    public formBuilder: FormBuilder,
    public platform: Platform) {
      this.validateInpute()
  }

  ionViewDidLoad() {
  }

  validateInpute() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.email_regex)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  goToSignup() {
    this.navCtrl.push(SignupPage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  goToHomePage() {
    this.navCtrl.setRoot(HomePage, {},
      {
        animate: true,
        animation: 'ios-transition',
        easing: "out",
        duration: 350
      });
  }

  // validate && login
  login() {
    if (this.loginForm.valid){
      this.email = this.loginForm.get('email').value;
      this.password = this.loginForm.get('password').value;

      let loader = this.presentLoading('جاري تسجيل الدخول');

      this.data_.login(this.email, this.password).subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.data_.saveUserInLocalStorage(res.data);
            this.data_.setHeaderAuthorization();
            this.dismissLoading(loader);
            this.presentToast('تم تسجيل الدخول بنجاح', "success");
            this.goToHomePage();
          } else if (res.status == -1) {
            this.dismissLoading(loader);
            this.presentToast("تحقق من البريد الإلكتروني و كلمة المرور", "error");
          }
        },
        (error) => {
          this.dismissLoading(loader);
          this.presentToast("تحقق من الاتصال", "error");
        }
      );

    }
    else {
      this.presentToast("بعض الحقول فارغة أو غير صحيحة", "error");
    }
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
