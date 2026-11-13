/**
 * Golden Sparrow SofTech - Google My Business Reviews Integration
 * Fetches GMB reviews from get_reviews.php (or reviews.json fallback)
 * and renders verified Google review cards into the Testimonial section.
 */

(function ($) {
    "use strict";

    function renderStars(rating) {
        var starsHtml = '';
        var fullStars = Math.floor(rating);
        var hasHalf = (rating - fullStars) >= 0.5;
        for (var i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += '<i class="fas fa-star text-warning"></i>';
            } else if (i === fullStars + 1 && hasHalf) {
                starsHtml += '<i class="fas fa-star-half-alt text-warning"></i>';
            } else {
                starsHtml += '<i class="far fa-star text-warning"></i>';
            }
        }
        return starsHtml;
    }

    function buildReviewCard(review) {
        var photoHtml = '';
        if (review.author_photo) {
            photoHtml = '<img class="img-fluid rounded-circle" src="' + review.author_photo + '" style="width: 55px; height: 55px; object-fit: cover; border: 2px solid #0ea5e9;" alt="' + review.author_name + '" onerror="this.outerHTML=\'<div class=\\\'gmb-avatar-fallback\\\'>' + (review.author_name.charAt(0) || 'G') + '</div>\'">';
        } else {
            var initial = review.author_name ? review.author_name.charAt(0).toUpperCase() : 'G';
            photoHtml = '<div class="gmb-avatar-fallback">' + initial + '</div>';
        }

        var badgeText = review.badge || 'Verified Google Review';

        return '' +
            '<div class="testimonial-item gmb-review-card bg-light my-4 rounded-3 p-4 shadow-sm" style="border: 1px solid rgba(14, 165, 233, 0.2); position: relative;">' +
                '<div class="d-flex align-items-center border-bottom pb-3 mb-3">' +
                    photoHtml +
                    '<div class="ps-3 flex-grow-1">' +
                        '<div class="d-flex align-items-center justify-content-between">' +
                            '<h5 class="text-primary mb-0 fw-bold fs-6">' + review.author_name + '</h5>' +
                            '<svg class="ms-2" width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
                        '</div>' +
                        '<div class="d-flex align-items-center gap-2 mt-1">' +
                            '<div class="star-rating small">' + renderStars(review.rating || 5) + '</div>' +
                            '<small class="text-muted" style="font-size: 11px;">' + (review.relative_time_description || '') + '</small>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<p class="mb-0 text-secondary" style="font-size: 14.5px; line-height: 1.6; min-height: 72px;">' +
                    '&ldquo;' + review.text + '&rdquo;' +
                '</p>' +
                '<div class="mt-3 pt-2 border-top d-flex align-items-center justify-content-between">' +
                    '<span class="badge bg-white text-secondary border small px-2 py-1" style="font-size: 11px;">' +
                        '<i class="fab fa-google text-primary me-1"></i>' + badgeText +
                    '</span>' +
                    '<a href="' + (window.GMB_DATA ? window.GMB_DATA.google_maps_url : 'https://www.google.com/search?q=Golden+Sparrow+SofTech+Rajkot') + '" target="_blank" class="text-primary text-decoration-none small fw-semi-bold" style="font-size: 11.5px;">' +
                        'View on Google <i class="fas fa-external-link-alt ms-1" style="font-size: 10px;"></i>' +
                    '</a>' +
                '</div>' +
            '</div>';
    }

    function initGoogleReviews() {
        var $carousel = $(".testimonial-carousel");
        if ($carousel.length === 0) return;

        // Try get_reviews.php first, fallback to reviews.json
        $.ajax({
            url: "get_reviews.php",
            dataType: "json",
            timeout: 5000
        }).done(function (data) {
            renderGMB(data);
        }).fail(function () {
            $.ajax({
                url: "reviews.json",
                dataType: "json",
                timeout: 5000
            }).done(function (data) {
                renderGMB(data);
            }).fail(function (err) {
                console.warn("GMB reviews could not be loaded", err);
            });
        });

        function renderGMB(data) {
            if (!data || !data.reviews || data.reviews.length === 0) return;
            window.GMB_DATA = data;

            // Update GMB Header badge if placeholder exists
            var rating = data.rating || 4.5;
            var totalReviews = data.total_reviews || data.reviews.length;
            var mapsUrl = data.google_maps_url || "https://www.google.com/search?q=Golden+Sparrow+SofTech+Rajkot";
            var writeReviewUrl = data.write_review_url || (mapsUrl + "#lrd=0x0:0x0,3,,,");

            var badgeHtml = '' +
                '<div class="gmb-rating-badge d-inline-flex align-items-center gap-3 bg-white px-4 py-2 rounded-pill shadow-sm mb-4 border" style="border-color: rgba(14, 165, 233, 0.3) !important;">' +
                    '<div class="d-flex align-items-center gap-2">' +
                        '<svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>' +
                        '<span class="fw-bold text-dark fs-6">' + rating.toFixed(1) + '</span>' +
                        '<div class="star-rating small">' + renderStars(rating) + '</div>' +
                    '</div>' +
                    '<span class="text-muted small border-start ps-3">' +
                        '<strong class="text-dark">' + totalReviews + ' Google Reviews</strong>' +
                    '</span>' +
                    '<a href="' + writeReviewUrl + '" target="_blank" class="btn btn-sm btn-primary rounded-pill px-3 py-1 text-white ms-2" style="font-size: 12px; font-weight: 600;">' +
                        '<i class="fas fa-pen me-1"></i> Review Us' +
                    '</a>' +
                '</div>';

            var $badgeContainer = $("#gmb-summary-badge");
            if ($badgeContainer.length) {
                $badgeContainer.html(badgeHtml);
            }

            // Build reviews items
            var reviewList = data.reviews.slice();
            // Duplicate items if list < 4 so owl carousel loops smoothly
            if (reviewList.length > 0 && reviewList.length < 4) {
                reviewList = reviewList.concat(data.reviews);
                if (reviewList.length < 4) {
                    reviewList = reviewList.concat(data.reviews);
                }
            }

            var html = '';
            for (var i = 0; i < reviewList.length; i++) {
                html += buildReviewCard(reviewList[i]);
            }

            // Safely destroy existing carousel if initialized
            if ($carousel.hasClass("owl-loaded")) {
                $carousel.trigger("destroy.owl.carousel");
                $carousel.removeClass("owl-loaded");
                $carousel.find(".owl-stage-outer").children().unwrap();
            }

            $carousel.html(html);

            // Re-initialize carousel with fresh items
            $carousel.owlCarousel({
                autoplay: true,
                smartSpeed: 1200,
                dots: true,
                loop: true,
                center: true,
                margin: 20,
                responsive: {
                    0: { items: 1 },
                    576: { items: 1 },
                    768: { items: 2 },
                    992: { items: 3 }
                }
            });
        }
    }

    $(document).ready(function () {
        initGoogleReviews();
    });
})(jQuery);

