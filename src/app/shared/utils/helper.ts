import Swal, { SweetAlertType, SweetAlertOptions } from 'sweetalert2'

export const TIMED_SWEET_ALERT = (
    alert_title: string,
    alert_text: string,
    alert_type: SweetAlertType
) => {
    let options = {
        title: alert_title,
        text: alert_text,
        timer: 2000,
        type: alert_type,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false
    }
    return Swal.fire(options);
}

export const SWEET_ALERT = (
    alert_title: string,
    alert_text: string,
    alert_type: SweetAlertType
) => {
    let options = {
        title: alert_title,
        text: alert_text,
        type: alert_type,
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false
    }
    return Swal.fire(options);
}

// export const showAsyncLoader = (text: string) => {
//   Swal.fire({
//     text,
//     allowOutsideClick: false,
//     allowEscapeKey: false,
//     showConfirmButton: false,
//     onOpen(modalElement: HTMLElement): void {
//       Swal.showLoading();
//     }
//   });
// };

// export const closeAsyncLoader = () => {
//   Swal.hideLoading();
//   Swal.close();
// };