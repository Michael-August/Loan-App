import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GeneralService } from 'src/app/shared/services/general-service/general-service.service';
import { ProfileService } from 'src/app/shared/services/profile-service/profile-service.service';
import { AuthState } from 'src/app/store/reducers/auth.reducer';

import * as AuthReducers from '../../../store/reducers/auth.reducer'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileImg: string = ''
  user: any = null
  showLoader: boolean = false

  state = {
    current: "profile"
  }

  settingState = 'banks'

  profileInfo: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required]),
    bvn: new FormControl('', [Validators.required]),
  })

  constructor(private store: Store<AuthState>, private profileservice: ProfileService, private bankDetails: GeneralService) { }

  ngOnInit(): void {
    this.getUserDetails()
    this.getBankDetails()
  }

  getUserDetails() {
    this.showLoader = true
    this.profileservice.getUserProfile().subscribe((res: any) => {
      console.log(res)
      this.user = res.data
      this.profileImg = res.data.profile_image_url
      this.profileInfo.patchValue(res.data)
    }).add(() => this.showLoader = false)
  }

  change(tab: string) {
    this.state.current = tab
  }

  changeSetting(setting: string) {
    this.settingState = setting
  }

  getBankDetails(){
    this.bankDetails.getUserBankDetails().subscribe(res => console.log(res))
  }

  update() {
    
  }

}
