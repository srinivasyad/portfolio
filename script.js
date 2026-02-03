document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        htmlElement.classList.remove('dark');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        htmlElement.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    themeToggle.addEventListener('click', () => {
        if (htmlElement.getAttribute('data-theme') === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const originalText = titleElement.innerHTML;
        const textBeforeSpan = 'Student | ';
        const spanContent = 'Aspiring Software Developer';
        titleElement.innerHTML = textBeforeSpan;
        let charIndex = 0;
        const typingSpeed = 100;
        function typeText() {
            if (charIndex < spanContent.length) {
                if (charIndex === 0) {
                    titleElement.innerHTML = textBeforeSpan + '<span class="gradient-text"></span>';
                }
                const spanElement = titleElement.querySelector('.gradient-text');
                spanElement.textContent += spanContent.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            }
        }
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    mobileToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        // Toggle icon
        const mobileIcon = mobileToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            mobileIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            mobileIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        document.body.insertBefore(particlesContainer, document.body.firstChild);
        // Create simple floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();
    const skillTags = document.querySelectorAll('.tags span');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'all 0.5s ease';
        skillObserver.observe(tag);
    });
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    const cards = document.querySelectorAll('.about-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    const achievementNumbers = document.querySelectorAll('.achievement-item h3');
    let countersAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                achievementNumbers.forEach(number => {
                    const text = number.textContent;
                    const match = text.match(/(\d+)/);
                    if (match) {
                        const target = parseInt(match[0]);
                        const suffix = text.replace(/\d+/, '');
                        animateCounter(number, 0, target, 2000, suffix);
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    if (achievementNumbers.length > 0) {
        counterObserver.observe(achievementNumbers[0].parentElement);
    }
    function animateCounter(element, start, end, duration, suffix) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    const revealTexts = document.querySelectorAll('h2, h3, p');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealTexts.forEach(text => {
        text.classList.add('reveal-text');
        revealObserver.observe(text);
    });
    const contactForm = document.getElementById('contact-form');
    const contactFormContainer = document.getElementById('contact-form-container');
    const contactDetailsRevealed = document.getElementById('contact-details-revealed');
    // Initialize EmailJS with your Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('4lhGJrSv98V_UI6Vr'); // EmailJS Public Key
    }
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Get submit button and show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            // Get form values
            const name = document.getElementById('visitor-name').value.trim();
            const email = document.getElementById('visitor-email').value.trim();
            const phone = document.getElementById('visitor-phone').value.trim();
            const company = document.getElementById('visitor-company').value.trim();
            const reason = document.getElementById('visitor-reason').value;
            const message = document.getElementById('visitor-message').value.trim();
            // Validation: Email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                alert('❌ Please enter a valid email address (e.g., your.email@example.com)');
                return;
            }
            // Validation: Phone number (at least 10 digits)
            const phoneDigits = phone.replace(/\D/g, ''); // Remove non-digits
            if (phoneDigits.length < 10) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                alert('❌ Please enter a valid phone number with at least 10 digits');
                return;
            }
            // Validation: Message word count (minimum 3 words)
            const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
            if (wordCount < 3) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                alert('❌ Your message is too short or unclear. Please provide at least 3 words so I can understand your inquiry better.');
                return;
            }
            // Get reason text (not value)
            const reasonSelect = document.getElementById('visitor-reason');
            const reasonText = reasonSelect.options[reasonSelect.selectedIndex].text;
            // Prepare email template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone,
                company: company || 'Not provided',
                reason: reasonText,
                message: message,
                to_name: 'Srinivas Yad'
            };
            // Send email via EmailJS
            // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            const sendEmail = typeof emailjs !== 'undefined';
            const processFormSubmission = () => {
                // Store in localStorage (optional - for persistence)
                const contactData = {
                    name,
                    email,
                    phone,
                    company,
                    reason: reasonText,
                    message,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('portfolioContactSubmission', JSON.stringify(contactData));
                // Update the revealed section with submitted data
                document.getElementById('submitted-name').textContent = name;
                document.getElementById('submitted-reason').textContent = reasonText;
                document.getElementById('submitted-message').textContent = message;
                // Hide form and show contact details with animation
                contactFormContainer.style.opacity = '0';
                contactFormContainer.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    contactFormContainer.style.display = 'none';
                    contactDetailsRevealed.classList.add('show');
                    // Scroll to the revealed section smoothly
                    contactDetailsRevealed.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            };
            if (sendEmail) {
                // Send notification email to you
                emailjs.send('service_2sql7xi', 'template_myuks68', templateParams)
                    .then(function (response) {
                        console.log('✅ Notification email sent successfully!', response.status);
                        // Send auto-reply email to visitor
                        const autoReplyParams = {
                            to_email: email,
                            to_name: name,
                            reason: reasonText,
                            message: message,
                            from_name: 'Srinivas Yad'
                        };
                        emailjs.send('service_2sql7xi', 'template_da0gypn', autoReplyParams)
                            .then(function (autoReplyResponse) {
                                console.log('✅ Auto-reply sent to visitor!', autoReplyResponse.status);
                            }, function (autoReplyError) {
                                console.warn('⚠️ Auto-reply failed (but main email sent):', autoReplyError);
                            });
                        processFormSubmission();
                    }, function (error) {
                        console.error('❌ Email sending failed:', error);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                        alert('Failed to send notification email. Please try contacting me directly at srinivasyad05@gmail.com');
                    });
            } else {
                // EmailJS not configured - still process form
                console.warn('⚠️ EmailJS not configured. Skipping email notification.');
                processFormSubmission();
            }
        });
    }
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                this.classList.add('copied');
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy to clipboard');
            });
        });
    });
    const requestCallBtn = document.getElementById('request-call-btn');
    const phoneNumber = document.getElementById('phone-number');
    const phoneHidden = document.getElementById('phone-hidden');
    const phoneCopyBtn = document.getElementById('phone-copy-btn');
    if (requestCallBtn) {
        requestCallBtn.addEventListener('click', function () {
            // Get visitor data from localStorage
            const savedSubmission = localStorage.getItem('portfolioContactSubmission');
            if (!savedSubmission) {
                alert('Please fill out the contact form first to request a call.');
                return;
            }
            const visitorData = JSON.parse(savedSubmission);
            // Disable button and show loading
            const originalBtnText = this.innerHTML;
            this.disabled = true;
            this.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending request...';
            // Send call request email to you
            if (typeof emailjs !== 'undefined') {
                const callRequestParams = {
                    from_name: visitorData.name,
                    from_email: visitorData.email,
                    from_phone: visitorData.phone || 'Not provided',
                    company: visitorData.company || 'Not provided',
                    reason: visitorData.reason,
                    message: visitorData.message,
                    to_name: 'Srinivas Yad',
                    request_type: 'Call Request'
                };
                emailjs.send('service_2sql7xi', 'template_myuks68', callRequestParams)
                    .then((response) => {
                        console.log('✅ Call request sent!', response.status);
                        // Update UI to show success
                        phoneHidden.innerHTML = '<i class="fa-solid fa-circle-check"></i> Request sent! I\'ll contact you soon.';
                        phoneHidden.style.color = 'var(--accent)';
                        phoneHidden.style.fontWeight = '600';
                        this.style.display = 'none';
                    }, (error) => {
                        console.error('❌ Call request failed:', error);
                        this.disabled = false;
                        this.innerHTML = originalBtnText;
                        alert('Failed to send request. Please try again or email me directly.');
                    });
            } else {
                alert('Email service not configured. Please contact me directly at srinivasyad05@gmail.com');
                this.disabled = false;
                this.innerHTML = originalBtnText;
            }
        });
    }
    const savedSubmission = localStorage.getItem('portfolioContactSubmission');
    if (savedSubmission) {
        const data = JSON.parse(savedSubmission);
        // Optional: Auto-show contact details if submitted within last 24 hours
        const submissionTime = new Date(data.timestamp);
        const now = new Date();
        const hoursSinceSubmission = (now - submissionTime) / (1000 * 60 * 60);
        if (hoursSinceSubmission < 24) {
            // Auto-reveal contact details
            document.getElementById('submitted-name').textContent = data.name;
            document.getElementById('submitted-reason').textContent = data.reason;
            document.getElementById('submitted-message').textContent = data.message;
            contactFormContainer.style.display = 'none';
            contactDetailsRevealed.classList.add('show');
        }
    }
});
