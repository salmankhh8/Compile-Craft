import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GoogleAuthService } from '../../google-auth.service';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// export interface DialogData {
//   animal: string;
//   name: string;
// }

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, FontAwesomeModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.8,
          backgroundColor: 'blue',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
      transition('open <=> closed', [animate('0.5s')]),
      transition('* => open', [animate('1s', style({ opacity: '*' }))]),
      transition('* => *', [animate('1s')]),
    ])
  ]
})

export class SignupComponent implements OnInit {

  constructor(private auth: GoogleAuthService) {
    this.auth.user.subscribe(user=>{
      this.userData.set(user?.user_metadata['full_name'])
    })
  }

  animal(): any {
    throw new Error('Method not implemented.');
  }

  readonly dialogRef = inject(MatDialogRef<SignupComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  // readonly animal = model(this.data.animal);

  isSignUp: boolean = this.data["isSignUp"] ? this.data["isSignUp"] : false
  userData = signal({})
  faGithub = faGithub
  faGoogle = faGoogle

  isLoggedIn = true

  ngOnInit(): void {
    console.log(this.data)
    this.isLoggedIn = this.data["isLoggedIn"]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adjustPopupSize() {
    console.log(this.isLoggedIn, this.isSignUp)
    if (!this.isLoggedIn) {
      if (this.isSignUp) {
        this.dialogRef.updateSize('350px', '497px')
      }
      else {
        this.dialogRef.updateSize('350px', '427px')
      }
    }
    else {
      this.dialogRef.updateSize('350px', 'auto')
    }
  }


  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
    this.adjustPopupSize()
  }

  handleCredentialResponse(response: any): void {
    const responsePayload = this.decodeJwtResponse(response.credential);
    console.log('ID: ' + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log('Image URL: ' + responsePayload.picture);
    console.log('Email: ' + responsePayload.email);

    // Store user information in session storage
    sessionStorage.setItem('loggedinUser', JSON.stringify(responsePayload));

    // Redirect to the desired page
    window.location.href = '/your-desired-route';
  }

  decodeJwtResponse(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  // async hadleAuth(){
  //   const response = await this.auth.singInWithGithub()

  //   console.log(response,"reposne")
  // }

  async onGoogleSignup() {
    const response = await this.auth.sinUpwithoogle()
  }

  async onGithubSignup() {
    const response = await this.auth.singInWithGithub()
  }

  async signout(signInWithAnotherAccount: boolean) {
    if(signInWithAnotherAccount){
      this.isLoggedIn = false
      this.isSignUp = true
      this.adjustPopupSize()
    }
    const response = await this.auth.signOut();
    

    if (signInWithAnotherAccount) {
        this.adjustPopupSize();
    } else {
        this.onNoClick();
    }
  }



  // signInWithGoogle(): void {
  //   this.googleSigninService.signInWithGoogle()
  //     .then(user => {
  //       // Handle successful sign-in
  //       console.log(user);
  //     })
  //     .catch(error => {
  //       // Handle sign-in error
  //       console.error(error);
  //     });
  // }


}
