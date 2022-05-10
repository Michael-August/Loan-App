import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KycService } from 'src/app/shared/services/kyc-service/kyc.service';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.css']
})
export class KycFormComponent implements OnInit {

  step = 1
  personalDetails = true
  proffesionalDetails = false
  nextOfKinInfo = false
  addressDetails = false
  telephoneDetails = false
  guarrantorInfo = false

  showLoader: boolean = false

  message: string = ''

  selectedFile?: Blob
  base64: string = "gvbnwldm;s"

  kycForm = new FormGroup({
    personalDetails: new FormGroup({
      home_address: new FormControl('', [Validators.required]),
      office_address: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      employment_date: new FormControl('', [Validators.required]),
      id_card_type: new FormControl('', [Validators.required]),
      id_card_no: new FormControl('', [Validators.required]),
      country_id: new FormControl('', [Validators.required]),
      id_card_expiry: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      marital_status: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    }),
    proffesionalDetails: new FormGroup({
      place_of_work: new FormControl('', [Validators.required]),
      position_held: new FormControl('', [Validators.required]),
      educational_qualification: new FormControl('', [Validators.required]),
      career_level: new FormControl(''),
      years_of_experience: new FormControl('')
    }),
    addressDetails: new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      lga_id: new FormControl('', Validators.required),
    }),
    telephoneDetails: new FormGroup({
      type: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required)
    }),
    nextOfKinInfo: new FormGroup({
      next_of_kin_first_name: new FormControl('', Validators.required),
      next_of_kin_last_name: new FormControl('', Validators.required),
      next_of_kin_relationship: new FormControl('', Validators.required),
      next_of_kin_phone: new FormControl('', Validators.required),
      next_of_kin_address: new FormControl('', Validators.required)
    }),
    guarrantorInfo: new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      place_of_work: new FormControl('', Validators.required),
      office_email: new FormControl('', Validators.required),
      office_address: new FormControl('', Validators.required),
      home_address: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    })
  })

  constructor(private kycAPIs: KycService, private router: Router) { }

  ngOnInit(): void {
    
  }

  get personalDetail() {
    return (this.kycForm.controls['personalDetails'] as FormGroup)
  }

  converToBase64(event: any) {
    this.selectedFile = event.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(this.selectedFile as Blob)
    reader.onloadend = () => {
      this.base64 = reader.result as string
    }
    
  }

  submitKycInfo() {
    if (this.kycForm.controls['personalDetails'].valid) {
      this.step = 2
    } else {
      this.message = "Please Complete this form before going to the next form."
    }
    
    if (this.kycForm.controls['proffesionalDetails'].valid) {
      this.step = 3
    }
    
    if (this.kycForm.controls['nextOfKinInfo'].valid) {
      this.step = 4
    }
    
    if (this.kycForm.controls['addressDetails'].valid) {
      this.step = 5
    }
        
    if (this.step == 2) {
      if (this.kycForm.controls['personalDetails'].valid) {
        delete this.kycForm.controls['personalDetails'].value.content
        
        let payload = {
          ...this.kycForm.controls['personalDetails'].value
        }
        this.kycAPIs.kycPersonalDetails(payload).subscribe(res => {
          console.log(res);
        })

        let userDocumentPayload = {
          slug: 'statement',
          content: this.base64,
          name: ""
        }
        this.showLoader = true
        this.kycAPIs.kycUserDocument(userDocumentPayload).subscribe(res => {
          console.log(res);
        }).add(() => this.showLoader = false)
      }
      this.proffesionalDetails = true
    }

    if (this.step == 3) {
      if (this.kycForm.controls['proffesionalDetails'].valid) {
        let payload = {
          ...this.kycForm.controls['proffesionalDetails'].value
        }
        this.showLoader = true
        this.kycAPIs.kycProffesionalDetails(payload).subscribe(res => {
          console.log(res)
        }).add(() => this.showLoader = false)
      }
      this.addressDetails = true
    }

    if (this.step == 4) {
      if (this.kycForm.controls['addressDetails'].valid) {
        let payload = {
          ...this.kycForm.controls['addressDetails'].value
        }
        this.showLoader = true
        this.kycAPIs.kycAddressDetails(payload).subscribe(res => {
          console.log(res)
        }).add(() => this.showLoader = false)
      }
      this.telephoneDetails = true
    }

    if (this.step == 5) {
      if (this.kycForm.controls['telephoneDetails'].valid) {
        let payload = {
          ...this.kycForm.controls['telephoneDetails'].value
        }
        this.showLoader = true
        this.kycAPIs.kycTelephoneDetails(payload).subscribe(res => {
          console.log(res)
        }).add(() => this.showLoader = false)
      }
      this.nextOfKinInfo = true
    }

    if (this.step === 6) {
      if (this.kycForm.controls['nextOfKinInfo'].valid) {
        let payload = {
          ...this.kycForm.controls['nextOfKinInfo'].value
        }
        this.showLoader = true 
        this.kycAPIs.kycNextOfKinDetails(payload).subscribe(res => {
          console.log(res)
        }).add(() => this.showLoader = false)
      }
      this.guarrantorInfo = true
    }

    if (this.step === 7) {
      if (this.kycForm.controls['guarrantorInfo'].valid) {
        delete this.kycForm.controls['guarrantorInfo'].value.content
        
        let payload = {
          ...this.kycForm.controls['guarrantorInfo'].value
        }
        this.showLoader = true
        this.kycAPIs.kycGuarrantorDetails(payload).subscribe(res => {
          console.log(res);
        })

        let guarrantorDocumentPayload = {
          slug: 'statement',
          content: this.base64,
          name: ""
        }
        this.showLoader = true
        this.kycAPIs.kycGuarrantorDocument(guarrantorDocumentPayload).subscribe(res => {
          console.log(res);
          this.router.navigate(['Authenticated/dashboard/'])
        }).add(() => this.showLoader = false)
      }
    }
  }

  previous() {
    this.step = this.step - 1

    if (this.step === 5) {
      this.guarrantorInfo = false
    }

    if (this.step === 4) {
      this.telephoneDetails = false
    }

    if (this.step === 3) {
      this.addressDetails = false
    }

    if (this.step === 2) {
      this.nextOfKinInfo = false
    }

    if (this.step === 1) {
      this.proffesionalDetails = false
    }
  }

}


