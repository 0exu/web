/* BWU Elegant Lab - Interactivity & Animations */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Trigger when 15% of element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Elegant Form Handling
    const regForm = document.getElementById('regForm');
    
    if (regForm) {
        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = regForm.querySelector('.glow-button');
            const originalText = submitBtn.innerText;
            
            // Visual feedback for submission
            submitBtn.disabled = true;
            submitBtn.innerText = 'Processing...';
            
            const formData = new FormData(regForm);
            const name = formData.get('name');

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success Animation/Feedback
            showToast(`Welcome, ${name}! Registration successful.`);
            
            // Reset form and button
            regForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        });
    }

    // 3. Smooth Header Transition on Scroll
    const header = document.querySelector('.glass-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // 4. Custom Toast Notification System
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'elegant-toast';
        toast.innerText = message;
        
        // Inline styles for the toast to avoid adding more CSS files
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: '#0f172a',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            zIndex: '2000',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            fontFamily: "'Inter', sans-serif"
        });

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }

    // 5. Smooth Scroll for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});
