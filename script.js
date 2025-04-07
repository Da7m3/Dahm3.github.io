// قائمة منسدلة وتوافق الجوال
document.addEventListener('DOMContentLoaded', function() {
    // التعامل مع زر القائمة في الجوال
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }
    
    // التعامل مع القوائم المنسدلة في الجوال
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        if (window.innerWidth <= 768) {
            const link = dropdown.querySelector('a');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
        }
    });
    
    // التعامل مع نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // يمكن إضافة التحقق من صحة البيانات هنا
            
            // عرض رسالة نجاح
            alert('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.');
            contactForm.reset();
        });
    }
    
    // تأثير التمرير السلس للروابط
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // تجاهل الروابط المنسدلة في الجوال
            if (window.innerWidth <= 768 && this.parentElement.classList.contains('dropdown')) {
                return;
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // إغلاق القائمة في الجوال
                if (mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // تأثير ظهور العناصر عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تطبيق التأثير عند تحميل الصفحة
    window.addEventListener('load', function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .feature-card');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    });
    
    // تطبيق التأثير عند التمرير
    window.addEventListener('scroll', animateOnScroll);
});
