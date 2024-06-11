function session_set(){
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date();

    const obj = {
    id : id.value,
    otp : random
    }

    if (sessionStorage) {
        const objString = JSON.stringify(obj); 
        let en text = encrypt text(objString);
        sessionStorage.setItem("Session Storage object",objString);
        sessionStorage.setItem("Session_Storage_encrypted",en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}