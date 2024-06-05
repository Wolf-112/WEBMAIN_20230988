const idsave_check = document.getElementById('idSaveCheck');

const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    if (emailValue === '') {
    alert('이메일을 입력하세요.');
    return false;
    }
    if (passwordValue === '') {
    alert('비밀번호를 입력하세요.');
    return false;
    }
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
        }
        if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
        }
        const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
        if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
        }
        const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
        const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
        if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
        }  
        const sanitizedPassword =
    check_xss(passwordValue);
        const sanitizedEmail = check_xss(emailValue); 
        
        if (!sanitizedEmail) {
            return false;
        }

        if (!sanitizedPassword) {
            return false;
        }
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    if(idsave_check.checked == true) { // 아이디 체크 o 
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue);
        alert("쿠키 값:" + emailValue);
    }
    else
    { // 아이디 체크 x 
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }
    loginForm.submit();
    };
    document.getElementById("login_btn").addEventListener('click', check_input);

    const check_xss = (input) => {
        // DOMPurify 라이브러리 로드 (CDN 사용)
        const DOMPurify = window.DOMPurify;

        const saitizedInput = DOMPurify.sanitize(input);

        if (saitizedInput !== input) {
            alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
            return false;
        }

        return sanitizedInput;
    };


function init() { // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmialX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
    }
    session_check();
}
    
function session_set() { // 세션 저장
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typeEmailX");
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);

    } else {
        alert("로컬 스토리지 지원 x");
    }
}

function session_get() {//세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() {
    if (sessionStorage.getItem("Sesssion_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; 
    }
}

function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert("로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.");
    } else {
        alert("세션 스토리지 지원 x");
    }
}
    
function logout(){
    session_del();
    location.href='../index.html';
}

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.UTF8.parse(key), {
        iv:CryptoJS.enc.UTF8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CrytoJS.enc.Utf8.parse(key), {
        iv:CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password){
    const k = "key"; //클라이언트 키
    const rk = k.padEnd(32," "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; //서버 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); //복호화 함수
    }
    else{
        alert("세션 스토리지 지원x");
    }
}