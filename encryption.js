/* تشفير البيانات المرسلة من النماذج */
document.addEventListener('DOMContentLoaded', function() {
    // إضافة طبقة أمان إضافية للنماذج
    enhanceFormSecurity();
    
    // إضافة مراقبة للمدخلات لمنع هجمات الحقن
    monitorInputs();
    
    // تفعيل تشفير البيانات المرسلة
    enableDataEncryption();
    
    // إضافة حماية ضد هجمات CSRF
    addCSRFProtection();
    
    // تفعيل التحقق من صحة المدخلات
    enableInputValidation();
});

// تعزيز أمان النماذج
function enhanceFormSecurity() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // إضافة سمة novalidate للتحكم في التحقق من صحة المدخلات بواسطة JavaScript
        form.setAttribute('novalidate', 'true');
        
        // إضافة معالج أحداث للتحقق من صحة المدخلات قبل الإرسال
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // التحقق من صحة المدخلات
            if (validateForm(this)) {
                // تشفير البيانات قبل الإرسال
                const encryptedData = encryptFormData(this);
                console.log('تم تشفير البيانات:', encryptedData);
                
                // محاكاة إرسال البيانات
                simulateFormSubmission(encryptedData);
                
                // إعادة تعيين النموذج
                this.reset();
            }
        });
    });
}

// التحقق من صحة النموذج
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // إزالة رسائل الخطأ السابقة
        removeErrorMessage(input);
        
        // التحقق من الحقول المطلوبة
        if (input.hasAttribute('required') && !input.value.trim()) {
            showErrorMessage(input, 'هذا الحقل مطلوب');
            isValid = false;
            return;
        }
        
        // التحقق من صحة البريد الإلكتروني
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                showErrorMessage(input, 'يرجى إدخال بريد إلكتروني صحيح');
                isValid = false;
                return;
            }
        }
        
        // التحقق من صحة رقم الهاتف
        if (input.id === 'phone' && input.value.trim()) {
            const phoneRegex = /^05\d{8}$/;
            if (!phoneRegex.test(input.value.trim())) {
                showErrorMessage(input, 'يرجى إدخال رقم هاتف صحيح يبدأ بـ 05 ويتكون من 10 أرقام');
                isValid = false;
                return;
            }
        }
    });
    
    return isValid;
}

// عرض رسالة خطأ
function showErrorMessage(input, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorElement);
    input.style.borderColor = 'red';
}

// إزالة رسالة خطأ
function removeErrorMessage(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    input.style.borderColor = '';
}

// تشفير بيانات النموذج
function encryptFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // محاكاة التشفير باستخدام Base64
    const encryptedData = btoa(JSON.stringify(data));
    
    return {
        data: encryptedData,
        timestamp: new Date().getTime(),
        token: generateSecurityToken(32)
    };
}

// إنشاء رمز أمان عشوائي
function generateSecurityToken(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return token;
}

// محاكاة إرسال النموذج
function simulateFormSubmission(encryptedData) {
    console.log('جاري إرسال البيانات المشفرة...');
    
    // محاكاة تأخير الإرسال
    setTimeout(() => {
        console.log('تم إرسال البيانات بنجاح!');
        alert('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.');
    }, 1000);
}

// مراقبة المدخلات لمنع هجمات الحقن
function monitorInputs() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // تنظيف المدخلات من الأكواد الضارة
            this.value = sanitizeInput(this.value);
        });
    });
}

// تنظيف المدخلات من الأكواد الضارة
function sanitizeInput(input) {
    // استبدال العلامات HTML بنصوص آمنة
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/\\/g, '&#x5C;')
        .replace(/`/g, '&#96;');
}

// تفعيل تشفير البيانات المرسلة
function enableDataEncryption() {
    // محاكاة تشفير البيانات المرسلة
    console.log('تم تفعيل تشفير البيانات المرسلة');
}

// إضافة حماية ضد هجمات CSRF
function addCSRFProtection() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // إنشاء رمز CSRF
        const csrfToken = generateSecurityToken(64);
        
        // تخزين الرمز في الجلسة
        if (typeof(Storage) !== 'undefined') {
            sessionStorage.setItem('csrf_token', csrfToken);
        }
        
        // إضافة حقل مخفي للرمز
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = csrfToken;
        
        form.appendChild(csrfInput);
    });
}

// تفعيل التحقق من صحة المدخلات
function enableInputValidation() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            // إزالة رسائل الخطأ السابقة
            removeErrorMessage(this);
            
            // التحقق من الحقول المطلوبة
            if (this.hasAttribute('required') && !this.value.trim()) {
                showErrorMessage(this, 'هذا الحقل مطلوب');
                return;
            }
            
            // التحقق من صحة البريد الإلكتروني
            if (this.type === 'email' && this.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value.trim())) {
                    showErrorMessage(this, 'يرجى إدخال بريد إلكتروني صحيح');
                    return;
                }
            }
            
            // التحقق من صحة رقم الهاتف
            if (this.id === 'phone' && this.value.trim()) {
                const phoneRegex = /^05\d{8}$/;
                if (!phoneRegex.test(this.value.trim())) {
                    showErrorMessage(this, 'يرجى إدخال رقم هاتف صحيح يبدأ بـ 05 ويتكون من 10 أرقام');
                    return;
                }
            }
        });
    });
}
