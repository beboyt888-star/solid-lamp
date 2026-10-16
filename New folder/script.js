/* ============================================
   موقع خديجة - My Special One
   JavaScript الكامل
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== 1. Lightbox لعرض الصور ===== */
    // إنشاء هيكل الـ Lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-prev">&#10095;</span>
        <img src="" alt="عرض الصورة">
        <span class="lightbox-next">&#10094;</span>
        <div class="lightbox-counter"></div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const counter = lightbox.querySelector('.lightbox-counter');

    // جمع كل الصور القابلة للعرض (في gallery + cards)
    const images = document.querySelectorAll('.gallery-grid img, .card img');
    let currentIndex = 0;
    const imagesArray = Array.from(images);

    // فتح الـ Lightbox
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imagesArray[currentIndex].src;
        counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // إغلاق الـ Lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // التالي
    function nextImage() {
        currentIndex = (currentIndex + 1) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex].src;
        counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
    }

    // السابق
    function prevImage() {
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        lightboxImg.src = imagesArray[currentIndex].src;
        counter.textContent = `${currentIndex + 1} / ${imagesArray.length}`;
    }

    // ربط الصور بحدث الضغط
    imagesArray.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // أحداث التحكم
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // الضغط على الخلفية يغلق
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // التحكم بلوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') nextImage();
        if (e.key === 'ArrowRight') prevImage();
    });

    /* ===== 2. التمرير السلس للروابط ===== */
    document.querySelectorAll('.nav-links a, .cta-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });

    /* ===== 3. تحديد الرابط النشط عند التمرير ===== */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ===== 4. تأثير الظهور عند التمرير (Fade In) ===== */
    const fadeElements = document.querySelectorAll(
        '.card, .about-text, .about-img, .gallery-grid img, .message-box'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => observer.observe(el));

    /* ===== 5. زر العودة للأعلى ===== */
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    /* ===== 6. تأثير القلوب عند الضغط ===== */
    document.addEventListener('click', (e) => {
        // تجاهل النقر على الأزرار والروابط
        if (e.target.closest('a, button, .lightbox')) return;

        const heart = document.createElement('i');
        heart.className = 'fa-solid fa-heart heart-float';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    });

    /* ===== 7. رسالة ترحيب في الكونسول ===== */
    console.log('%c💖 مرحباً بك في موقع خديجة 💖', 
        'color: #ff4d6d; font-size: 20px; font-weight: bold;');
    console.log('%cصنع بحب ❤️ - إبراهيم', 
        'color: #ff8fa3; font-size: 14px;');
});
/* ===== تأثير الألعاب النارية عند الضغط على "إضغط هنا" ===== */
const fireworksBtn = document.getElementById('fireworks-btn');

if (fireworksBtn) {
    fireworksBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // تأثير اهتزاز الزر
        fireworksBtn.classList.add('clicked');
        setTimeout(() => fireworksBtn.classList.remove('clicked'), 500);

        // وميض الشاشة
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 700);

        // تشغيل الألعاب النارية
        launchFireworks();

        // إظهار رسالة "أحبك يا خديجة 💖"
        const msg = document.createElement('div');
        msg.className = 'fireworks-message';
        msg.innerHTML = 'أحبك يا خديجة <i class="fa-solid fa-heart"></i>';
        document.body.appendChild(msg);
        setTimeout(() => msg.classList.add('show'), 100);
        setTimeout(() => msg.remove(), 3000);
    });
}

/* ===== دالة الألعاب النارية ===== */
function launchFireworks() {
    // إنشاء Canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'fireworks-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // ألوان الألعاب النارية (نفس ألوان الصفحة)
    const colors = [
        '#ff4d6d', // الوردي الأساسي
        '#ff8fa3', // الوردي الفاتح
        '#ff1e4d', // أحمر وردي
        '#ffb3c1', // وردي ناعم
        '#ffffff', // أبيض للتألق
        '#ff006e'  // وردي غامق
    ];

    const particles = [];
    const rockets = [];

    // شكل الجزيئة الواحدة
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.008;
            this.size = Math.random() * 3 + 1;
            // بعض الجزيئات شكلها قلوب ❤️
            this.isHeart = Math.random() < 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.08; // جاذبية
            this.vx *= 0.99; // مقاومة الهواء
            this.vy *= 0.99;
            this.life -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;

            if (this.isHeart) {
                // رسم قلب صغير
                const s = this.size * 1.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x, this.y - s, this.x - s, this.y - s, this.x - s, this.y);
                ctx.bezierCurveTo(this.x - s, this.y + s, this.x, this.y + s * 1.5, this.x, this.y + s * 2);
                ctx.bezierCurveTo(this.x, this.y + s * 1.5, this.x + s, this.y + s, this.x + s, this.y);
                ctx.bezierCurveTo(this.x + s, this.y - s, this.x, this.y - s, this.x, this.y);
                ctx.fill();
            } else {
                // نقطة دائرية
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // الصاروخ اللي بيطلع لفوق وبعدين ينفجر
    class Rocket {
        constructor(targetX, targetY) {
            this.x = targetX;
            this.y = canvas.height;
            this.targetY = targetY;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = 8 + Math.random() * 4;
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 8) this.trail.shift();

            this.y -= this.speed;

            if (this.y <= this.targetY) {
                this.explode();
                return true; // انتهى
            }
            return false;
        }

        draw() {
            // ذيل الصاروخ
            this.trail.forEach((p, i) => {
                ctx.save();
                ctx.globalAlpha = i / this.trail.length * 0.7;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            // رأس الصاروخ
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        explode() {
            // عدد الجزيئات حسب حجم الانفجار
            const count = 50 + Math.floor(Math.random() * 40);
            // أحياناً انفجار مزدوج اللون
            const color2 = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < count; i++) {
                const color = Math.random() < 0.5 ? this.color : color2;
                particles.push(new Particle(this.x, this.y, color));
            }
        }
    }

    // إطلاق 8 صواريخ في نفس الوقت من مواقع مختلفة
    function fireMultiple() {
        const numRockets = 8;
        for (let i = 0; i < numRockets; i++) {
            setTimeout(() => {
                const x = (canvas.width / (numRockets + 1)) * (i + 1) + (Math.random() - 0.5) * 100;
                const y = canvas.height * (0.15 + Math.random() * 0.35);
                rockets.push(new Rocket(x, y));
            }, i * 120);
        }
    }

    // حلقة الرسم
    let animationId;
    let startTime = Date.now();
    const duration = 5000; // 5 ثواني

    function animate() {
        // تأثير ذيل شفاف (تأثير رائع)
        ctx.fillStyle = 'rgba(13, 6, 8, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // تحديث ورسم الصواريخ
        for (let i = rockets.length - 1; i >= 0; i--) {
            const done = rockets[i].update();
            if (done) {
                rockets.splice(i, 1);
            } else {
                rockets[i].draw();
            }
        }

        // تحديث ورسم الجزيئات
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        // إعادة إطلاق صواريخ جديدة كل ثانية
        if (Date.now() - startTime < duration - 2000) {
            if (Math.random() < 0.04) {
                const x = Math.random() * canvas.width;
                const y = canvas.height * (0.1 + Math.random() * 0.4);
                rockets.push(new Rocket(x, y));
            }
        }

        // إيقاف بعد انتهاء المدة
        if (Date.now() - startTime < duration || particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            canvas.remove();
        }
    }

    fireMultiple();
    animate();

    // إعادة ضبط الحجم لو تغيرت الشاشة
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

/* ============================================
   🎬 فتح وإغلاق الفيديو + القلوب
   ============================================ */

function openVideo() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('special-video');
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // شغّل الفيديو تلقائياً لما يفتح
    if (video) {
        video.play().catch(() => {
            // لو المتصفح منع التشغيل التلقائي، مفيش مشكلة، العميلة هتضغط Play
        });
    }

    // أطلق شوية قلوب حوالين الفيديو
    spawnHeartsAroundVideo();
}

function closeVideo(event) {
    if (event) event.stopPropagation();
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('special-video');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';

    // وقّف الفيديو
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// إغلاق عند الضغط على الخلفية
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeVideo();
        });
    }

    // إغلاق بمفتاح Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('video-modal');
            if (modal && modal.classList.contains('active')) closeVideo();
        }
    });
});

// دالة إطلاق قلوب إضافية حوالين الفيديو
function spawnHeartsAroundVideo() {
    const wrapper = document.querySelector('.video-hearts-wrapper');
    if (!wrapper) return;

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('i');
            heart.className = 'fa-solid fa-heart';
            heart.style.cssText = `
                position: absolute;
                color: #ff4d6d;
                font-size: ${1 + Math.random() * 1.5}rem;
                pointer-events: none;
                z-index: 5;
                filter: drop-shadow(0 0 10px #ff4d6d);
                transition: all 2s ease-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;
            wrapper.appendChild(heart);

            setTimeout(() => {
                heart.style.opacity = '1';
                heart.style.transform = `translateY(-${30 + Math.random() * 50}px) scale(${1 + Math.random()}) rotate(${Math.random() * 360}deg)`;
            }, 50);

            setTimeout(() => {
                heart.style.opacity = '0';
                heart.style.transform += ' scale(0.3)';
            }, 1800);

            setTimeout(() => heart.remove(), 2500);
        }, i * 150);
    }
}
/* ============================================
   💖 تأثير انفجار القلوب عند الضغط على "لأنك أجمل ما في حياتي"
   ============================================ */

function launchHeartExplosion() {
    // 1. وميض الشاشة
    const flash = document.createElement('div');
    flash.className = 'love-screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 900);

    // 2. إنشاء مسرح الانفجار
    const stage = document.createElement('div');
    stage.className = 'heart-explosion-stage';
    document.body.appendChild(stage);

    // 3. القلب الكبير في المنتصف
    const bigHeart = document.createElement('i');
    bigHeart.className = 'fa-solid fa-heart big-exploding-heart';
    stage.appendChild(bigHeart);

    // 4. بعد 400 مللي، ابدأ انفجار القلوب الصغيرة
    setTimeout(() => {
        const heartCount = 40; // عدد القلوب الصغيرة

        for (let i = 0; i < heartCount; i++) {
            const smallHeart = document.createElement('i');
            smallHeart.className = 'fa-solid fa-heart explosion-heart';

            // حجم عشوائي
            const size = 0.8 + Math.random() * 1.8;
            smallHeart.style.fontSize = size + 'rem';

            // لون عشوائي من درجات الوردي
            const colors = ['#ff4d6d', '#ff8fa3', '#ff1e4d', '#ffb3c1', '#ff006e', '#fff'];
            smallHeart.style.color = colors[Math.floor(Math.random() * colors.length)];
            smallHeart.style.filter = `drop-shadow(0 0 10px ${smallHeart.style.color})`;

            stage.appendChild(smallHeart);

            // زاوية عشوائية للطيران
            const angle = (Math.PI * 2 / heartCount) * i + (Math.random() - 0.5) * 0.5;
            // مسافة عشوائية
            const distance = 200 + Math.random() * 400;
            // اتجاه الطيران
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            // دوران عشوائي
            const rotation = Math.random() * 720 - 360;
            // مدة الطيران
            const duration = 1.5 + Math.random() * 1.5;

            // حرّك القلب
            requestAnimationFrame(() => {
                smallHeart.style.transition = `all ${duration}s cubic-bezier(0.15, 0.7, 0.5, 1)`;
                smallHeart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rotation}deg) scale(${0.6 + Math.random() * 0.8})`;
                smallHeart.style.opacity = '0';
            });

            // احذف القلب بعد انتهاء الحركة
            setTimeout(() => smallHeart.remove(), duration * 1000 + 200);
        }

        // احذف المسرح بعد ما يخلص
        setTimeout(() => stage.remove(), 3500);
    }, 400);

    // 5. رسالة تظهر في النص
    const msg = document.createElement('div');
    msg.className = 'love-message-popup';
    msg.innerHTML = 'أحبك يا خديجة ❤️';
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 200);
    setTimeout(() => msg.remove(), 3000);

    // 6. شغّل الألعاب النارية كمان (اختياري)
    if (typeof launchFireworks === 'function') {
        setTimeout(() => launchFireworks(), 300);
    }
}

/* ===== ربط الزرار بالحدث ===== */
document.addEventListener('DOMContentLoaded', () => {
    const loveBtn = document.getElementById('love-btn');
    if (loveBtn) {
        loveBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // تأثير اهتزاز الزر
            loveBtn.classList.add('pressed');
            setTimeout(() => loveBtn.classList.remove('pressed'), 600);

            // شغّل الانفجار
            launchHeartExplosion();
        });
        console.log('✅ زر الحب متصل بنجاح');
    } else {
        console.warn('⚠️ زر love-btn مش موجود في HTML');
    }
});