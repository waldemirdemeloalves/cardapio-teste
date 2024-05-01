// ESPAÇO DEIXE UMA AVALIAÇÃO
let currentRating = 0;

        function rate(stars) {
            const starIcons = document.querySelectorAll('.star');
            for (let i = 0; i < starIcons.length; i++) {
                if (i < stars) {
                    starIcons[i].classList.add('selected');
                } else {
                    starIcons[i].classList.remove('selected');
                }
            }
            currentRating = stars;
        }

        function sendToWhatsApp() {
            const message = document.getElementById('message').value;
            const ratingMessage = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
            const whatsappLink = `https://wa.me/5511979974638?text=${encodeURIComponent(ratingMessage + '\n' + message)}`;
            window.open(whatsappLink, '_blank');
        }

        function updateCounter() {
            const maxLength = 180;
            const currentLength = document.getElementById('message').value.length;
            const remaining = maxLength - currentLength;
            document.getElementById('charCount').innerText = remaining;
        }

        function validateAndSend() {
            if (currentRating === 0) {
                Toastify({
                    text: "É necessário escolher de 1 a 5 estrelas.",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#EF4444",
                        marginTop: "65px",
                    },
                }).showToast();

                return;
            }

            const message = document.getElementById('message').value.trim();
            if (message === "") {
                Toastify({
                    text: "Por favor, deixe uma mensagem de avaliação.",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#EF4444",
                        marginTop: "65px",
                    },
                }).showToast();

                return;
            }

            sendToWhatsApp();
        }


// ESPAÇO AVALIAÇÕES DE CLIENTES
$(document).ready(function() {
    $('.carousel').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    });
  });