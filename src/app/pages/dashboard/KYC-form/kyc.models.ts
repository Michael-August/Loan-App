export interface IKycPersonalDetails {
    home_address: string,
    office_address: string,
    date_of_birth: string,
    employment_date: string,
    id_card_type: string,
    id_card_no: number,
    country_id: string,
    id_card_expiry: string,
    gender: string,
    marital_status: string,
    statement: string,
}

export interface IKycProffesionalDetails {
    place_of_work: string,
    position_held: string,
    educational_qualification: string,
    career_level: string,
    years_of_experience: string
}

export interface IKycAddressDetails {
    street: string,
    city: string,
    lga_id: string,
}

export interface IKycTelephoneDetails {
    type: string,
    telephone: string
}

export interface IKycNexoffKinDetails {
    next_of_kin_first_name: string,
    next_of_kin_last_name: string,
    next_of_kin_relationship: string,
    next_of_kin_phone: string,
    next_of_kin_address: string
}

export interface IKycGuarrantorDetails {
    first_name: string,
    last_name: string,
    place_of_work: string,
    office_email: string,
    office_address: string,
    home_address: string,
    statement: string,
}

export interface IKycUserDocument {
    slug: string,
    content: string,
    name: string
}

export interface IKycGuarrantorDocument {
    slug: string,
    content: string,
    name: string
}