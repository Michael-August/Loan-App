import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IKycAddressDetails, IKycGuarrantorDetails, IKycGuarrantorDocument, IKycNexoffKinDetails, IKycPersonalDetails, IKycProffesionalDetails, IKycTelephoneDetails, IKycUserDocument } from 'src/app/pages/dashboard/KYC-form/kyc.models';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(private http: HttpClient) { }

  kycPersonalDetails(details: IKycPersonalDetails) {
    return this.http.post(`${BASE_URL}/kyc/update-personal-information`, details)
  }

  kycProffesionalDetails(details: IKycProffesionalDetails) {
    return this.http.post(`${BASE_URL}/kyc/update-professional-information`, details)
  }

  kycAddressDetails(details: IKycAddressDetails) {
    return this.http.post(`${BASE_URL}/kyc/add-address`, details)
  }

  kycTelephoneDetails(details: IKycTelephoneDetails) {
    return this.http.post(`${BASE_URL}/kyc/add-telephone`, details)
  }

  kycNextOfKinDetails(details: IKycNexoffKinDetails) {
    return this.http.post(`${BASE_URL}/kyc/update-next-of-kin-information`, details)
  }

  kycGuarrantorDetails(details: IKycGuarrantorDetails) {
    return this.http.post(`${BASE_URL}/kyc/update-guarantor-information`, details)
  }

  kycUserDocument(document: IKycUserDocument) {
    return this.http.post(`${BASE_URL}/kyc/document/user`, document)
  }

  kycGuarrantorDocument(document: IKycGuarrantorDocument) {
    return this.http.post(`${BASE_URL}/kyc/document/guarantor`, document)
  }

}
