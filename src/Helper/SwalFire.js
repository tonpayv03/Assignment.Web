import Swal from 'sweetalert2'

const SwalFire = async (text, isSuccess = false) => {

    console.log('SwalFire msg: ', text);
    
    let result = await  Swal.fire({
        icon: isSuccess ? 'success' : 'error',
        title: text,
        text: '',
        showCancelButton: false,
        confirmButtonColor: '#46619C',
        confirmButtonText: 'OK',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        } else {
            return false;
        }
    })

    return result;
}

export default SwalFire