// ============================================================
// SUPERMAROC MINI ADMIN - REAL BACKEND VERSION
// ============================================================

const API_URL = "http://localhost:8888/api/admin/produits";

const STORES = {
    1: {
        id: 1,
        name: "SuperMaroc Agadir",
        shortName: "Agadir Store",
        location: "Agadir, Maroc"
    },
    2: {
        id: 2,
        name: "SuperMaroc Casablanca",
        shortName: "Casablanca Store",
        location: "Casablanca, Maroc"
    }
};

const CATEGORIES = {
    1: "Fruits",
    2: "Boissons",
    3: "Produits laitiers",
    4: "Épicerie"
};

const LOW_STOCK_LIMIT = 10;

let currentStoreId = 1;
let allProducts = [];
let currentStoreProducts = [];
let productsChart = null;


// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {

    const savedStore = Number(
        localStorage.getItem("supermaroc_selected_store")
    );

    if (STORES[savedStore]) {
        currentStoreId = savedStore;
    }

    initializeStoreSelector();
    initializeEventListeners();
    updateStoreHeader();

    await loadProducts();
});


// ============================================================
// STORE SELECTOR
// ============================================================

function initializeStoreSelector() {

    const options = document.querySelectorAll(".store-option");

    options.forEach(option => {

        option.addEventListener("click", async function (event) {

            event.preventDefault();

            const storeId = Number(
                this.getAttribute("data-store-id")
            );

            if (!STORES[storeId]) {
                return;
            }

            currentStoreId = storeId;

            localStorage.setItem(
                "supermaroc_selected_store",
                String(storeId)
            );

            updateStoreHeader();
            refreshStoreView();

            showNotification(
                `Switched to ${STORES[storeId].name}`,
                "success"
            );
        });

    });
}


function updateStoreHeader() {

    const store = STORES[currentStoreId];

    setText(
        "current-store",
        store.shortName
    );

    setText(
        "current-store-name",
        store.shortName
    );

    setText(
        "store-full-name",
        store.name
    );

    setText(
        "store-code",
        store.id
    );

    const details = document.getElementById("store-details");

    if (details) {
        details.innerHTML =
            `<i class="fas fa-map-marker-alt"></i> ${escapeHtml(store.location)}`;
    }
}


// ============================================================
// API
// ============================================================

async function loadProducts(showSuccess = false) {

    setApiStatus("loading");

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error(
                "Invalid products response"
            );
        }

        allProducts = data.map(normalizeProduct);

        setApiStatus("online");

        refreshStoreView();

        if (showSuccess) {
            showNotification(
                "Data refreshed successfully",
                "success"
            );
        }

    } catch (error) {

        console.error(
            "Unable to load products:",
            error
        );

        allProducts = [];
        currentStoreProducts = [];

        setApiStatus("offline");

        displayProducts([]);
        updateDashboard([]);
        displayStockAlerts([]);
        updateCategoryChart([]);

        showNotification(
            "Unable to connect to SuperMaroc API",
            "danger"
        );
    }
}


function normalizeProduct(product) {

    return {
        productId: Number(product.productId),
        storeId: Number(product.storeId),
        categoryId: Number(product.categoryId),
        name: product.name || "",
        price: Number(product.price) || 0,
        quantity: Number(product.quantity) || 0,
        description: product.description || "",
        imagePath: product.imagePath || ""
    };
}


// ============================================================
// STORE VIEW
// ============================================================

function refreshStoreView() {

    currentStoreProducts = allProducts.filter(
        product => product.storeId === currentStoreId
    );

    updateDashboard(currentStoreProducts);
    displayStockAlerts(currentStoreProducts);
    updateCategoryChart(currentStoreProducts);

    applyFilters();
}


// ============================================================
// DASHBOARD
// ============================================================

function updateDashboard(products) {

    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

    const outOfStock = products.filter(
        product => product.quantity <= 0
    ).length;

    const inventoryValue = products.reduce(
        (total, product) =>
            total + (
                product.price *
                product.quantity
            ),
        0
    );

    setText(
        "stat-total-products",
        totalProducts.toLocaleString()
    );

    setText(
        "stat-total-stock",
        totalStock.toLocaleString()
    );

    setText(
        "stat-out-stock",
        outOfStock.toLocaleString()
    );

    setText(
        "stat-inventory-value",
        `${inventoryValue.toLocaleString(
            "fr-FR",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )} MAD`
    );
}


// ============================================================
// STOCK STATUS
// ============================================================

function getProductStatus(product) {

    if (product.quantity <= 0) {
        return "out-of-stock";
    }

    if (product.quantity <= LOW_STOCK_LIMIT) {
        return "low-stock";
    }

    return "in-stock";
}


function getStatusText(status) {

    const statuses = {
        "in-stock": "In Stock",
        "low-stock": "Low Stock",
        "out-of-stock": "Out of Stock"
    };

    return statuses[status] || "Unknown";
}


function getStatusClass(status) {

    const classes = {
        "in-stock": "status-in-stock",
        "low-stock": "status-low-stock",
        "out-of-stock": "status-out-of-stock"
    };

    return classes[status] || "";
}


// ============================================================
// PRODUCTS TABLE
// ============================================================

function displayProducts(products) {

    const tbody =
        document.getElementById("productsTableBody");

    const productCount =
        document.getElementById("product-count");

    if (!tbody) {
        return;
    }

    if (productCount) {
        productCount.textContent =
            products.length;
    }

    if (products.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7"
                    class="text-center py-4">

                    <i class="fas fa-box-open fa-2x text-muted mb-2"></i>

                    <p class="mb-0">
                        No products found
                    </p>

                </td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = products
        .map(product => {

            const status =
                getProductStatus(product);

            const category =
                CATEGORIES[product.categoryId]
                || `Category ${product.categoryId}`;

            return `
                <tr>

                    <td>
                        ${product.productId}
                    </td>

                    <td>
                        <strong>
                            ${escapeHtml(product.name)}
                        </strong>

                        ${
                            product.description
                                ? `
                                    <br>
                                    <small class="text-muted">
                                        ${escapeHtml(
                                            shortenText(
                                                product.description,
                                                55
                                            )
                                        )}
                                    </small>
                                `
                                : ""
                        }
                    </td>

                    <td>
                        <span class="badge bg-light text-dark">
                            ${escapeHtml(category)}
                        </span>
                    </td>

                    <td>
                        <span class="${
                            status !== "in-stock"
                                ? "text-danger fw-bold"
                                : ""
                        }">
                            ${product.quantity} units
                        </span>
                    </td>

                    <td>
                        ${product.price.toFixed(2)} MAD
                    </td>

                    <td>
                        <span class="status-badge ${getStatusClass(status)}">
                            ${getStatusText(status)}
                        </span>
                    </td>

                    <td>

                        <button
                            class="btn btn-yellow btn-action btn-sm"
                            onclick="editProduct(${product.productId})"
                            title="Edit">

                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            class="btn btn-danger btn-action btn-sm"
                            onclick="deleteProduct(${product.productId})"
                            title="Delete">

                            <i class="fas fa-trash"></i>
                        </button>

                        <button
                            class="btn btn-info btn-action btn-sm"
                            onclick="viewProduct(${product.productId})"
                            title="View">

                            <i class="fas fa-eye"></i>
                        </button>

                    </td>

                </tr>
            `;
        })
        .join("");
}


// ============================================================
// FILTERS
// ============================================================

function applyFilters() {

    const search =
        document
            .getElementById("product-search")
            ?.value
            .trim()
            .toLowerCase() || "";

    const categoryValue =
        document
            .getElementById("category-filter")
            ?.value || "";

    const statusValue =
        document
            .getElementById("status-filter")
            ?.value || "";

    let filtered = [
        ...currentStoreProducts
    ];

    if (search) {

        filtered = filtered.filter(
            product => {

                const category =
                    CATEGORIES[product.categoryId]
                    || "";

                return (
                    product.name
                        .toLowerCase()
                        .includes(search)
                    ||
                    product.description
                        .toLowerCase()
                        .includes(search)
                    ||
                    category
                        .toLowerCase()
                        .includes(search)
                    ||
                    String(product.productId)
                        .includes(search)
                );
            }
        );
    }

    if (categoryValue) {

        const categoryId =
            Number(categoryValue);

        filtered = filtered.filter(
            product =>
                product.categoryId === categoryId
        );
    }

    if (statusValue) {

        filtered = filtered.filter(
            product =>
                getProductStatus(product)
                === statusValue
        );
    }

    displayProducts(filtered);
}


// ============================================================
// STOCK ALERTS
// ============================================================

function displayStockAlerts(products) {

    const alertsList =
        document.getElementById("alerts-list");

    const alertCount =
        document.getElementById("alert-count");

    if (!alertsList) {
        return;
    }

    const alerts = products
        .filter(
            product =>
                product.quantity <=
                LOW_STOCK_LIMIT
        )
        .sort(
            (a, b) =>
                a.quantity - b.quantity
        );

    if (alertCount) {
        alertCount.textContent =
            alerts.length;
    }

    if (alerts.length === 0) {

        alertsList.innerHTML = `
            <div class="text-center py-3">

                <i class="fas fa-check-circle fa-2x text-success mb-2"></i>

                <p class="text-muted mb-0">
                    No stock alerts
                </p>

            </div>
        `;

        return;
    }

    alertsList.innerHTML =
        alerts
            .slice(0, 5)
            .map(product => {

                const outOfStock =
                    product.quantity <= 0;

                const badgeClass =
                    outOfStock
                        ? "bg-danger"
                        : "bg-warning text-dark";

                const message =
                    outOfStock
                        ? "Out of stock"
                        : `Low stock: ${product.quantity} units`;

                return `
                    <div class="list-group-item d-flex justify-content-between align-items-center">

                        <div>

                            <i class="fas fa-box ${
                                outOfStock
                                    ? "text-danger"
                                    : "text-warning"
                            }"></i>

                            <strong>
                                ${escapeHtml(product.name)}
                            </strong>

                            <small class="d-block text-muted">
                                ${message}
                            </small>

                        </div>

                        <span class="badge ${badgeClass}">
                            ${
                                outOfStock
                                    ? "OUT"
                                    : "LOW"
                            }
                        </span>

                    </div>
                `;
            })
            .join("");
}


// ============================================================
// CATEGORY CHART
// ============================================================

function updateCategoryChart(products) {

    const canvas =
        document.getElementById("salesChart");

    if (!canvas ||
        typeof Chart === "undefined") {
        return;
    }

    const categoryCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };

    products.forEach(product => {

        if (
            Object.prototype.hasOwnProperty.call(
                categoryCounts,
                product.categoryId
            )
        ) {
            categoryCounts[
                product.categoryId
            ]++;
        }
    });

    const labels = [
        CATEGORIES[1],
        CATEGORIES[2],
        CATEGORIES[3],
        CATEGORIES[4]
    ];

    const values = [
        categoryCounts[1],
        categoryCounts[2],
        categoryCounts[3],
        categoryCounts[4]
    ];

    if (productsChart) {

        productsChart.data.labels =
            labels;

        productsChart.data
            .datasets[0].data =
            values;

        productsChart.update();

        return;
    }

    productsChart =
        new Chart(
            canvas.getContext("2d"),
            {
                type: "bar",

                data: {
                    labels: labels,

                    datasets: [
                        {
                            label: "Products",
                            data: values,
                            backgroundColor:
                                "#FFD700",
                            borderColor:
                                "#FFC107",
                            borderWidth: 1
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {
                            callbacks: {
                                label(context) {
                                    return `Products: ${context.raw}`;
                                }
                            }
                        }
                    },

                    scales: {

                        y: {
                            beginAtZero: true,

                            ticks: {
                                precision: 0
                            }
                        }
                    }
                }
            }
        );
}


// ============================================================
// EVENT LISTENERS
// ============================================================

function initializeEventListeners() {

    document
        .getElementById("sync-button")
        ?.addEventListener(
            "click",
            refreshData
        );

    document
        .getElementById("add-product-btn")
        ?.addEventListener(
            "click",
            openAddProductModal
        );

    document
        .getElementById("saveProductBtn")
        ?.addEventListener(
            "click",
            saveProduct
        );

    document
        .getElementById("product-search")
        ?.addEventListener(
            "input",
            applyFilters
        );

    document
        .getElementById("category-filter")
        ?.addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("status-filter")
        ?.addEventListener(
            "change",
            applyFilters
        );

    document
        .getElementById("export-products-btn")
        ?.addEventListener(
            "click",
            exportProducts
        );

    const productModal =
        document.getElementById(
            "productModal"
        );

    productModal?.addEventListener(
        "hidden.bs.modal",
        resetProductForm
    );
}


// ============================================================
// REFRESH
// ============================================================

async function refreshData() {

    const button =
        document.getElementById(
            "sync-button"
        );

    if (!button) {
        await loadProducts(true);
        return;
    }

    const original =
        button.innerHTML;

    button.disabled = true;

    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Refreshing...
    `;

    await loadProducts(true);

    button.disabled = false;
    button.innerHTML = original;
}


// ============================================================
// ADD PRODUCT
// ============================================================

function openAddProductModal() {

    resetProductForm();

    setText(
        "modalTitle",
        "Add New Product"
    );

    const storeSelect =
        document.getElementById(
            "productStore"
        );

    if (storeSelect) {
        storeSelect.value =
            String(currentStoreId);
    }

    const modalElement =
        document.getElementById(
            "productModal"
        );

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();
}


// ============================================================
// EDIT PRODUCT
// ============================================================

function editProduct(productId) {

    const product =
        allProducts.find(
            item =>
                item.productId ===
                Number(productId)
        );

    if (!product) {

        showNotification(
            "Product not found",
            "danger"
        );

        return;
    }

    const form =
        document.getElementById(
            "productForm"
        );

    form.dataset.productId =
        String(product.productId);

    setText(
        "modalTitle",
        "Edit Product"
    );

    document.getElementById(
        "productName"
    ).value = product.name;

    document.getElementById(
        "productStore"
    ).value = String(
        product.storeId
    );

    document.getElementById(
        "productCategory"
    ).value = String(
        product.categoryId
    );

    document.getElementById(
        "productPrice"
    ).value = product.price;

    document.getElementById(
        "productStock"
    ).value = product.quantity;

    document.getElementById(
        "productDescription"
    ).value =
        product.description || "";

    document.getElementById(
        "productImage"
    ).value =
        product.imagePath || "";

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById(
                "productModal"
            )
        );

    modal.show();
}


// ============================================================
// SAVE PRODUCT - POST / PUT
// ============================================================

async function saveProduct() {

    const form =
        document.getElementById(
            "productForm"
        );

    if (!form) {
        return;
    }

    if (!form.checkValidity()) {

        form.reportValidity();
        return;
    }

    const productId =
        form.dataset.productId
            ? Number(
                form.dataset.productId
            )
            : null;

    const productData = {

        storeId: Number(
            document.getElementById(
                "productStore"
            ).value
        ),

        categoryId: Number(
            document.getElementById(
                "productCategory"
            ).value
        ),

        name:
            document.getElementById(
                "productName"
            ).value.trim(),

        price: Number(
            document.getElementById(
                "productPrice"
            ).value
        ),

        quantity: Number(
            document.getElementById(
                "productStock"
            ).value
        ),

        description:
            document.getElementById(
                "productDescription"
            ).value.trim(),

        imagePath:
            document.getElementById(
                "productImage"
            ).value.trim()
    };

    if (productId !== null) {
        productData.productId =
            productId;
    }

    if (!productData.name) {

        showNotification(
            "Product name is required",
            "danger"
        );

        return;
    }

    if (
        !CATEGORIES[
            productData.categoryId
        ]
    ) {

        showNotification(
            "Please select a valid category",
            "danger"
        );

        return;
    }

    if (
        !STORES[
            productData.storeId
        ]
    ) {

        showNotification(
            "Please select a valid store",
            "danger"
        );

        return;
    }

    if (
        !Number.isFinite(
            productData.price
        )
        ||
        productData.price < 0
    ) {

        showNotification(
            "Invalid product price",
            "danger"
        );

        return;
    }

    if (
        !Number.isInteger(
            productData.quantity
        )
        ||
        productData.quantity < 0
    ) {

        showNotification(
            "Invalid product quantity",
            "danger"
        );

        return;
    }

    const saveButton =
        document.getElementById(
            "saveProductBtn"
        );

    const originalButton =
        saveButton.innerHTML;

    saveButton.disabled = true;

    saveButton.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        Saving...
    `;

    try {

        const response =
            await fetch(
                API_URL,
                {
                    method:
                        productId !== null
                            ? "PUT"
                            : "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            productData
                        )
                }
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const modal =
            bootstrap.Modal
                .getInstance(
                    document.getElementById(
                        "productModal"
                    )
                );

        modal?.hide();

        currentStoreId =
            productData.storeId;

        localStorage.setItem(
            "supermaroc_selected_store",
            String(currentStoreId)
        );

        updateStoreHeader();

        await loadProducts();

        showNotification(
            productId !== null
                ? "Product updated successfully"
                : "Product added successfully",
            "success"
        );

    } catch (error) {

        console.error(
            "Save product error:",
            error
        );

        showNotification(
            "Unable to save product",
            "danger"
        );

    } finally {

        saveButton.disabled =
            false;

        saveButton.innerHTML =
            originalButton;
    }
}


// ============================================================
// DELETE PRODUCT
// ============================================================

async function deleteProduct(productId) {

    const product =
        allProducts.find(
            item =>
                item.productId ===
                Number(productId)
        );

    if (!product) {

        showNotification(
            "Product not found",
            "danger"
        );

        return;
    }

    const confirmed =
        confirm(
            `Delete "${product.name}"?\n\nThis action will remove it from the database.`
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_URL}/${product.productId}`,
                {
                    method: "DELETE"
                }
            );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }

        await loadProducts();

        showNotification(
            "Product deleted successfully",
            "success"
        );

    } catch (error) {

        console.error(
            "Delete product error:",
            error
        );

        showNotification(
            "Unable to delete product",
            "danger"
        );
    }
}


// ============================================================
// VIEW PRODUCT
// ============================================================

function viewProduct(productId) {

    const product =
        allProducts.find(
            item =>
                item.productId ===
                Number(productId)
        );

    if (!product) {

        showNotification(
            "Product not found",
            "danger"
        );

        return;
    }

    setText(
        "viewProductId",
        product.productId
    );

    setText(
        "viewProductName",
        product.name
    );

    setText(
        "viewProductStore",
        STORES[product.storeId]?.name
        || `Store ${product.storeId}`
    );

    setText(
        "viewProductCategory",
        CATEGORIES[product.categoryId]
        || `Category ${product.categoryId}`
    );

    setText(
        "viewProductPrice",
        `${product.price.toFixed(2)} MAD`
    );

    setText(
        "viewProductQuantity",
        `${product.quantity} units`
    );

    setText(
        "viewProductDescription",
        product.description
        || "No description"
    );

    const image =
        document.getElementById(
            "viewProductImage"
        );

    if (image) {

        if (product.imagePath) {

            image.src =
                product.imagePath;

            image.style.display =
                "inline-block";

            image.onerror =
                function () {
                    this.style.display =
                        "none";
                };

        } else {

            image.removeAttribute(
                "src"
            );

            image.style.display =
                "none";
        }
    }

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            document.getElementById(
                "viewProductModal"
            )
        );

    modal.show();
}


// ============================================================
// EXPORT
// ============================================================

function exportProducts() {

    const store =
        STORES[currentStoreId];

    const exportData =
        currentStoreProducts.map(
            product => ({
                productId:
                    product.productId,

                storeId:
                    product.storeId,

                store:
                    store.name,

                categoryId:
                    product.categoryId,

                category:
                    CATEGORIES[
                        product.categoryId
                    ] || "",

                name:
                    product.name,

                price:
                    product.price,

                quantity:
                    product.quantity,

                description:
                    product.description,

                imagePath:
                    product.imagePath
            })
        );

    const blob =
        new Blob(
            [
                JSON.stringify(
                    exportData,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        `supermaroc_products_store_${currentStoreId}_${getToday()}.json`;

    document.body.appendChild(
        link
    );

    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    showNotification(
        "Products exported successfully",
        "success"
    );
}


// ============================================================
// FORM RESET
// ============================================================

function resetProductForm() {

    const form =
        document.getElementById(
            "productForm"
        );

    if (!form) {
        return;
    }

    form.reset();

    delete form.dataset.productId;

    const store =
        document.getElementById(
            "productStore"
        );

    if (store) {
        store.value =
            String(currentStoreId);
    }

    setText(
        "modalTitle",
        "Add New Product"
    );
}


// ============================================================
// API STATUS
// ============================================================

function setApiStatus(status) {

    const badge =
        document.getElementById(
            "store-status"
        );

    if (!badge) {
        return;
    }

    if (status === "online") {

        badge.className =
            "badge bg-success";

        badge.textContent =
            "API Online";

        return;
    }

    if (status === "offline") {

        badge.className =
            "badge bg-danger";

        badge.textContent =
            "API Offline";

        return;
    }

    badge.className =
        "badge bg-warning text-dark";

    badge.textContent =
        "Loading...";
}


// ============================================================
// NOTIFICATIONS
// ============================================================

function showNotification(
    message,
    type = "info"
) {

    const validTypes = [
        "success",
        "danger",
        "warning",
        "info"
    ];

    const bootstrapType =
        validTypes.includes(type)
            ? type
            : "info";

    const notification =
        document.createElement("div");

    notification.className =
        `alert alert-${bootstrapType} alert-dismissible fade show position-fixed shadow`;

    notification.style.cssText =
        "top:20px;right:20px;z-index:9999;min-width:300px;max-width:420px;";

    notification.innerHTML = `
        ${escapeHtml(message)}

        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert">
        </button>
    `;

    document.body.appendChild(
        notification
    );

    setTimeout(
        () => {

            if (
                notification.parentNode
            ) {
                notification.remove();
            }

        },
        3500
    );
}


// ============================================================
// HELPERS
// ============================================================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            String(value);
    }
}


function shortenText(
    text,
    maxLength
) {

    if (!text) {
        return "";
    }

    if (
        text.length <= maxLength
    ) {
        return text;
    }

    return (
        text.substring(
            0,
            maxLength
        )
        + "..."
    );
}


function escapeHtml(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}


function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];
}


// ============================================================
// GLOBAL FUNCTIONS USED BY INLINE BUTTONS
// ============================================================

window.editProduct =
    editProduct;

window.deleteProduct =
    deleteProduct;

window.viewProduct =
    viewProduct;