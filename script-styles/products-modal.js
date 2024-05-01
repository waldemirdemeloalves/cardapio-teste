document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-modal-products")[0];

    // When the user clicks on a product, open the modal
    document.querySelectorAll('.product').forEach(item => {
        item.addEventListener('click', function(event) {
            // Check if the click occurred on the add-to-cart-btn, radio input, checkbox input, or .complementos
            if (!event.target.closest('.add-to-cart-btn') && event.target.type !== 'radio' && event.target.type !== 'checkbox' && !event.target.closest('.complementos') && !event.target.closest('.tamanhos')) {
                openModal(this);
            }
        });
    });

    function openModal(product) {
        modal.style.display = "block";

        // Replace the modal content with the product information
        var productImg = product.dataset.imgModal;
        var productTitle = product.dataset.titleModal;
        var productDescription = product.dataset.descriptionModal;
        var productPrice = product.dataset.priceModal;

        document.getElementById("modal-img").src = productImg;
        document.getElementById("modal-title").textContent = productTitle;
        document.getElementById("modal-description").innerHTML = productDescription; // Use innerHTML para renderizar as tags HTML
        document.getElementById("modal-price").textContent = productPrice;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
