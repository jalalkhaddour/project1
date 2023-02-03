import { HomePage } from './../home/home';

import { DataProvider } from './../../providers/data/data';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, Platform } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from './mustMatch';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  username_regex: string = "[a-zA-Z\u0600-\u06FF- ]*";
  email_regex: string = "^[a-z]+[a-z_.0-9]*(@gmail\.com|@hotmail\.com)";
  mobile_number_regex: string = "09[0-9]+";

  public signupForm: FormGroup;

  validation_messages = {
    'username': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'minlength', message: "* " + "على الأقل 4 محارف" },
      { type: 'pattern', message: "* " + "ادخل اسم صحيح)" },
    ],
    'email': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'pattern', message: "* " + "تأكد من صيغة البريد الإلكتروني (gmail.com/hotmail.com)" },
    ],
    'password': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'minlength', message: "* " + "على الأقل 8 محارف" }
    ],
    're_password': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'minlength', message: "* " + "على الأقل 8 محارف" },
      { type: 'mustMatch', message: "* " + "غير مطابقة لكلمة المرور" },
    ], 
    'mobile_number': [
      { type: 'required', message: "* " + "هذا الحقل مطلوب" },
      { type: 'minlength', message: "* " + "يجب أن يكون 10 أرقام" },
      { type: 'maxlength', message: "* " + "يجب أن يكون 10 أرقام" },
      { type: 'pattern', message: "* " + "يجب أن يبدأ ب 09" },
    ],
  };


  username: string;
  password: string;
  re_password: string;
  email: string;
  mobile_number: string;


  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public data_: DataProvider,
    public platform: Platform) {
      this.validateInpute();
  }

  ionViewDidLoad() {
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

  validateInpute() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(this.username_regex)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.email_regex)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      re_password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      mobile_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(this.mobile_number_regex)])],
    },
    { validator: MustMatch('password', 're_password') }
    );
  }

  // sign up validator
  signup() {
    if (this.signupForm.valid) { 
      
      this.username = this.signupForm.get('username').value;
      this.email = this.signupForm.get('email').value;
      this.password = this.signupForm.get('password').value;
      this.re_password = this.signupForm.get('re_password').value;
      this.mobile_number = this.signupForm.get('mobile_number').value;


      let loader = this.presentLoading('جاري إنشاء الحساب');
      this.data_.register(this.username, this.email, this.mobile_number, this.password, this.re_password).subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.data_.saveUserInLocalStorage(res.data);
            this.data_.setHeaderAuthorization();
            this.dismissLoading(loader);
            this.presentToast("تم إنشاء الحساب بنجاح", "success");
            this.goToHomePage();
          } else if (res.status == -1) {
            this.dismissLoading(loader);
            this.presentToast("البريد الإلكتروني مستخدم مسبقاً", "error");
          }
        },
        (error) => {
          this.dismissLoading(loader);
          this.presentToast("تحقق من الاتصال", "error");
        }
      );
    }
    else {
      this.presentToast("بعض الحقول فارغة أو غير  صحيحة", "error");
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
