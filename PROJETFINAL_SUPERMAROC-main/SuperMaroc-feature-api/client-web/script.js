document.addEventListener("DOMContentLoaded", function() {

    // ================== SWIPER ==================
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        navigation: {
            nextEl: "#next",
            prevEl: "#prev",
        },
    });


    // ================== VARIABLES PANIER ==================
    const cartIcon = document.querySelector(".cart-icon");
    const cartTab = document.querySelector(".cart-tab");
    const closeBtn = document.querySelector(".close-btn");
    const cartCount = document.querySelector(".cart-value");

    if (cartIcon) cartIcon.addEventListener("click", () => cartTab.classList.toggle("cart-tab-active"));
    if (closeBtn) closeBtn.addEventListener("click", () => cartTab.classList.remove("cart-tab-active"));

    const cardList = document.querySelector(".card-list");
    const cartList = document.querySelector(".cart-list");
    const cartTotalElement = document.querySelector(".cart-total");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // ================== VIDER LE PANIER ==================
    const clearBtn = document.querySelector(".clear-cart");

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (cartItems.length === 0) return;

            if (confirm("Voulez-vous vraiment vider le panier ?")) {
                cartItems = [];
                saveCart();
                updateCartHTML();
            }
        });
    }


    // ================== VERIFIER CONNEXION → (UNE SEULE VARIABLE) ==================
    function userIsLogged() {
        return localStorage.getItem("loggedIn") === "true";
    }


    // ================== AFFICHAGE PRODUITS ==================
if (cardList) {
    fetch("http://localhost:8888/api/admin/produits")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des produits");
            }
            return response.json();
        })
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("order-card");

                productCard.innerHTML = `
                    <div class="card-image">
                        <img src="${product.imagePath}">
                    </div>
                    <h4>${product.name}</h4>
                    <h4 class="price">${product.price} DH</h4>
                    <a href="#" class="btn add-btn">Add to Cart</a>
                `;

                cardList.appendChild(productCard);

                // CLICK ADD TO CART
                productCard.querySelector(".add-btn").addEventListener("click", (e) => {
                    e.preventDefault();

                    // 🔒 Vérifier si l'utilisateur est connecté
                    if (!userIsLogged()) {
                        alert("Vous devez vous connecter pour ajouter un produit au panier !");
                        document.getElementById("loginModal").style.display = "block";
                        return;
                    }

                    // ⚠️ Adapter les champs selon ton DTO
                    addToCart({
                        name: product.name,
                        price: product.price,
                        image: product.imagePath
                    });
                });
            });
        })
        .catch(error => {
            console.error("❌ Impossible de charger les produits :", error);
        });
}


    // ================== AJOUTER AU PANIER ==================
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.qty++;
        } else {
            cartItems.push({...product, qty: 1 });
        }

        saveCart();
        updateCartHTML();
    }


    // ================== AFFICHAGE PANIER ==================
    function updateCartHTML() {
        if (!cartList) return;

        cartList.innerHTML = "";
        let total = 0;

        cartItems.forEach((item, index) => {

            const cartItem = document.createElement("div");
            cartItem.classList.add("item");

            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}">
                </div>

                <div>
                    <h4>${item.name}</h4>
                    <h4 class="item-total">${item.price * item.qty} DH</h4>
                </div>

                <div class="flex">
                    <a href="#" class="quantity-btn minus" data-index="${index}">
                        <i class="fa-solid fa-minus"></i>
                    </a>

                    <h4 class="quantity-value">${item.qty}</h4>

                    <a href="#" class="quantity-btn plus" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                </div>
            `;

            cartList.appendChild(cartItem);

            total += item.price * item.qty;
        });

        cartTotalElement.textContent = `${total} DH`;
        updateCartCount();
        saveCart();

        // PLUS
        document.querySelectorAll(".quantity-btn.plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.currentTarget.dataset.index;
                cartItems[index].qty++;
                saveCart();
                updateCartHTML();
            });
        });

        // MINUS
        document.querySelectorAll(".quantity-btn.minus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.currentTarget.dataset.index;
                cartItems[index].qty--;

                if (cartItems[index].qty === 0) {
                    cartItems.splice(index, 1);
                }

                saveCart();
                updateCartHTML();
            });
        });
    }


    // ================== COMPTEUR ICON PANIER ==================
    function updateCartCount() {
        if (!cartCount) return;

        let count = 0;
        cartItems.forEach(item => count += item.qty);

        cartCount.textContent = count;
    }


    // ================== SAUVEGARDE LOCAL STORAGE ==================
    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    updateCartHTML();


    // ================== MODAL CHECKOUT ==================
    const modal = document.getElementById("checkoutModal");
    const btn = document.getElementById("checkoutBtn");
    const span = document.getElementsByClassName("close")[0];
    const form = document.getElementById("checkoutForm");

    if (btn) btn.onclick = () => modal.style.display = "block";
    if (span) span.onclick = () => modal.style.display = "none";

    window.onclick = function(event) {
        if (event.target == modal) modal.style.display = "none";
    };

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const phone = document.getElementById("phone").value;

            alert(`Merci ${name}, vos informations ont été envoyées !
                Adresse : ${address}
                Téléphone : ${phone}`);

            form.reset();
            modal.style.display = "none";
        });
    }


    // ================== RECHERCHE PRODUITS ==================
    const searchInput = document.querySelector("#productSearch");

    if (searchInput) {
        searchInput.addEventListener("input", function() {
            const value = this.value.toLowerCase();
            const allCards = document.querySelectorAll(".order-card");

            allCards.forEach(card => {
                const productName = card.querySelector("h4").innerText.toLowerCase();
                const productPrice = card.querySelector(".price").innerText.toLowerCase();

                const product = products.find(p => p.name.toLowerCase() === productName);
                let category = product ? product.category.toLowerCase() : "";

                if (
                    productName.includes(value) ||
                    category.includes(value) ||
                    productPrice.includes(value)
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // ================== FILTRAGE PAR CATÉGORIE ==================
    const categoryMap = {
        "category1": "Produits laitiers",
        "category2": "Maison",
        "category3": "Boissons",
        "category4": "Epicerie"
    };

    const filterButtons = document.querySelectorAll(".filter-btn");

    if (filterButtons) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {

                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const selected = btn.dataset.category;
                const allCards = document.querySelectorAll(".order-card");

                allCards.forEach(card => {
                    const productName = card.querySelector("h4").innerText;
                    const product = products.find(p => p.name === productName);

                    if (!product) return;

                    if (selected === "all") {
                        card.style.display = "block";
                        return;
                    }

                    const categoryName = categoryMap[selected];

                    if (product.category === categoryName) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }


    // =============== Systeme de connexion ===============

    // =============== SELECTORS ===============
    const loginBtn = document.getElementById("loginBtn");
    const profileBtn = document.getElementById("profileBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const profileModal = document.getElementById("profileModal");

    const closeLogin = document.querySelector(".login-close");
    const closeSignup = document.querySelector(".signup-close");
    const closeProfile = document.querySelector(".profile-close");

    // =============== OPEN/CLOSE MODALS ===============
    loginBtn.onclick = () => loginModal.style.display = "block";
    profileBtn.onclick = () => showProfile();
    logoutBtn.onclick = logout;

    closeLogin.onclick = () => loginModal.style.display = "none";
    closeSignup.onclick = () => signupModal.style.display = "none";
    closeProfile.onclick = () => profileModal.style.display = "none";

    // Switch modals
    document.getElementById("openSignup").onclick = () => {
        loginModal.style.display = "none";
        signupModal.style.display = "block";
    };

    document.getElementById("openLogin").onclick = () => {
        signupModal.style.display = "none";
        loginModal.style.display = "block";
    };

    // Close when clicking outside
    window.onclick = (e) => {
        if (e.target === loginModal) loginModal.style.display = "none";
        if (e.target === signupModal) signupModal.style.display = "none";
        if (e.target === profileModal) profileModal.style.display = "none";
    };

    // =============== SIGNUP ===============
    // =============== SIGNUP ===============
    document.getElementById("signupForm").onsubmit = (e) => {
        e.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const pass1 = document.getElementById("signupPassword").value;
        const pass2 = document.getElementById("signupPassword2").value;

        // --- Vérification : email déjà utilisé ---
        const existingUser = JSON.parse(localStorage.getItem("user"));
        if (existingUser && existingUser.email === email) {
            alert("Cet email est déjà utilisé. Veuillez vous connecter.");
            return;
        }

        // --- Vérification : mots de passe identiques ---
        if (pass1 !== pass2) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        // --- Vérification : force du mot de passe ---
        const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

        if (!strongPassword.test(pass1)) {
            alert("Votre mot de passe doit contenir :\n- 6 caractères minimum\n- 1 majuscule\n- 1 minuscule\n- 1 chiffre");
            return;
        }

        // --- Créer le compte ---
        const user = { name, email, password: pass1 };
        localStorage.setItem("user", JSON.stringify(user));

        // --- Connexion automatique ---
        localStorage.setItem("loggedIn", "true");

        alert("Compte créé avec succès ! Vous êtes maintenant connecté.");

        signupModal.style.display = "none";

        updateUI();
    };






    // =============== LOGIN ===============
    document.getElementById("loginForm").onsubmit = (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) return alert("Aucun compte trouvé, inscrivez-vous d'abord.");

        if (user.email === email && user.password === password) {
            localStorage.setItem("loggedIn", "true");
            alert("Connexion réussie !");
            loginModal.style.display = "none";
            updateUI();
        } else {
            alert("Email ou mot de passe incorrect.");
        }
    };

    // =============== SHOW PROFILE ===============
    function showProfile() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        document.getElementById("profileName").innerText = user.name;
        document.getElementById("profileEmail").innerText = user.email;

        profileModal.style.display = "block";
    }

    // =============== LOGOUT ===============
    function logout() {
        localStorage.removeItem("loggedIn");
        updateUI();
    }

    // =============== UPDATE NAVBAR UI ===============
    function updateUI() {
        const loggedIn = localStorage.getItem("loggedIn");

        if (loggedIn === "true") {
            loginBtn.style.display = "none";
            profileBtn.style.display = "inline-block";
            logoutBtn.style.display = "inline-block";
        } else {
            loginBtn.style.display = "inline-block";
            profileBtn.style.display = "none";
            logoutBtn.style.display = "none";
        }
        const welcomeMsg = document.getElementById("welcomeMsg");

        if (loggedIn === "true") {
            const user = JSON.parse(localStorage.getItem("user"));
            welcomeMsg.innerText = "Bienvenue, " + user.name;
            welcomeMsg.style.display = "inline-block";
        } else {
            welcomeMsg.style.display = "none";
        }

    }

    // Run at startup
    updateUI();



    // INPUT FILE
    const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
    const photoInput = document.getElementById("photoInput");
    const profilePhoto = document.getElementById("profilePhoto");

    // Click sur le bouton → ouvre le choix de fichier
    uploadPhotoBtn.addEventListener("click", () => {
        photoInput.click();
    });

    // Lorsqu'une image est choisie
    photoInput.addEventListener("change", function() {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageURL = e.target.result;

            // Affiche la nouvelle photo
            profilePhoto.src = imageURL;

            // Sauvegarde dans localStorage
            localStorage.setItem("userPhoto", imageURL);
        };
        reader.readAsDataURL(file);
    });

    // Charger la photo du stockage au démarrage
    document.addEventListener("DOMContentLoaded", () => {
        const savedPhoto = localStorage.getItem("userPhoto");
        if (savedPhoto) {
            profilePhoto.src = savedPhoto;
        }
    });

    //COMMENTAIRE
    // ================== SYSTEME D'AVIS ==================
    document.getElementById("submit-review").addEventListener("click", () => {

        // Vérifier si connecté
        const loggedIn = localStorage.getItem("loggedIn");
        const user = JSON.parse(localStorage.getItem("user"));

        if (loggedIn !== "true" || !user) {
            alert("Vous devez vous connecter pour laisser un commentaire.");
            document.getElementById("loginModal").style.display = "block";
            return;
        }

        const username = user.name;

        // 🌟 NOUVEAU : récupérer la photo utilisateur
        const userPhoto = localStorage.getItem("userPhoto") || "image/default-user.png";

        // Récupérer données
        const reviewText = document.getElementById("review-text").value.trim();
        const reviewStars = document.getElementById("review-stars").value;

        if (reviewText === "") {
            alert("Veuillez écrire un commentaire.");
            return;
        }

        // Générer étoiles
        let starsHTML = "";
        for (let i = 0; i < reviewStars; i++) {
            starsHTML += `<i class="fa-solid fa-star"></i>`;
        }

        // Nouveau slide
        const newSlide = document.createElement("div");
        newSlide.classList.add("swiper-slide");

        newSlide.innerHTML = `
        <div class="flex gap-2">
            <div class="profile">
                <img src="${userPhoto}" alt="">
            </div>
            <div>
                <h4>${username}</h4>
                <div class="mt-half">
                    ${starsHTML}
                </div>
            </div>
        </div>
        <p>${reviewText}</p>
    `;



        // Ajouter dans le slider
        document.querySelector(".swiper-wrapper").appendChild(newSlide);

        // Reset
        document.getElementById("review-text").value = "";
        document.getElementById("review-stars").value = "5";

        alert("Merci pour votre avis ❤️");
    });




});