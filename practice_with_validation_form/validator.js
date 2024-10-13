// Đối tượng Validator
function Validator(options) {
    // Tạo ra một cái object để lưu các rules 
    var selectorRules = {};

    // Hàm thực hiện validate lấy element của form cần validate 
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];
        
        // Lọc qua từng rule và kiểm tra
        for(var i = 0; i < rules.length; i++){
            errorMessage = rules[i](inputElement.value);
            // Nếu có lỗi thì dừng việc kiểm tra vì nó đã không thỏa cái đầu tiên rồi
            if(errorMessage){
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }

        return !errorMessage;
    }

    // B1: Tìm ra tên form mình đang cần validate 
    // Tìm ra cái tên form đó và lưu vào biến formElement
    var formElement = document.querySelector(options.form);

    // B2: Nếu form đó có tồn tại thì mình mới bắt đầu xử lý validate
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function(e){
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if(!isValid){
                    isFormValid = false;
                }
            });

            if(isFormValid){
                console.log("Không có lỗi");
                if(typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disable])');
                }
            }
            else{
                console.log("Có lỗi");
            }
            
        }   
        // B3: Duyệt qua các rules của object đó và xử lý: blur, oninput,...
        options.rules.forEach(function (rule) {
            // Lưu lại các rules cho mỗi input
            // Xử lý nếu đã là array rồi thì push thêm vào chứ nếu không nó sẽ ghi đè lên chỗ cũ
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else{
                selectorRules[rule.selector] = [rule.test];
            }
            
            // Tìm ra chỗ input bị lỗi để thông báo 
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    // value: inputElement.selector
                    // test func: inputElement.test
                    validate(inputElement, rule);
                }

                // Xử lý trường hợp bắt đầu nhập lại input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

// Định nghĩa các rules 
// Nguyên tắc các rules:
// 1. Khi có lỗi ==> Trả ra message lỗi
// 2. Khi hợp lệ ==> Không trả ra cái gì 
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là Email';
        }
    };
}

Validator.minLength = function(selector, min){
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}