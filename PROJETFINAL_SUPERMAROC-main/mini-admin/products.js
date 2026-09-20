const API_URL = "http://localhost:8888/api/admin/produits";
const LOW_STOCK_LIMIT = 10;

const STORES = {
    1: "SuperMaroc Agadir",
    2: "SuperMaroc Casablanca"
};

const CATEGORIES = {
    1: "Fruits",
    2: "Boissons",
    3: "Produits laitiers",
    4: "Épicerie"
};

class ProductsManager {
    constructor() {
        this.products = [];
        this.currentSearchTerm = "";
        this.currentCategoryFilter = "";
        this.currentStatusFilter = "";
        this.editingProductId = null;
    }

    async init() {
        this.setupEventListeners();
        this.populateCategories();
        await this.loadProducts();
    }

    setupEventListeners() {
        document.getElementById("productSearch")?.addEventListener("input", (e) => {
            this.currentSearchTerm = e.target.value.trim().toLowerCase();
            this.renderProducts();
        });

        document.getElementById("statusFilter")?.addEventListener("change", (e) => {
            this.currentStatusFilter = e.target.value;
            this.renderProducts();
        });

        document.getElementById("categoryFilter")?.addEventListener("change", (e) => {
            this.currentCategoryFilter = e.target.value;
            this.renderProducts();
            this.updateCategoryBadges();
        });

        document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
            this.clearFilters();
        });

        document.getElementById("addProductBtn")?.addEventListener("click", () => {
            this.openAddProductModal();
        });

        document.getElementById("saveProductBtn")?.addEventListener("click", () => {
            this.saveProduct();
        });

        document.getElementById("refreshProductsBtn")?.addEventListener("click", () => {
            this.loadProducts();
        });

        document.getElementById("syncButton")?.addEventListener("click", () => {
            this.loadProducts();
        });

        document.getElementById("exportCSVBtn")?.addEventListener("click", () => {
            this.exportToCSV();
        });

        document.getElementById("exportCSVBtn2")?.addEventListener("click", () => {
            this.exportToCSV();
        });

        document.getElementById("lowStockBtn")?.addEventListener("click", () => {
            this.currentStatusFilter = "low-stock";

            const statusFilter = document.getElementById("statusFilter");
            if (statusFilter) statusFilter.value = "low-stock";

            this.renderProducts();
        });

        document.getElementById("scanBarcodeBtn")?.addEventListener("click", () => {
            this.showNotification(
                "Barcode scanner is not connected to the backend.",
                "info"
            );
        });

        document.getElementById("printTagsBtn")?.addEventListener("click", () => {
            window.print();
        });

        document.getElementById("expiringBtn")?.addEventListener("click", () => {
            this.showNotification(
                "Expiry dates are not stored in the current database schema.",
                "info"
            );
        });

        document.getElementById("exportPDFBtn")?.addEventListener("click", (e) => {
            e.preventDefault();
            window.print();
        });

        document.getElementById("exportExcelBtn")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.exportToCSV();
        });

        document.getElementById("deleteSelectedBtn")?.addEventListener("click", () => {
            this.showNotification(
                "Select-and-delete is not enabled. Use the delete button of a product.",
                "info"
            );
        });

        document
            .getElementById("addProductModal")
            ?.addEventListener("hidden.bs.modal", () => {
                this.resetProductForm();
            });
    }

    async loadProducts() {
        try {
            this.setSyncState(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            this.products = data.map((product) => ({
                productId: Number(product.productId),
                storeId: Number(product.storeId),
                categoryId: Number(product.categoryId),
                name: product.name || "",
                price: Number(product.price) || 0,
                quantity: Number(product.quantity) || 0,
                description: product.description || "",
                imagePath: product.imagePath || ""
            }));

            this.renderProducts();
            this.renderCategoryBadges();
            this.updateStatistics();

            this.showNotification(
                `${this.products.length} products loaded`,
                "success"
            );
        } catch (error) {
            console.error("loadProducts error:", error);

            this.showNotification(
                "Unable to load products from the API.",
                "error"
            );
        } finally {
            this.setSyncState(false);
        }
    }

    populateCategories() {
        const categoryFilter = document.getElementById("categoryFilter");

        if (categoryFilter) {
            categoryFilter.innerHTML = `
                <option value="">All Categories</option>
                <option value="1">Fruits</option>
                <option value="2">Boissons</option>
                <option value="3">Produits laitiers</option>
                <option value="4">Épicerie</option>
            `;
        }
    }

    renderCategoryBadges() {
        const container = document.getElementById("category-filters");
        if (!container) return;

        const counts = {};

        Object.keys(CATEGORIES).forEach((id) => {
            counts[id] = this.products.filter(
                (product) => product.categoryId === Number(id)
            ).length;
        });

        container.innerHTML = `
            <button
                type="button"
                class="btn btn-sm category-badge ${
                    this.currentCategoryFilter === "" ? "btn-dark" : "btn-outline-dark"
                } me-2 mb-2"
                data-category=""
            >
                All (${this.products.length})
            </button>

            ${Object.entries(CATEGORIES)
                .map(([id, name]) => `
                    <button
                        type="button"
                        class="btn btn-sm category-badge ${
                            this.currentCategoryFilter === id
                                ? "btn-dark"
                                : "btn-outline-dark"
                        } me-2 mb-2"
                        data-category="${id}"
                    >
                        ${this.escapeHtml(name)} (${counts[id] || 0})
                    </button>
                `)
                .join("")}
        `;

        container.querySelectorAll(".category-badge").forEach((button) => {
            button.addEventListener("click", () => {
                this.currentCategoryFilter = button.dataset.category;

                const categoryFilter = document.getElementById("categoryFilter");
                if (categoryFilter) {
                    categoryFilter.value = this.currentCategoryFilter;
                }

                this.renderProducts();
                this.renderCategoryBadges();
            });
        });
    }

    updateCategoryBadges() {
        this.renderCategoryBadges();
    }

    getFilteredProducts() {
        return this.products.filter((product) => {
            const searchText = [
                product.name,
                product.description,
                STORES[product.storeId] || "",
                CATEGORIES[product.categoryId] || ""
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !this.currentSearchTerm ||
                searchText.includes(this.currentSearchTerm);

            const matchesCategory =
                !this.currentCategoryFilter ||
                product.categoryId === Number(this.currentCategoryFilter);

            const status = this.getStockStatus(product.quantity);

            const matchesStatus =
                !this.currentStatusFilter ||
                status === this.currentStatusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    renderProducts() {
        const tableBody = document.getElementById("productsTableBody");
        if (!tableBody) return;

        const filteredProducts = this.getFilteredProducts();

        if (filteredProducts.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-5">
                        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No products found</h5>
                    </td>
                </tr>
            `;

            this.updateProductCount(0);
            return;
        }

        tableBody.innerHTML = filteredProducts
            .map((product) => this.createProductRow(product))
            .join("");

        this.updateProductCount(filteredProducts.length);
    }

    createProductRow(product) {
        const image = this.getProductImage(product);
        const status = this.getStockStatus(product.quantity);
        const statusLabel = this.getStatusText(status);

        return `
            <tr>
                <td class="text-center">
                    ${product.productId}
                </td>

                <td>
                    <div class="d-flex align-items-center">
                        <img
                            src="${this.escapeAttribute(image)}"
                            alt="${this.escapeAttribute(product.name)}"
                            width="55"
                            height="55"
                            style="
                                object-fit: cover;
                                border-radius: 8px;
                                margin-right: 12px;
                                background: #f5f5f5;
                            "
                            onerror="
                                this.onerror=null;
                                this.src='https://cdn-icons-png.flaticon.com/512/679/679720.png';
                            "
                        >

                        <div>
                            <div class="fw-bold">
                                ${this.escapeHtml(product.name)}
                            </div>

                            <div class="small text-muted">
                                ${this.escapeHtml(
                                    CATEGORIES[product.categoryId] || "Unknown category"
                                )}
                            </div>

                            ${
                                product.description
                                    ? `<div class="small text-muted">
                                        ${this.escapeHtml(
                                            this.shortenText(product.description, 60)
                                        )}
                                       </div>`
                                    : ""
                            }
                        </div>
                    </div>
                </td>

                <td class="text-center">
                    <span class="badge ${this.getStatusBootstrapClass(status)}">
                        ${product.quantity}
                    </span>
                    <div class="small text-muted mt-1">
                        ${statusLabel}
                    </div>
                </td>

                <td class="text-end">
                    <strong class="text-success">
                        ${product.price.toFixed(2)} MAD
                    </strong>
                </td>

                <td class="text-center">
                    ${this.escapeHtml(
                        STORES[product.storeId] || `Store #${product.storeId}`
                    )}
                </td>

                <td class="text-center">
                    <img
                        src="${this.escapeAttribute(image)}"
                        alt="${this.escapeAttribute(product.name)}"
                        width="55"
                        height="55"
                        style="
                            object-fit: cover;
                            border-radius: 8px;
                            background: #f5f5f5;
                        "
                        onerror="
                            this.onerror=null;
                            this.src='https://cdn-icons-png.flaticon.com/512/679/679720.png';
                        "
                    >
                </td>

                <td class="text-center">
                    <div class="action-buttons">
                        <button
                            type="button"
                            class="btn btn-sm btn-warning me-1"
                            onclick="productsManager.editProduct(${product.productId})"
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-info me-1"
                            onclick="productsManager.viewProduct(${product.productId})"
                            title="View"
                        >
                            <i class="fas fa-eye"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-danger"
                            onclick="productsManager.deleteProduct(${product.productId})"
                            title="Delete"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    getProductImage(product) {
        const imagePath = (product.imagePath || "").trim();

        if (!imagePath) {
            return "https://cdn-icons-png.flaticon.com/512/679/679720.png";
        }

        if (
            imagePath.startsWith("http://") ||
            imagePath.startsWith("https://") ||
            imagePath.startsWith("data:")
        ) {
            return imagePath;
        }

        if (imagePath.startsWith("/")) {
            return `http://localhost:8888${imagePath}`;
        }

        return `http://localhost:8888/${imagePath}`;
    }

    getStockStatus(quantity) {
        if (quantity <= 0) {
            return "out-of-stock";
        }

        if (quantity <= LOW_STOCK_LIMIT) {
            return "low-stock";
        }

        return "in-stock";
    }

    getStatusText(status) {
        const labels = {
            "in-stock": "In Stock",
            "low-stock": "Low Stock",
            "out-of-stock": "Out of Stock"
        };

        return labels[status] || "Unknown";
    }

    getStatusBootstrapClass(status) {
        const classes = {
            "in-stock": "bg-success",
            "low-stock": "bg-warning text-dark",
            "out-of-stock": "bg-danger"
        };

        return classes[status] || "bg-secondary";
    }

    updateProductCount(count) {
        const element = document.getElementById("productCountText");

        if (element) {
            element.textContent =
                `Showing ${count} of ${this.products.length} products`;
        }
    }

    updateStatistics() {
        const totalProducts = this.products.length;

        const lowStock = this.products.filter(
            (product) =>
                product.quantity > 0 &&
                product.quantity <= LOW_STOCK_LIMIT
        ).length;

        const outOfStock = this.products.filter(
            (product) => product.quantity <= 0
        ).length;

        const totalStockValue = this.products.reduce(
            (total, product) =>
                total + product.price * product.quantity,
            0
        );

        const averagePrice =
            totalProducts > 0
                ? this.products.reduce(
                    (total, product) => total + product.price,
                    0
                ) / totalProducts
                : 0;

        this.setText("totalProducts", totalProducts);
        this.setText("lowStockCount", lowStock);
        this.setText("outOfStockCount", outOfStock);
        this.setText(
            "totalStockValue",
            `${totalStockValue.toFixed(2)} MAD`
        );
        this.setText("avgPrice", averagePrice.toFixed(2));

        // Not present in the current DB schema.
        this.setText("expiringCount", "N/A");
        this.setText("weeklyChange", "Live data");
    }

    openAddProductModal() {
        this.resetProductForm();

        document.getElementById("modalTitle").innerHTML =
            '<i class="fas fa-plus-circle"></i> Add New Product';

        const modalElement = document.getElementById("addProductModal");
        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    }

    async saveProduct() {
        const name = document.getElementById("productName")?.value.trim();
        const categoryId = Number(
            document.getElementById("categoryId")?.value
        );
        const storeId = Number(
            document.getElementById("storeId")?.value
        );
        const imagePath =
            document.getElementById("imagePath")?.value.trim() || "";
        const price = Number(
            document.getElementById("sellingPrice")?.value
        );
        const quantity = Number(
            document.getElementById("currentStock")?.value
        );
        const description =
            document.getElementById("description")?.value.trim() || "";

        if (
            !name ||
            !storeId ||
            !categoryId ||
            !Number.isFinite(price) ||
            price < 0 ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            this.showNotification(
                "Please fill in the required fields correctly.",
                "error"
            );
            return;
        }

        const productData = {
            storeId,
            categoryId,
            name,
            price,
            quantity,
            description,
            imagePath
        };

        if (this.editingProductId !== null) {
            productData.productId = this.editingProductId;
        }

        const isEditing = this.editingProductId !== null;

        try {
            const response = await fetch(API_URL, {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(
                    `HTTP ${response.status}: ${responseText}`
                );
            }

            const modalElement =
                document.getElementById("addProductModal");

            bootstrap.Modal
                .getOrCreateInstance(modalElement)
                .hide();

            this.showNotification(
                isEditing
                    ? "Product updated successfully!"
                    : "Product added successfully!",
                "success"
            );

            this.resetProductForm();
            await this.loadProducts();
        } catch (error) {
            console.error("saveProduct error:", error);

            this.showNotification(
                isEditing
                    ? "Unable to update product."
                    : "Unable to add product.",
                "error"
            );
        }
    }

    editProduct(productId) {
        const product = this.products.find(
            (item) => item.productId === Number(productId)
        );

        if (!product) {
            this.showNotification("Product not found.", "error");
            return;
        }

        this.editingProductId = product.productId;

        document.getElementById("productName").value =
            product.name;

        document.getElementById("categoryId").value =
            String(product.categoryId);

        document.getElementById("storeId").value =
            String(product.storeId);

        document.getElementById("imagePath").value =
            product.imagePath;

        document.getElementById("sellingPrice").value =
            product.price;

        document.getElementById("currentStock").value =
            product.quantity;

        document.getElementById("description").value =
            product.description;

        document.getElementById("modalTitle").innerHTML =
            '<i class="fas fa-edit"></i> Edit Product';

        const modalElement =
            document.getElementById("addProductModal");

        bootstrap.Modal
            .getOrCreateInstance(modalElement)
            .show();
    }

    viewProduct(productId) {
        const product = this.products.find(
            (item) => item.productId === Number(productId)
        );

        if (!product) {
            this.showNotification("Product not found.", "error");
            return;
        }

        document.getElementById("productViewModal")?.remove();

        const image = this.getProductImage(product);
        const status = this.getStockStatus(product.quantity);

        const modalElement = document.createElement("div");

        modalElement.className = "modal fade";
        modalElement.id = "productViewModal";
        modalElement.tabIndex = -1;

        modalElement.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="modal-header modal-header-yellow">
                        <h5 class="modal-title">
                            <i class="fas fa-eye"></i>
                            Product Details
                        </h5>

                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    <div class="modal-body">
                        <div class="row">

                            <div class="col-md-4 text-center mb-3">
                                <img
                                    src="${this.escapeAttribute(image)}"
                                    alt="${this.escapeAttribute(product.name)}"
                                    class="img-fluid rounded"
                                    style="
                                        max-height: 250px;
                                        object-fit: contain;
                                    "
                                    onerror="
                                        this.onerror=null;
                                        this.src='https://cdn-icons-png.flaticon.com/512/679/679720.png';
                                    "
                                >
                            </div>

                            <div class="col-md-8">
                                <h3>
                                    ${this.escapeHtml(product.name)}
                                </h3>

                                <table class="table table-sm mt-3">
                                    <tbody>
                                        <tr>
                                            <th>Product ID</th>
                                            <td>${product.productId}</td>
                                        </tr>

                                        <tr>
                                            <th>Store</th>
                                            <td>
                                                ${this.escapeHtml(
                                                    STORES[product.storeId] ||
                                                    `Store #${product.storeId}`
                                                )}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Category</th>
                                            <td>
                                                ${this.escapeHtml(
                                                    CATEGORIES[product.categoryId] ||
                                                    "Unknown"
                                                )}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Price</th>
                                            <td>
                                                ${product.price.toFixed(2)} MAD
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Quantity</th>
                                            <td>${product.quantity}</td>
                                        </tr>

                                        <tr>
                                            <th>Status</th>
                                            <td>
                                                <span class="badge ${this.getStatusBootstrapClass(status)}">
                                                    ${this.getStatusText(status)}
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>Description</th>
                                            <td>
                                                ${this.escapeHtml(
                                                    product.description || "—"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            class="btn btn-warning"
                            id="viewEditProductButton"
                        >
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalElement);

        const modal =
            bootstrap.Modal.getOrCreateInstance(modalElement);

        modalElement
            .querySelector("#viewEditProductButton")
            ?.addEventListener("click", () => {
                modal.hide();

                modalElement.addEventListener(
                    "hidden.bs.modal",
                    () => {
                        this.editProduct(product.productId);
                    },
                    { once: true }
                );
            });

        modalElement.addEventListener(
            "hidden.bs.modal",
            () => {
                modal.dispose();
                modalElement.remove();
            },
            { once: true }
        );

        modal.show();
    }

    async deleteProduct(productId) {
        const product = this.products.find(
            (item) => item.productId === Number(productId)
        );

        if (!product) {
            this.showNotification("Product not found.", "error");
            return;
        }

        const confirmed = confirm(
            `Delete "${product.name}"?\n\nThis action will delete the product from the database.`
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${API_URL}/${product.productId}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                const responseText = await response.text();

                throw new Error(
                    `HTTP ${response.status}: ${responseText}`
                );
            }

            this.showNotification(
                "Product deleted successfully!",
                "success"
            );

            await this.loadProducts();
        } catch (error) {
            console.error("deleteProduct error:", error);

            this.showNotification(
                "Unable to delete this product. It may already be referenced by an order.",
                "error"
            );
        }
    }

    clearFilters() {
        this.currentSearchTerm = "";
        this.currentCategoryFilter = "";
        this.currentStatusFilter = "";

        const search = document.getElementById("productSearch");
        const category = document.getElementById("categoryFilter");
        const status = document.getElementById("statusFilter");

        if (search) search.value = "";
        if (category) category.value = "";
        if (status) status.value = "";

        this.renderProducts();
        this.renderCategoryBadges();
    }

    exportToCSV() {
        const products = this.getFilteredProducts();

        const rows = [
            [
                "ID",
                "Name",
                "Category",
                "Store",
                "Price",
                "Quantity",
                "Description",
                "Image URL"
            ],

            ...products.map((product) => [
                product.productId,
                product.name,
                CATEGORIES[product.categoryId] || "",
                STORES[product.storeId] || "",
                product.price,
                product.quantity,
                product.description,
                product.imagePath
            ])
        ];

        const csv = rows
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value ?? "").replaceAll('"', '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob(
            ["\uFEFF" + csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download =
            `supermaroc_products_${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        this.showNotification(
            "CSV exported successfully!",
            "success"
        );
    }

    resetProductForm() {
        this.editingProductId = null;

        document.getElementById("productForm")?.reset();

        const title = document.getElementById("modalTitle");

        if (title) {
            title.innerHTML =
                '<i class="fas fa-plus-circle"></i> Add New Product';
        }
    }

    setSyncState(isLoading) {
        const button = document.getElementById("syncButton");

        if (!button) return;

        button.disabled = isLoading;

        button.innerHTML = isLoading
            ? '<i class="fas fa-spinner fa-spin"></i> Syncing...'
            : '<i class="fas fa-sync-alt"></i> Sync';
    }

    setText(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    shortenText(text, length) {
        if (!text) return "";

        return text.length > length
            ? `${text.substring(0, length)}...`
            : text;
    }

    escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    escapeAttribute(value) {
        return this.escapeHtml(value);
    }

    showNotification(message, type = "info") {
        let container =
            document.querySelector(".notification-container");

        if (!container) {
            container = document.createElement("div");
            container.className = "notification-container";

            container.style.position = "fixed";
            container.style.top = "20px";
            container.style.right = "20px";
            container.style.zIndex = "9999";

            document.body.appendChild(container);
        }

        const notification = document.createElement("div");

        const bootstrapClass = {
            success: "alert-success",
            error: "alert-danger",
            warning: "alert-warning",
            info: "alert-info"
        }[type] || "alert-info";

        notification.className =
            `alert ${bootstrapClass} alert-dismissible fade show shadow`;

        notification.style.minWidth = "300px";

        notification.innerHTML = `
            ${this.escapeHtml(message)}

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
            ></button>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3500);
    }
}

window.productsManager = new ProductsManager();

document.addEventListener("DOMContentLoaded", () => {
    window.productsManager.init();
});