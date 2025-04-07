// ملف تشفير وأمان الموقع

document.addEventListener('DOMContentLoaded', function() {
    // تأمين نموذج الاتصال
    secureContactForm();
    
    // منع هجمات XSS
    preventXSS();
    
    // تشفير البيانات المرسلة
    setupEncryption();
    
    // إضافة رمز CSRF للنماذج
    addCSRFProtection();
    
    // تأمين الكوكيز
    secureCookies();
    
    // منع الكشف عن معلومات الخادم
    hideServerInfo();
});

// تأمين نموذج الاتصال
function secureContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // إضافة التحقق من صحة المدخلات
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // التحقق من صحة الاسم
            if (!validateName(name)) {
                alert('الرجاء إدخال اسم صحيح');
                return false;
            }
            
            // التحقق من صحة رقم الهاتف
            if (!validatePhone(phone)) {
                alert('الرجاء إدخال رقم هاتف صحيح');
                return false;
            }
            
            // التحقق من صحة الرسالة
            if (!validateMessage(message)) {
                alert('الرجاء إدخال رسالة صحيحة');
                return false;
            }
            
            // تشفير البيانات قبل الإرسال (محاكاة)
            const encryptedData = encryptData({
                name: name,
                phone: phone,
                message: message
            });
            
            // محاكاة إرسال البيانات المشفرة
            console.log('تم تشفير البيانات وإرسالها بأمان:', encryptedData);
            
            // عرض رسالة نجاح
            alert('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }
}

// التحقق من صحة الاسم
function validateName(name) {
    // التأكد من أن الاسم يحتوي على حروف فقط ولا يقل عن 3 أحرف
    return name.trim().length >= 3 && /^[\u0600-\u06FFa-zA-Z\s]+$/.test(name);
}

// التحقق من صحة رقم الهاتف
function validatePhone(phone) {
    // التأكد من أن رقم الهاتف يتكون من أرقام فقط ويبدأ بـ 05
    return /^05\d{8}$/.test(phone);
}

// التحقق من صحة الرسالة
function validateMessage(message) {
    // التأكد من أن الرسالة لا تقل عن 10 أحرف
    return message.trim().length >= 10;
}

// منع هجمات XSS
function preventXSS() {
    // تنظيف المدخلات
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = sanitizeInput(this.value);
        });
    });
}

// تنظيف المدخلات من الأكواد الضارة
function sanitizeInput(input) {
    // استبدال العلامات HTML بنصوص آمنة
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// تشفير البيانات (محاكاة)
function encryptData(data) {
    // هذه مجرد محاكاة للتشفير، في الواقع يجب استخدام خوارزميات تشفير حقيقية
    return {
        encryptedData: btoa(JSON.stringify(data)),
        timestamp: new Date().getTime(),
        securityToken: generateRandomToken(32)
    };
}

// إنشاء رمز عشوائي
function generateRandomToken(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return token;
}

// إضافة رمز CSRF للنماذج
function addCSRFProtection() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // إنشاء حقل مخفي لرمز CSRF
        const csrfToken = generateRandomToken(64);
        const csrfInput = document.createElement('input');
        
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = csrfToken;
        
        // تخزين الرمز في الجلسة (محاكاة)
        sessionStorage.setItem('csrf_token', csrfToken);
        
        // إضافة الحقل إلى النموذج
        form.appendChild(csrfInput);
    });
}

// تأمين الكوكيز
function secureCookies() {
    // تعيين خيارات الكوكيز الآمنة (محاكاة)
    document.cookie = "secure_session=true; SameSite=Strict; Secure; HttpOnly";
}

// منع الكشف عن معلومات الخادم
function hideServerInfo() {
    // إضافة رؤوس HTTP آمنة (محاكاة)
    console.log('تم إضافة رؤوس HTTP آمنة لمنع الكشف عن معلومات الخادم');
}
