// DECLARAÇÃO DAS CONSTANTES
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const obsCheckoutInput = document.getElementById("obs-checkout");
const deliveryChargeText = document.getElementById("delivery-charge-text");
const cartBtnDesktop = document.querySelector(".cart-btn-desktop");
const footerCartBtn = document.getElementById("cart-btn");



let cart = [];
let cartItems = [];

// SCRIPT PARA INPUT "SEM COMPLEMENTOS"
function handleExclusiveCheckbox(checkbox) {
    // Encontra o elemento pai (produto) do checkbox exclusivo clicado
    const productDiv = checkbox.closest('.product');

    // Se a opção exclusiva for marcada, desmarque todas as outras opções do mesmo produto e desative-as
    if (checkbox.checked) {
        productDiv.querySelectorAll('.complementos input[type="checkbox"]').forEach(item => {
            if (item !== checkbox) {
                item.checked = false;
                item.disabled = true;
            }
        });
    } else {
        // Se a opção exclusiva for desmarcada, reative as outras opções do mesmo produto
        productDiv.querySelectorAll('.complementos input[type="checkbox"]').forEach(item => {
            item.disabled = false;
        });
    }
}
// FIM SCRIPT PARA INPUT "SEM COMPLEMENTOS"

// ATUALIZAÇÃO AUTOMÁTICA QUANDO DÁ MEIA NOITE
// Função para verificar se é meia-noite em Brasília
function checkMidnight() {
    const now = new Date();
    // Ajustar para o fuso horário de Brasília (-3 horas)
    now.setUTCHours(now.getUTCHours() - 3);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    // Verificar se é meia-noite
    if (hours === 0 && minutes === 0) {
      // Desativar o alerta
      window.onbeforeunload = null;
      // Atualizar a página
      location.reload();
    }
  }
  
  // Verificar a cada minuto se é meia-noite
  setInterval(checkMidnight, 60000);
// FIM ATUALIZAÇÃO AUTOMÁTICA QUANDO DÁ MEIA NOITE





// FUNÇÃO PARA BOTÃO HAMBURGUER
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    handleLinkClick() {
        this.handleClick(); // Chama a função handleClick
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.navLinks.forEach(link => {
            link.addEventListener("click", this.handleLinkClick);
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".menu-mobile-flutuante",
    ".nav-list li",
);
mobileNavbar.init();

// FIM FUNÇÃO PARA BOTÃO HAMBURGUER



// SCRIPT PARA ALERTAR QUE AS INFORMAÇÕES NÃO FORAM SALVAS
window.addEventListener('beforeunload', function(event) {
    event.preventDefault();
    event.returnValue = "As informações podem não ter sido salvas!";
});
// FIM DO SCRIPT

// ROLAGEM SUAVE QUANDO CLICADO NOS LINKS DO MENU
// Adiciona rolagem suave para os links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const marginTop = 120; // Espaço extra que você deseja adicionar acima do elemento de destino
            window.scrollTo({
                top: target.offsetTop - marginTop,
                behavior: 'smooth'
            });
        }
    });
});


// VERIFICA A ROLAGEM E MOSTRA BOTÃO SUBIR AO TOPO
// Função para verificar a posição da rolagem e exibir ou ocultar o botão "Voltar ao Topo"
window.onscroll = function() {
    scrollFunction();
};

// Oculta o botão "subir ao topo" ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnTopo").style.display = "none";
});

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("btnTopo").style.display = "block";
    } else {
        document.getElementById("btnTopo").style.display = "none";
    }
}

// Função para rolar suavemente para o topo da página ao clicar no botão "Voltar ao Topo"
function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// FIM VERIFICA A ROLAGEM E MOSTRA BOTÃO SUBIR AO TOPO



// FUNÇÃO PARA ABRIR O MODAL DO CARRINHO NO MENU SUPERIOR
function openCartModal() {
    updateCartModal();
    cartModal.style.display = "flex";
    updateFooterCartCounter();
}

// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function(){
    updateCartModal();
    cartModal.style.display = "flex"
    updateFooterCartCounter();
    
})

// FECHAR O MODAL QUANDO CRICAR FORA
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

// BOTÃO FECHAR MODAL
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

// BOTÃO ADICIONAR AO CARRINHO
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn");

    if(parentButton){
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        const complementPrice = calculateComplementPrice(parentButton);
        const totalPrice = price + complementPrice;

        // Verifica se o nome do produto é válido
        if (name && name.trim() !== "") {
            // Verifica se o preço total é válido
            if (!isNaN(totalPrice)) {
                // CHAMA A FUNÇÃO "ADICIONAR NO CARRINHO" apenas se o nome e o preço forem válidos
                addToCart(name, price, complementPrice);

                Toastify({
                    text: "Item adicionado no carrinho",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#16a34a",
                        marginTop: "65px",
                    },
                }).showToast();
            } else {
                // Caso o preço não seja válido, exibe uma mensagem de erro ou faz outra ação adequada
                console.error("Preço total do item não é válido.");
            }
        } else {
            // Caso o nome do produto não seja válido, exibe uma mensagem de erro ou faz outra ação adequada
            console.error("Nome do produto não é válido.");
        }
    }
});

// Função para calcular o preço total dos complementos selecionados
function calculateComplementPrice(productDiv) {
    const checkboxes = productDiv.querySelectorAll('.complementos input[type="checkbox"]:checked');
    let complementPrice = 0;
    checkboxes.forEach(function(checkbox) {
        complementPrice += parseFloat(checkbox.getAttribute('data-complment-price'));
    });
    return complementPrice;
}




// FUNÇÃO PARA ADICIONAR PRODUTOS AO CARRINHO
function addToCart(name, price, complementPrice, quantity = 1) {
    // Verifica se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.name === name);

    // Inicializa um array para armazenar os nomes dos complementos
    const complementNames = [];

    // Adiciona os nomes dos complementos selecionados ao array
    if (complementPrice > 0) {
        const checkboxes = document.querySelectorAll('.complementos input[type="checkbox"]:checked');
        checkboxes.forEach(function(checkbox) {
            complementNames.push(checkbox.parentNode.textContent.trim());
        });
    }

    // Se o produto já estiver no carrinho, atualiza a quantidade e o preço
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].price += (price + complementPrice) * quantity;
        cart[existingItemIndex].complementNames.push(...complementNames); // Adiciona os nomes dos complementos ao item existente
    } else {
        // Se o produto não estiver no carrinho, adiciona um novo item
        cart.push({
            name,
            price: (price + complementPrice) * quantity, // Calcula o preço total considerando a quantidade
            quantity,
            complementNames,
        });
    }

    // Atualiza o carrinho no modal
    updateCartModal();
    // Atualiza o contador de itens no rodapé
    updateFooterCartCounter();
}



// FUNÇÃO PARA ADICIONAR PRODUTOS AO CARRINHO POR TAMANHOS
function addToCartWithSizes(button) {
    const productDiv = button.closest('.product');
    const selectedSize = productDiv.querySelector('.tamanhos input[type="radio"]:checked, .tamanhos input[type="checkbox"]:checked');

    // Verifica se um tamanho foi selecionado
    if (selectedSize) {
        const name = productDiv.querySelector('.font-bold').textContent.trim();
        const price = parseFloat(productDiv.querySelector('.font-bold.text-lg').textContent.replace('R$ ', '').replace(',', '.'));
        const complementPrice = parseFloat(selectedSize.getAttribute('data-complment-price'));
        const complementName = selectedSize.getAttribute('data-complment-name');

        // Verifica se um produto com o mesmo tamanho já está no carrinho
        const existingItemIndex = cart.findIndex(item => item.name === name && item.complementNames.includes(complementName));

        if (existingItemIndex !== -1) {
            // Se o produto já estiver no carrinho, aumenta a quantidade
            cart[existingItemIndex].quantity++;
        } else {
            // Se o produto não estiver no carrinho, adiciona um novo item
            cart.push({
                name,
                price: complementPrice,
                quantity: 1,
                complementNames: [complementName],
            });
        }

        // Atualiza o carrinho no modal
        updateCartModal();
        // Atualiza o contador de itens no rodapé
        updateFooterCartCounter();
        // Mostra o alerta informando que o item foi adicionado ao carrinho
        Toastify({
            text: "Item adicionado ao carrinho",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#16a34a",
                marginTop: "65px",
            },
        }).showToast();
    } else {
        // Se nenhum tamanho foi selecionado, exibe um alerta
        Toastify({
            text: "Por favor, escolha um tamanho.",
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
    }
}

// FIM FUNÇÃO PARA ADICIONAR PRODUTOS AO CARRINHO POR TAMANHOS



// FUNÇÃO PARA ADICIONAR PRODUTOS AO CARRINHO COM COMPLEMENTOS
function addToCartWithComplements(button) {
    const productDiv = button.closest('.product');
    const complementCheckboxes = productDiv.querySelectorAll('.complementos input[type="checkbox"]:checked');

    // Verifica se pelo menos um complemento foi selecionado
    if (complementCheckboxes.length > 0) {
        const name = productDiv.querySelector('.font-bold').textContent.trim();
        const price = parseFloat(productDiv.querySelector('.font-bold.text-lg').textContent.replace('R$ ', '').replace(',', '.'));
        const complementPrice = calculateComplementPrice(productDiv);
        const complementNames = getSelectedComplementNames(productDiv);

        // Verifica se um produto com os mesmos complementos já está no carrinho
        const existingItemIndex = cart.findIndex(item => item.name === name && arraysEqual(item.complementNames, complementNames));

        if (existingItemIndex !== -1) {
            // Se o produto já estiver no carrinho, aumenta a quantidade
            cart[existingItemIndex].quantity++;
        } else {
            // Se o produto não estiver no carrinho, adiciona um novo item
            cart.push({
                name,
                price: (price + complementPrice),
                quantity: 1,
                complementNames,
            });
        }

        // Atualiza o carrinho no modal
        updateCartModal();
        // Atualiza o contador de itens no rodapé
        updateFooterCartCounter();
        // Mostra o alerta informando que o item foi adicionado ao carrinho
        Toastify({
            text: "Item adicionado ao carrinho",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#16a34a",
                marginTop: "65px",
            },
        }).showToast();
    } else {
        // Se nenhum complemento foi selecionado, exibe um alerta
        Toastify({
            text: "é necessário escolher pelo menos uma das opções.",
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
    }
}



// Função para obter os nomes dos complementos ou tamanhos selecionados
function getSelectedComplementNames(productDiv) {
    const checkboxes = productDiv.querySelectorAll('.complementos input[type="checkbox"]:checked');
    const complementNames = [];
    checkboxes.forEach(function(checkbox) {
        complementNames.push(checkbox.getAttribute('data-complment-name'));
    });
    return complementNames;
}
// FIM FUNÇÃO PARA ADICIONAR PRODUTOS AO CARRINHO COM COMPLEMENTOS

// Função para verificar se dois arrays são iguais
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}



// ATUALIZA O CARRINHO
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between","mb-4", "flex-col");

        // Constrói a representação do item no carrinho
        let itemDescription = `${item.name}`;
        if (item.complementNames.length > 0) {
            itemDescription += "<br> + " + item.complementNames.join("<br> + ");
        }
        

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${itemDescription}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">Valor Item: R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn text-red-600 hover:text-red-500 duration-200 font-medium" data-name="${item.name}">
                        Remover
                </button>
            </div>
        `;

        // SOMA "VALOR TOTAL" DOS ITENS NO CARRINHO
        total += item.price;

        // INSERE O ELEMENTO "DIV" NO MODAL
        cartItemsContainer.appendChild(cartItemElement);
    });

    //MOSTRA O VALOR DE "TOTAL" DENTRO DO MODAL
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    // Atualiza a visibilidade do texto de taxa de entrega com base no valor do carrinho
    if (total > 0.01) {
        deliveryChargeText.classList.remove('hidden');
    } else {
        deliveryChargeText.classList.add('hidden');
    }

    // Atualiza o contador de itens
    updateFooterCartCounter();
}


// FUNÇÃO QUE ATUALIZA O CONTADOR DE ITENS NO BOTÃO "VER CARRINHO"
function updateFooterCartCounter() {
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });

    // Seleciona todos os elementos <span> com o ID "cart-count"
    let cartCountSpans = document.querySelectorAll('span#cart-count');
    
    // Atualiza o texto de todos os contadores
    cartCountSpans.forEach(span => {
        span.textContent = totalItems;
    });
}
// FIM DA FUNCTION


// FUNÇÃO PARA REMOVER ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        // CHAMA A FUNÇÃO REMOVER ITEM DO CARRINHO
        removeItemCart(name);
        updateFooterCartCounter();
    }

})

// FUNÇÃO REMOVER ITEM DO CARRINHO
function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            updateFooterCartCounter();

            Toastify({
                text: "Item removido do carrinho",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F6D500",
                    marginTop: "65px",
                },
            }).showToast();

            return;
        }

        cart.splice(index, 1);
  
        updateCartModal();
        updateFooterCartCounter();
    }
}
// FIM DA FUNÇÃO REMOVER ITEM DO CARRINHO


// CAPTURA O QUE É DIGITADO NO CAMPO "OBSERÇÕES DO PEDIDO"
obsCheckoutInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
})

// FINALIZAR PEDIDO
checkoutBtn.addEventListener("click", function(){

    // SE O RESTAURANTE ESTIVER FECHADO ELE DÁ UM ALERTA
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        
        Toastify({
            text: "Ops! A loja está fechada!",
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

    // SE O CARRINHO ESTIVER VAZIO ELE DÁ UM ALERTA
    if(cart.length === 0) {
        Toastify({
            text: "Parece que seu carrinho está vazio.",
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
        return; // Retorna se o carrinho estiver vazio
    }

    // ENVIAR O PEDIDO PARA A API DO WHATSAPP
    const cartItems = cart.map((item) => {
        return (
           ` Qtd: *${item.quantity}* - *${item.name}* - Preço: R$${item.price}
` 
        )
    }).join("");

    const message = encodeURIComponent(cartItems)
    const phone = "11912234136"

    window.open(`https://wa.me/${phone}?text=${message} Observações: *${obsCheckoutInput.value}*`, "_blank")

    cart = [];
    updateCartModal();
    updateFooterCartCounter();
})


// Lista de feriados
const feriados = [
    // Adicione os feriados conforme necessário, no formato 'Mês/Dia'
    '01/01', // Exemplo: Ano Novo
    '12/25', // Exemplo: Natal
    // Adicione mais feriados aqui...
];

// Função para verificar se a data atual é um feriado
function isFeriado() {
    const data = new Date();
    const mes = data.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
    const dia = data.getDate();
    const dataAtual = mes + '/' + dia;

    return feriados.includes(dataAtual);
}

// FUNÇÃO PARA VERIFICAR SE O RESTAURANTE ESTÁ ABERTO
function checkRestaurantOpen() {
    const data = new Date();
    const diaDaSemana = data.getDay();
    const hora = data.getHours();
    const minutos = data.getMinutes();

    // VERIFICA SE É UM FERIADO
    if (isFeriado()) {
        return false; // LOJA FECHADA EM FERIADOS
    }

    // FECHA NOS DIAS DA SEMANA (O = DOMINGO... 6 = SÁBADO)
    if (diaDaSemana === 1) {
        return false; // LOJA FECHADA ÀS SEGUNDAS-FEIRAS
    }

    // VERIFICA SE ESTÁ DENTRO DO HORÁRIO DE FUNCIONAMENTO (TODOS OS DIAS, DAS 16H ÀS 23H59)
    if ((hora >= 16 || (hora === 16 && minutos >= 0)) && (hora < 23 || (hora === 23 && minutos <= 59))) {
        return true; // RESTAURANTE ABERTO TODOS OS DIAS, EXCETO SEGUNDA-FEIRA
    } else {
        return false; // FORA DO HORÁRIO DE FUNCIONAMENTO
    }
}


// BOTÃO QUE MOSTRA SE A LOJA ESTÁ ABERTA OU FECHADA
// ELEMENTOS HTML
const spanItem = document.getElementById("date-span");
const openButton = document.querySelector('.open');
const closeButton = document.querySelector('.close');

// VERIFICAÇÃO E ATUALIZAÇÃO DA COR DE FUNDO DA DIV
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}

// MOSTRA O BOTÃO ADEQUADO COM BASE NO ESTADO DA LOJA
if(isOpen){
    openButton.classList.remove("hidden");
    closeButton.classList.add("hidden");
} else {
    openButton.classList.add("hidden");
    closeButton.classList.remove("hidden");
}
// FIM DE IF E ELSE
// FIM BOTÃO QUE MOSTRA SE A LOJA ESTÁ ABERTA OU FECHADA



// FUNÇÃO PARA ATUALIZAR AUTOMÁTICAMENTE "PROMOÇÃO DO DIA"
document.addEventListener("DOMContentLoaded", function() {
    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
    const hoje = new Date().getDay(); // Retorna um número de 0 (domingo) a 6 (sábado)

    for (let i = 0; i < diasSemana.length; i++) {
        const divsDia = document.querySelectorAll(`#${diasSemana[i]}`);
        divsDia.forEach(div => {
            if (hoje === i) {
                div.classList.add("disponivel");
                div.classList.remove("indisponivel");
            } else {
                div.classList.remove("disponivel");
                div.classList.add("indisponivel");
            }
        });
    }
});
// FIM DA FUNÇÃO PARA ATUALIZAR AUTOMÁTICAMENTE "PROMOÇÃO DO DIA"
