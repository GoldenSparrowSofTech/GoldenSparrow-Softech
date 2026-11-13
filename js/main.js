(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    

    // WhatsApp Form Integration
    const WHATSAPP_PHONE = '917990590007';

    // Quote Form to WhatsApp
    $(document).on('submit', '#quoteForm, .quote-form', function (e) {
        e.preventDefault();
        const form = $(this);
        const name = form.find('input[placeholder*="Name"]').val() || '';
        const email = form.find('input[placeholder*="Email"]').val() || '';
        const service = form.find('select option:selected').text() || 'Custom Software Solutions';
        const message = form.find('textarea').val() || '';

        const text = "*New Quote Request - Golden Sparrow SofTech*\n\n" +
                     "*Name:* " + name + "\n" +
                     "*Email:* " + email + "\n" +
                     "*Service:* " + service + "\n" +
                     "*Message:* " + message;

        const waUrl = "https://api.whatsapp.com/send?phone=" + WHATSAPP_PHONE + "&text=" + encodeURIComponent(text);
        window.open(waUrl, '_blank');
    });

    // Contact Form to WhatsApp
    $(document).on('submit', '#contactForm, .contact-form', function (e) {
        e.preventDefault();
        const form = $(this);
        const name = form.find('input[placeholder*="Name"]').val() || '';
        const email = form.find('input[placeholder*="Email"]').val() || '';
        const subject = form.find('input[placeholder*="Subject"]').val() || 'General Inquiry';
        const message = form.find('textarea').val() || '';

        const text = "*New Contact Message - Golden Sparrow SofTech*\n\n" +
                     "*Name:* " + name + "\n" +
                     "*Email:* " + email + "\n" +
                     "*Subject:* " + subject + "\n" +
                     "*Message:* " + message;

        const waUrl = "https://api.whatsapp.com/send?phone=" + WHATSAPP_PHONE + "&text=" + encodeURIComponent(text);
        window.open(waUrl, '_blank');
    });


    // Language Switcher Logic (English, Hindi, Gujarati)
    window.setLanguage = function (lang) {
        localStorage.setItem('userLanguage', lang);
        
        // Update googtrans cookie
        document.cookie = "googtrans=/en/" + lang + "; path=/;";
        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + window.location.hostname + ";";
        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=." + window.location.hostname + ";";

        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = lang;
            combo.dispatchEvent(new Event('change'));
        } else {
            location.reload();
        }
        updateLangLabel(lang);
    };

    function updateLangLabel(lang) {
        const labels = {
            'en': 'English',
            'hi': 'हिन्दी',
            'gu': 'ગુજરાતી'
        };
        const textEl = document.getElementById('selectedLangText');
        if (textEl && labels[lang]) {
            textEl.textContent = labels[lang];
        }
    }

    // Initialize saved language label on page load
    const savedLang = localStorage.getItem('userLanguage') || 'en';
    updateLangLabel(savedLang);

})(jQuery);

