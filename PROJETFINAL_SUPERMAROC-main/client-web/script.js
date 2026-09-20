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

    if (cartIcon) {
        cartIcon.addEventListener("click", (e) => {
            e.preventDefault();
            if (cartTab) {
                cartTab.classList.toggle("cart-tab-active");
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (cartTab) {
                cartTab.classList.remove("cart-tab-active");
            }
        });
    }

    const cardList = document.querySelector(".card-list");
    const cartList = document.querySelector(".cart-list");
    const cartTotalElement = document.querySelector(".cart-total");

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // IMPORTANT:
    // Tableau partagé entre affichage, recherche et filtres.
    let products = [];


    // ================== VIDER LE PANIER ==================
    const clearBtn = document.querySelector(".clear-cart");

    if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
            e.preventDefault();

            if (cartItems.length === 0) {
                return;
            }

            if (confirm("Voulez-vous vraiment vider le panier ?")) {
                cartItems = [];
                saveCart();
                updateCartHTML();
            }
        });
    }


    // ================== VERIFIER CONNEXION ==================
    function userIsLogged() {
        return localStorage.getItem("loggedIn") === "true";
    }


    // ================== AFFICHAGE PRODUITS ==================
    if (cardList) {

        fetch("http://localhost:8888/api/admin/produits")
            .then(response => {

                if (!response.ok) {
                    throw new Error(
                        "Erreur lors du chargement des produits"
                    );
                }

                return response.json();
            })

            .then(data => {

                // Sauvegarder les produits pour recherche + filtre
                products = data;

                // Nettoyer avant affichage
                cardList.innerHTML = "";

                products.forEach(product => {

                    const productCard = document.createElement("div");

                    productCard.classList.add("order-card");

                    // IMPORTANT POUR SEARCH/FILTER
                    productCard.dataset.productId = product.productId;
                    productCard.dataset.categoryId = product.categoryId;

                    productCard.innerHTML = `
                        <div class="card-image">
                            <img
                                src="${product.imagePath}"
                                alt="${product.name}"
                                loading="lazy"
                            >
                        </div>

                        <h4>${product.name}</h4>

                        <h4 class="price">
                            ${product.price} DH
                        </h4>

                        <a href="#" class="btn add-btn">
                            Add to Cart
                        </a>
                    `;

                    cardList.appendChild(productCard);


                    // ================== ADD TO CART ==================
                    const addBtn = productCard.querySelector(".add-btn");

                    addBtn.addEventListener("click", (e) => {

                        e.preventDefault();

                        if (!userIsLogged()) {

                            alert(
                                "Vous devez vous connecter pour ajouter un produit au panier !"
                            );

                            const loginModal =
                                document.getElementById("loginModal");

                            if (loginModal) {
                                loginModal.style.display = "block";
                            }

                            return;
                        }


                        addToCart({
                            productId: product.productId,
                            storeId: product.storeId,
                            name: product.name,
                            price: product.price,
                            image: product.imagePath
                        });

                    });

                });


                // Appliquer les filtres après chargement
                applyProductFilters();

            })

            .catch(error => {

                console.error(
                    "Impossible de charger les produits :",
                    error
                );

            });

    }


    // ================== AJOUTER AU PANIER ==================
    function addToCart(product) {

        const existingItem = cartItems.find(
            item => item.productId === product.productId
        );

        if (existingItem) {

            existingItem.qty++;

        } else {

            cartItems.push({
                ...product,
                qty: 1
            });

        }

        saveCart();
        updateCartHTML();
    }


    // ================== AFFICHAGE PANIER ==================
    function updateCartHTML() {

        if (!cartList) {
            return;
        }

        cartList.innerHTML = "";

        let total = 0;


        cartItems.forEach((item, index) => {

            const cartItem = document.createElement("div");

            cartItem.classList.add("item");

            cartItem.innerHTML = `

                <div class="item-image">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >
                </div>

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <h4 class="item-total">
                        ${(item.price * item.qty).toFixed(2)} DH
                    </h4>

                </div>

                <div class="flex">

                    <a
                        href="#"
                        class="quantity-btn minus"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-minus"></i>
                    </a>

                    <h4 class="quantity-value">
                        ${item.qty}
                    </h4>

                    <a
                        href="#"
                        class="quantity-btn plus"
                        data-index="${index}"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </a>

                </div>
            `;

            cartList.appendChild(cartItem);

            total += Number(item.price) * item.qty;
        });


        if (cartTotalElement) {
            cartTotalElement.textContent =
                `${total.toFixed(2)} DH`;
        }


        updateCartCount();
        saveCart();


        // ================== PLUS ==================
        document
            .querySelectorAll(".quantity-btn.plus")
            .forEach(btn => {

                btn.addEventListener("click", (e) => {

                    e.preventDefault();

                    const index =
                        Number(e.currentTarget.dataset.index);

                    cartItems[index].qty++;

                    saveCart();
                    updateCartHTML();

                });

            });


        // ================== MINUS ==================
        document
            .querySelectorAll(".quantity-btn.minus")
            .forEach(btn => {

                btn.addEventListener("click", (e) => {

                    e.preventDefault();

                    const index =
                        Number(e.currentTarget.dataset.index);

                    cartItems[index].qty--;


                    if (cartItems[index].qty <= 0) {
                        cartItems.splice(index, 1);
                    }


                    saveCart();
                    updateCartHTML();

                });

            });

    }


    // ================== COMPTEUR PANIER ==================
    function updateCartCount() {

        if (!cartCount) {
            return;
        }

        let count = 0;

        cartItems.forEach(item => {
            count += item.qty;
        });

        cartCount.textContent = count;
    }


    // ================== SAUVEGARDE PANIER ==================
    function saveCart() {

        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems)
        );

    }


    updateCartHTML();


    // ================== CHECKOUT ==================
    const checkoutModal =
        document.getElementById("checkoutModal");

    const checkoutBtn =
        document.getElementById("checkoutBtn");

    const checkoutForm =
        document.getElementById("checkoutForm");


    if (checkoutBtn && checkoutModal) {

        checkoutBtn.addEventListener("click", (e) => {

            e.preventDefault();

            if (cartItems.length === 0) {

                alert("Votre panier est vide.");

                return;
            }

            checkoutModal.style.display = "block";

        });

    }


    // Fermer checkout
    if (checkoutModal) {

        const checkoutClose =
            checkoutModal.querySelector(".close");

        if (checkoutClose) {

            checkoutClose.addEventListener("click", () => {

                checkoutModal.style.display = "none";

            });

        }

    }


    // Fermer modal en cliquant dehors
    window.addEventListener("click", function(event) {

        if (
            checkoutModal &&
            event.target === checkoutModal
        ) {

            checkoutModal.style.display = "none";

        }

    });


    // ================== ENVOYER COMMANDE ==================
    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            async function(e) {

                e.preventDefault();


                if (cartItems.length === 0) {

                    alert("Votre panier est vide.");

                    return;
                }


                // ================== VERIFIER MAGASIN ==================

                const storeIds = [
                    ...new Set(
                        cartItems.map(item => item.storeId)
                    )
                ];


                if (storeIds.length > 1) {

                    alert(
                        "Votre panier contient des produits de magasins différents.\n" +
                        "Veuillez passer une commande séparée pour chaque magasin."
                    );

                    return;
                }


                // ================== REQUEST ==================

                const orderRequest = {

                    items: cartItems.map(item => ({

                        productId: item.productId,
                        quantity: item.qty

                    }))

                };


                try {

                    const response = await fetch(
                        "http://localhost:8888/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify(orderRequest)
                        }
                    );


                    if (!response.ok) {

                        throw new Error(
                            "La commande n'a pas pu être créée."
                        );

                    }


                    const result = await response.json();


                    alert(
                        `Commande confirmée !\n` +
                        `Numéro : ${result.orderId}\n` +
                        `Total : ${result.totalPrice} DH`
                    );


                    // Vider panier après commande
                    cartItems = [];

                    saveCart();
                    updateCartHTML();


                    checkoutForm.reset();

                    if (checkoutModal) {
                        checkoutModal.style.display = "none";
                    }


                } catch (error) {

                    console.error(
                        "Checkout error:",
                        error
                    );

                    alert(
                        "Erreur lors de la commande. Veuillez réessayer."
                    );

                }

            }
        );

    }


    // =====================================================
    // RECHERCHE + FILTRAGE PRODUITS
    // =====================================================

    const searchInput =
        document.querySelector("#productSearch");

    const searchBtn =
        document.querySelector("#searchBtn");

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    let selectedCategory = "all";


    function applyProductFilters() {

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


        const allCards =
            document.querySelectorAll(".order-card");


        allCards.forEach(card => {

            const productId =
                Number(card.dataset.productId);


            const product = products.find(
                p => Number(p.productId) === productId
            );


            if (!product) {

                card.style.display = "none";

                return;
            }


            const name =
                String(product.name || "")
                    .toLowerCase();

            const description =
                String(product.description || "")
                    .toLowerCase();

            const price =
                String(product.price || "")
                    .toLowerCase();


            // ================== SEARCH ==================

            const matchesSearch =

                name.includes(searchValue) ||

                description.includes(searchValue) ||

                price.includes(searchValue);


            // ================== CATEGORY ==================

            const matchesCategory =

                selectedCategory === "all" ||

                Number(product.categoryId) ===
                Number(selectedCategory);


            // ================== RESULT ==================

            if (matchesSearch && matchesCategory) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    // ================== SEARCH INPUT ==================
    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyProductFilters
        );

    }


    // ================== SEARCH BUTTON ==================
    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                applyProductFilters();

            }
        );

    }


    // ================== CATEGORY BUTTONS ==================
    filterButtons.forEach(btn => {

        btn.addEventListener(
            "click",
            function() {

                filterButtons.forEach(button => {

                    button.classList.remove("active");

                });


                this.classList.add("active");


                selectedCategory =
                    this.dataset.category;


                applyProductFilters();

            }
        );

    });


    // =====================================================
    // SYSTEME DE CONNEXION
    // =====================================================

    const loginBtn =
        document.getElementById("loginBtn");

    const profileBtn =
        document.getElementById("profileBtn");

    const logoutBtn =
        document.getElementById("logoutBtn");


    const loginModal =
        document.getElementById("loginModal");

    const signupModal =
        document.getElementById("signupModal");

    const profileModal =
        document.getElementById("profileModal");


    const closeLogin =
        document.querySelector(".login-close");

    const closeSignup =
        document.querySelector(".signup-close");

    const closeProfile =
        document.querySelector(".profile-close");


    // ================== OPEN MODALS ==================

    if (loginBtn && loginModal) {

        loginBtn.onclick = () => {

            loginModal.style.display = "block";

        };

    }


    if (profileBtn) {

        profileBtn.onclick = () => {

            showProfile();

        };

    }


    if (logoutBtn) {

        logoutBtn.onclick = logout;

    }


    // ================== CLOSE MODALS ==================

    if (closeLogin && loginModal) {

        closeLogin.onclick = () => {

            loginModal.style.display = "none";

        };

    }


    if (closeSignup && signupModal) {

        closeSignup.onclick = () => {

            signupModal.style.display = "none";

        };

    }


    if (closeProfile && profileModal) {

        closeProfile.onclick = () => {

            profileModal.style.display = "none";

        };

    }


    // ================== SWITCH LOGIN/SIGNUP ==================

    const openSignup =
        document.getElementById("openSignup");

    const openLogin =
        document.getElementById("openLogin");


    if (openSignup) {

        openSignup.onclick = (e) => {

            e.preventDefault();

            if (loginModal) {
                loginModal.style.display = "none";
            }

            if (signupModal) {
                signupModal.style.display = "block";
            }

        };

    }


    if (openLogin) {

        openLogin.onclick = (e) => {

            e.preventDefault();

            if (signupModal) {
                signupModal.style.display = "none";
            }

            if (loginModal) {
                loginModal.style.display = "block";
            }

        };

    }


    // ================== CLOSE OUTSIDE ==================

    window.addEventListener("click", (e) => {

        if (
            loginModal &&
            e.target === loginModal
        ) {
            loginModal.style.display = "none";
        }


        if (
            signupModal &&
            e.target === signupModal
        ) {
            signupModal.style.display = "none";
        }


        if (
            profileModal &&
            e.target === profileModal
        ) {
            profileModal.style.display = "none";
        }

    });


    // ================== SIGNUP ==================

    const signupForm =
        document.getElementById("signupForm");


    if (signupForm) {

        signupForm.onsubmit = (e) => {

            e.preventDefault();


            const name =
                document.getElementById(
                    "signupName"
                ).value.trim();


            const email =
                document.getElementById(
                    "signupEmail"
                ).value.trim();


            const pass1 =
                document.getElementById(
                    "signupPassword"
                ).value;


            const pass2 =
                document.getElementById(
                    "signupPassword2"
                ).value;


            // Email déjà utilisé
            const existingUser =
                JSON.parse(
                    localStorage.getItem("user")
                );


            if (
                existingUser &&
                existingUser.email === email
            ) {

                alert(
                    "Cet email est déjà utilisé. Veuillez vous connecter."
                );

                return;
            }


            // Password confirmation
            if (pass1 !== pass2) {

                alert(
                    "Les mots de passe ne correspondent pas !"
                );

                return;
            }


            // Password validation
            const strongPassword =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;


            if (!strongPassword.test(pass1)) {

                alert(
                    "Votre mot de passe doit contenir :\n" +
                    "- 6 caractères minimum\n" +
                    "- 1 majuscule\n" +
                    "- 1 minuscule\n" +
                    "- 1 chiffre"
                );

                return;
            }


            // Create user
            const user = {
                name,
                email,
                password: pass1
            };


            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            localStorage.setItem(
                "loggedIn",
                "true"
            );


            alert(
                "Compte créé avec succès ! Vous êtes maintenant connecté."
            );


            if (signupModal) {
                signupModal.style.display = "none";
            }


            updateUI();

        };

    }


    // ================== LOGIN ==================

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.onsubmit = (e) => {

            e.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );


            if (!user) {

                alert(
                    "Aucun compte trouvé, inscrivez-vous d'abord."
                );

                return;
            }


            if (
                user.email === email &&
                user.password === password
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                alert(
                    "Connexion réussie !"
                );


                if (loginModal) {
                    loginModal.style.display = "none";
                }


                updateUI();


            } else {

                alert(
                    "Email ou mot de passe incorrect."
                );

            }

        };

    }


    // ================== SHOW PROFILE ==================

    function showProfile() {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );


        if (!user) {
            return;
        }


        const profileName =
            document.getElementById(
                "profileName"
            );


        const profileEmail =
            document.getElementById(
                "profileEmail"
            );


        if (profileName) {
            profileName.innerText = user.name;
        }


        if (profileEmail) {
            profileEmail.innerText = user.email;
        }


        if (profileModal) {
            profileModal.style.display = "block";
        }

    }


    // ================== LOGOUT ==================

    function logout() {

        localStorage.removeItem(
            "loggedIn"
        );

        updateUI();

    }


    // ================== UPDATE NAVBAR ==================

    function updateUI() {

        const loggedIn =
            localStorage.getItem("loggedIn");


        if (
            loginBtn &&
            profileBtn &&
            logoutBtn
        ) {

            if (loggedIn === "true") {

                loginBtn.style.display = "none";

                profileBtn.style.display =
                    "inline-block";

                logoutBtn.style.display =
                    "inline-block";


            } else {

                loginBtn.style.display =
                    "inline-block";

                profileBtn.style.display =
                    "none";

                logoutBtn.style.display =
                    "none";

            }

        }


        const welcomeMsg =
            document.getElementById(
                "welcomeMsg"
            );


        if (welcomeMsg) {

            if (loggedIn === "true") {

                const user =
                    JSON.parse(
                        localStorage.getItem("user")
                    );


                if (user) {

                    welcomeMsg.innerText =
                        "Bienvenue, " + user.name;

                    welcomeMsg.style.display =
                        "inline-block";

                }


            } else {

                welcomeMsg.style.display =
                    "none";

            }

        }

    }


    updateUI();


    // =====================================================
    // PHOTO PROFIL
    // =====================================================

    const uploadPhotoBtn =
        document.getElementById(
            "uploadPhotoBtn"
        );

    const photoInput =
        document.getElementById(
            "photoInput"
        );

    const profilePhoto =
        document.getElementById(
            "profilePhoto"
        );


    if (
        uploadPhotoBtn &&
        photoInput
    ) {

        uploadPhotoBtn.addEventListener(
            "click",
            () => {

                photoInput.click();

            }
        );

    }


    if (
        photoInput &&
        profilePhoto
    ) {

        photoInput.addEventListener(
            "change",
            function() {

                const file = this.files[0];

                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function(e) {

                        const imageURL =
                            e.target.result;


                        profilePhoto.src =
                            imageURL;


                        localStorage.setItem(
                            "userPhoto",
                            imageURL
                        );

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    // Charger photo sauvegardée
    if (profilePhoto) {

        const savedPhoto =
            localStorage.getItem(
                "userPhoto"
            );


        if (savedPhoto) {

            profilePhoto.src =
                savedPhoto;

        }

    }


    // =====================================================
    // SYSTEME D'AVIS
    // =====================================================

    const submitReview =
        document.getElementById(
            "submit-review"
        );


    if (submitReview) {

        submitReview.addEventListener(
            "click",
            () => {

                const loggedIn =
                    localStorage.getItem(
                        "loggedIn"
                    );


                const user =
                    JSON.parse(
                        localStorage.getItem(
                            "user"
                        )
                    );


                if (
                    loggedIn !== "true" ||
                    !user
                ) {

                    alert(
                        "Vous devez vous connecter pour laisser un commentaire."
                    );


                    if (loginModal) {
                        loginModal.style.display =
                            "block";
                    }


                    return;
                }


                const username =
                    user.name;


                const userPhoto =
                    localStorage.getItem(
                        "userPhoto"
                    ) ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";


                const reviewTextElement =
                    document.getElementById(
                        "review-text"
                    );


                const reviewStarsElement =
                    document.getElementById(
                        "review-stars"
                    );


                if (
                    !reviewTextElement ||
                    !reviewStarsElement
                ) {
                    return;
                }


                const reviewText =
                    reviewTextElement
                        .value
                        .trim();


                const reviewStars =
                    Number(
                        reviewStarsElement.value
                    );


                if (reviewText === "") {

                    alert(
                        "Veuillez écrire un commentaire."
                    );

                    return;
                }


                // ================== STARS ==================

                let starsHTML = "";


                for (
                    let i = 0;
                    i < reviewStars;
                    i++
                ) {

                    starsHTML +=
                        `<i class="fa-solid fa-star"></i>`;

                }


                // ================== NEW REVIEW ==================

                const newSlide =
                    document.createElement(
                        "div"
                    );


                newSlide.classList.add(
                    "swiper-slide"
                );


                newSlide.innerHTML = `

                    <div class="flex gap-2">

                        <div class="profile">

                            <img
                                src="${userPhoto}"
                                alt="${username}"
                            >

                        </div>

                        <div>

                            <h4>
                                ${username}
                            </h4>

                            <div class="mt-half">
                                ${starsHTML}
                            </div>

                        </div>

                    </div>

                    <p>
                        ${reviewText}
                    </p>
                `;


                const swiperWrapper =
                    document.querySelector(
                        ".swiper-wrapper"
                    );


                if (swiperWrapper) {

                    swiperWrapper.appendChild(
                        newSlide
                    );


                    // Actualiser Swiper
                    if (swiper) {
                        swiper.update();
                    }

                }


                // Reset
                reviewTextElement.value = "";

                reviewStarsElement.value = "5";


                alert(
                    "Merci pour votre avis ❤️"
                );

            }
        );

    }

});