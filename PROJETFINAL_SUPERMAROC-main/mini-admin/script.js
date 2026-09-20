// ===== STORE DATA =====
const storeDatabase = {
    agadir: {
        id: "ST001",
        name: "Agadir SuperMaroc",
        shortName: "Agadir Store",
        city: "Agadir",
        address: "123 Avenue Mohammed V, Agadir 80000",
        phone: "+212 5288-12345",
        manager: "Bahija EL HAJALI",
        managerEmail: "bahija@supermaroc.ma",
        openingDate: "2020-03-15",
        monthlyTarget: 450000,
        status: "online",
        stats: {
            todaySales: 8450,
            weeklySales: 58900,
            monthlySales: 245000,
            totalProducts: 1247,
            lowStock: 8,
            outOfStock: 3,
            pendingOrders: 14,
            expiringProducts: 5
        },
        products: [
            { id: 1, name: "Fresh Milk", category: "beverages", stock: 45, threshold: 10, price: 8.5, status: "in-stock", expiry: "2024-12-15" },
            { id: 2, name: "Whole Wheat Bread", category: "food", stock: 5, threshold: 15, price: 4.2, status: "low-stock", expiry: "2024-11-25" },
            { id: 3, name: "Mineral Water 1.5L", category: "beverages", stock: 120, threshold: 20, price: 5.0, status: "in-stock", expiry: "2025-06-30" },
            { id: 4, name: "Yogurt Natural", category: "food", stock: 0, threshold: 25, price: 3.8, status: "out-of-stock", expiry: "2024-11-20" },
            { id: 5, name: "Olive Oil 1L", category: "food", stock: 18, threshold: 10, price: 45.0, status: "in-stock", expiry: "2025-03-15" }
        ],
        alerts: [
            { id: 1, type: "stock", severity: "high", message: "Yogurt out of stock", product: "Yogurt Natural", date: "2024-11-10" },
            { id: 2, type: "expiry", severity: "medium", message: "Bread expiring soon", product: "Whole Wheat Bread", date: "2024-11-10" },
            { id: 3, type: "stock", severity: "medium", message: "Low stock alert", product: "Whole Wheat Bread", date: "2024-11-09" }
        ]
    },
    casa: {
        id: "ST002",
        name: "Casablanca SuperMaroc",
        shortName: "Casablanca Store",
        city: "Casablanca",
        address: "456 Boulevard Anfa, Casablanca 20000",
        phone: "+212 5222-98765",
        manager: "Ahmed BENANI",
        managerEmail: "ahmed@supermaroc.ma",
        openingDate: "2019-07-20",
        monthlyTarget: 650000,
        status: "online",
        stats: {
            todaySales: 12500,
            weeklySales: 89200,
            monthlySales: 389000,
            totalProducts: 1850,
            lowStock: 12,
            outOfStock: 5,
            pendingOrders: 22,
            expiringProducts: 8
        },
        products: [
            { id: 1, name: "Fresh Milk", category: "beverages", stock: 85, threshold: 20, price: 8.5, status: "in-stock", expiry: "2024-12-20" },
            { id: 2, name: "White Bread", category: "food", stock: 25, threshold: 30, price: 3.8, status: "in-stock", expiry: "2024-11-26" },
            { id: 3, name: "Sparkling Water", category: "beverages", stock: 65, threshold: 15, price: 6.5, status: "in-stock", expiry: "2025-07-15" }
        ],
        alerts: [
            { id: 1, type: "stock", severity: "high", message: "Butter out of stock", product: "Butter 250g", date: "2024-11-11" },
            { id: 2, type: "expiry", severity: "low", message: "Juice expiring in 3 days", product: "Orange Juice", date: "2024-11-11" }
        ]
    },
    marrakech: {
        id: "ST003",
        name: "Marrakech SuperMaroc",
        shortName: "Marrakech Store",
        city: "Marrakech",
        address: "789 Rue de la Koutoubia, Marrakech 40000",
        phone: "+212 5244-54321",
        manager: "Fatima ZAHRA",
        managerEmail: "fatima@supermaroc.ma",
        openingDate: "2021-05-10",
        monthlyTarget: 380000,
        status: "online",
        stats: {
            todaySales: 7200,
            weeklySales: 52100,
            monthlySales: 215000,
            totalProducts: 980,
            lowStock: 6,
            outOfStock: 2,
            pendingOrders: 9,
            expiringProducts: 3
        },
        products: [
            { id: 1, name: "Camel Milk", category: "beverages", stock: 15, threshold: 5, price: 12.0, status: "in-stock", expiry: "2024-12-05" },
            { id: 2, name: "Traditional Bread", category: "food", stock: 35, threshold: 10, price: 2.5, status: "in-stock", expiry: "2024-11-24" }
        ],
        alerts: [
            { id: 1, type: "stock", severity: "medium", message: "Low stock of traditional bread", product: "Traditional Bread", date: "2024-11-10" }
        ]
    },
    rabat: {
        id: "ST004",
        name: "Rabat SuperMaroc",
        shortName: "Rabat Store",
        city: "Rabat",
        address: "101 Avenue Mohammed VI, Rabat 10000",
        phone: "+212 5377-11223",
        manager: "Karim ALAMI",
        managerEmail: "karim@supermaroc.ma",
        openingDate: "2022-01-30",
        monthlyTarget: 420000,
        status: "online",
        stats: {
            todaySales: 6800,
            weeklySales: 47800,
            monthlySales: 198000,
            totalProducts: 1105,
            lowStock: 9,
            outOfStock: 4,
            pendingOrders: 11,
            expiringProducts: 6
        },
        products: [
            { id: 1, name: "Skimmed Milk", category: "beverages", stock: 32, threshold: 10, price: 7.8, status: "in-stock", expiry: "2024-12-10" },
            { id: 2, name: "Baguette", category: "food", stock: 8, threshold: 12, price: 3.0, status: "low-stock", expiry: "2024-11-25" }
        ],
        alerts: [
            { id: 1, type: "stock", severity: "high", message: "Coffee out of stock", product: "Coffee 500g", date: "2024-11-11" },
            { id: 2, type: "expiry", severity: "medium", message: "Cheese expiring tomorrow", product: "Camembert Cheese", date: "2024-11-11" }
        ]
    }
};

// ===== GLOBAL VARIABLES =====
let currentStore = 'agadir';
let salesChart = null;
let allProducts = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeStoreSelector();
    loadStoreData(currentStore);
    initializeEventListeners();
    setupChart();
});

// ===== STORE SELECTOR =====
function initializeStoreSelector() {
    const storeOptions = document.querySelectorAll('.store-option');
    const currentStoreElement = document.getElementById('current-store');
    const currentStoreNameElement = document.getElementById('current-store-name');
    
    storeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const storeId = this.getAttribute('data-store');
            switchStore(storeId);
            
            // Update dropdown text
            currentStoreElement.textContent = this.textContent;
            currentStoreNameElement.textContent = storeDatabase[storeId].shortName;
        });
    });
    
    // Load last selected store from localStorage
    const savedStore = localStorage.getItem('supermaroc_selected_store');
    if (savedStore && storeDatabase[savedStore]) {
        currentStore = savedStore;
        const storeOption = document.querySelector(`.store-option[data-store="${savedStore}"]`);
        if (storeOption) {
            currentStoreElement.textContent = storeOption.textContent;
            currentStoreNameElement.textContent = storeDatabase[savedStore].shortName;
        }
    }
}

function switchStore(storeId) {
    if (!storeDatabase[storeId]) {
        console.error(`Store ${storeId} not found`);
        return;
    }
    
    currentStore = storeId;
    localStorage.setItem('supermaroc_selected_store', storeId);
    loadStoreData(storeId);
    
    // Show notification
    showNotification(`Switched to ${storeDatabase[storeId].name}`, 'success');
}

// ===== LOAD STORE DATA =====
function loadStoreData(storeId) {
    const store = storeDatabase[storeId];
    if (!store) return;
    
    // Update header
    document.getElementById('store-full-name').textContent = store.name;
    document.getElementById('store-details').innerHTML = `
        <i class="fas fa-info-circle"></i> ${store.city} • Manager: ${store.manager} • ID: ${store.id}
    `;
    document.getElementById('store-code').textContent = store.id;
    document.getElementById('store-manager').textContent = store.manager;
    
    // Update stats
    updateStats(store.stats);
    
    // Load products
    allProducts = store.products;
    displayProducts(allProducts);
    
    // Load alerts
    displayAlerts(store.alerts);
    
    // Update chart with store-specific data
    updateChart(storeId);
}

function updateStats(stats) {
    const statsContainer = document.getElementById('stats-container');
    statsContainer.innerHTML = `
        <div class="col-md-3">
            <div class="card stat-card">
                <div class="card-body">
                    <h6 class="card-title">TODAY'S SALES</h6>
                    <h2 class="card-value">${stats.todaySales.toLocaleString()} MAD</h2>
                    <p class="card-change positive">
                        <i class="fas fa-arrow-up"></i> 12.5% from yesterday
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card">
                <div class="card-body">
                    <h6 class="card-title">TOTAL PRODUCTS</h6>
                    <h2 class="card-value">${stats.totalProducts.toLocaleString()}</h2>
                    <p class="card-change">
                        ${stats.lowStock} low stock • ${stats.outOfStock} out of stock
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card">
                <div class="card-body">
                    <h6 class="card-title">ACTIVE ALERTS</h6>
                    <h2 class="card-value">${stats.lowStock + stats.outOfStock + stats.expiringProducts}</h2>
                    <p class="card-change negative">
                        <i class="fas fa-exclamation-triangle"></i> Requires attention
                    </p>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card stat-card">
                <div class="card-body">
                    <h6 class="card-title">PENDING ORDERS</h6>
                    <h2 class="card-value">${stats.pendingOrders}</h2>
                    <p class="card-change">
                        <i class="fas fa-clock"></i> To be prepared today
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Update alert count
    document.getElementById('alert-count').textContent = storeDatabase[currentStore].alerts.length;
}

// ===== PRODUCTS MANAGEMENT =====
function displayProducts(products) {
    const tbody = document.getElementById('productsTableBody');
    const productCount = document.getElementById('product-count');
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4">
                    <i class="fas fa-box-open fa-2x text-muted mb-3"></i>
                    <p>No products found</p>
                    <button class="btn btn-yellow btn-sm" id="add-first-product">
                        <i class="fas fa-plus"></i> Add First Product
                    </button>
                </td>
            </tr>
        `;
        productCount.textContent = '0';
        return;
    }
    
    let html = '';
    products.forEach(product => {
        const statusClass = getStatusClass(product.status);
        const statusText = getStatusText(product.status);
        
        html += `
            <tr>
                <td>${product.id}</td>
                <td>
                    <strong>${product.name}</strong>
                    ${product.barcode ? `<br><small class="text-muted">Barcode: ${product.barcode}</small>` : ''}
                </td>
                <td>
                    <span class="badge bg-light text-dark">${product.category}</span>
                </td>
                <td>
                    <span class="${product.stock < product.threshold ? 'text-danger fw-bold' : ''}">
                        ${product.stock} units
                    </span>
                </td>
                <td>${product.threshold} units</td>
                <td>${product.price.toFixed(2)} MAD</td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td>
                    ${product.expiry ? formatDate(product.expiry) : 'N/A'}
                    ${isExpiringSoon(product.expiry) ? '<i class="fas fa-exclamation-triangle text-warning ms-1"></i>' : ''}
                </td>
                <td>
                    <button class="btn btn-yellow btn-action btn-sm" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-action btn-sm" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-info btn-action btn-sm" onclick="viewProduct(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    productCount.textContent = products.length;
}

function getStatusClass(status) {
    const classes = {
        'in-stock': 'status-in-stock',
        'low-stock': 'status-low-stock',
        'out-of-stock': 'status-out-of-stock',
        'expiring': 'status-expiring'
    };
    return classes[status] || 'status-in-stock';
}

function getStatusText(status) {
    const texts = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out-of-stock': 'Out of Stock',
        'expiring': 'Expiring Soon'
    };
    return texts[status] || 'In Stock';
}

function isExpiringSoon(expiryDate) {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ===== ALERTS DISPLAY =====
function displayAlerts(alerts) {
    const alertsList = document.getElementById('alerts-list');
    
    if (alerts.length === 0) {
        alertsList.innerHTML = `
            <div class="text-center py-3">
                <i class="fas fa-check-circle fa-2x text-success mb-2"></i>
                <p class="text-muted">No active alerts</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    alerts.slice(0, 4).forEach(alert => {
        const icon = getAlertIcon(alert.type);
        const badgeClass = getAlertBadgeClass(alert.severity);
        
        html += `
            <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                    <i class="${icon}"></i> ${alert.message}
                    <small class="d-block text-muted">Product: ${alert.product}</small>
                </div>
                <span class="badge ${badgeClass}">${alert.severity.toUpperCase()}</span>
            </a>
        `;
    });
    
    alertsList.innerHTML = html;
}

function getAlertIcon(type) {
    const icons = {
        'stock': 'fas fa-box text-danger',
        'expiry': 'fas fa-calendar-times text-warning',
        'order': 'fas fa-shopping-cart text-primary',
        'system': 'fas fa-server text-info'
    };
    return icons[type] || 'fas fa-bell';
}

function getAlertBadgeClass(severity) {
    const classes = {
        'high': 'bg-danger',
        'medium': 'bg-warning',
        'low': 'bg-info'
    };
    return classes[severity] || 'bg-secondary';
}

// ===== CHART FUNCTIONS =====
function setupChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Sales (MAD)',
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: '#FFD700',
                borderColor: '#FFC107',
                borderWidth: 1
            }]
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
                        label: function(context) {
                            return `Sales: ${context.raw.toLocaleString()} MAD`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' MAD';
                        }
                    }
                }
            }
        }
    });
}

function updateChart(storeId) {
    // Simulate different sales data for each store
    const salesData = {
        agadir: [6500, 7200, 8450, 9100, 7800, 12500, 9800],
        casa: [8500, 9200, 12500, 14100, 11800, 18500, 14800],
        marrakech: [5200, 6100, 7200, 7800, 6500, 9800, 8200],
        rabat: [5800, 6700, 6800, 7200, 6100, 9200, 7800]
    };
    
    if (salesChart && salesData[storeId]) {
        salesChart.data.datasets[0].data = salesData[storeId];
        salesChart.update();
    }
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Sync button
    document.getElementById('sync-button').addEventListener('click', syncWithHQ);
    
    // Add product button
    document.getElementById('add-product-btn').addEventListener('click', openAddProductModal);
    
    // View all alerts
    document.getElementById('view-all-alerts').addEventListener('click', function() {
        showNotification('Opening alerts page...', 'info');
    });
    
    // Product search
    document.getElementById('product-search').addEventListener('input', function(e) {
        searchProducts(e.target.value);
    });
    
    // Category filter
    document.getElementById('category-filter').addEventListener('change', function(e) {
        filterProducts();
    });
    
    // Status filter
    document.getElementById('status-filter').addEventListener('change', function(e) {
        filterProducts();
    });
    
    // Export products
    document.getElementById('export-products-btn').addEventListener('click', exportProducts);
    
    // Import products
    document.getElementById('import-products-btn').addEventListener('click', function() {
        showNotification('Import feature coming soon', 'info');
    });
    
    // Save product in modal
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
    
    // Calculate profit margin
    document.getElementById('productCost').addEventListener('input', calculateMargin);
    document.getElementById('productPrice').addEventListener('input', calculateMargin);
}

// ===== PRODUCT OPERATIONS =====
function openAddProductModal() {
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productMargin').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function editProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productThreshold').value = product.threshold;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productExpiry').value = product.expiry || '';
    
    // Store product ID for update
    document.getElementById('productForm').dataset.productId = productId;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function saveProduct() {
    const form = document.getElementById('productForm');
    const productId = form.dataset.productId;
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        stock: parseInt(document.getElementById('productStock').value),
        threshold: parseInt(document.getElementById('productThreshold').value),
        price: parseFloat(document.getElementById('productPrice').value),
        expiry: document.getElementById('productExpiry').value || null,
        barcode: document.getElementById('productBarcode').value,
        status: 'in-stock'
    };
    
    // Validate
    if (!productData.name || !productData.category || isNaN(productData.stock) || isNaN(productData.price)) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    // Update status based on stock
    if (productData.stock === 0) {
        productData.status = 'out-of-stock';
    } else if (productData.stock < productData.threshold) {
        productData.status = 'low-stock';
    }
    
    if (productId) {
        // Update existing product
        const index = allProducts.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            allProducts[index] = { ...allProducts[index], ...productData };
            showNotification('Product updated successfully', 'success');
        }
    } else {
        // Add new product
        const newId = Math.max(...allProducts.map(p => p.id)) + 1;
        productData.id = newId;
        allProducts.push(productData);
        showNotification('Product added successfully', 'success');
    }
    
    // Update display
    displayProducts(allProducts);
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    
    // Clear form data
    delete form.dataset.productId;
}

function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    const index = allProducts.findIndex(p => p.id === productId);
    if (index !== -1) {
        allProducts.splice(index, 1);
        displayProducts(allProducts);
        showNotification('Product deleted successfully', 'success');
    }
}

function viewProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        alert(`Product Details:\n\nName: ${product.name}\nCategory: ${product.category}\nStock: ${product.stock} units\nPrice: ${product.price} MAD\nStatus: ${getStatusText(product.status)}`);
    }
}

// ===== SEARCH AND FILTER =====
function searchProducts(query) {
    if (!query.trim()) {
        displayProducts(allProducts);
        return;
    }
    
    const filtered = allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filtered);
}

function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const status = document.getElementById('status-filter').value;
    
    let filtered = allProducts;
    
    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }
    
    if (status) {
        filtered = filtered.filter(product => product.status === status);
    }
    
    displayProducts(filtered);
}

// ===== SYNC FUNCTION =====
function syncWithHQ() {
    const syncBtn = document.getElementById('sync-button');
    const originalText = syncBtn.innerHTML;
    
    // Show loading state
    syncBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
    syncBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update local data (simulate getting new data from HQ)
        const store = storeDatabase[currentStore];
        
        // Simulate new alerts
        const newAlert = {
            id: store.alerts.length + 1,
            type: 'system',
            severity: 'low',
            message: 'Sync completed successfully',
            product: 'System',
            date: new Date().toISOString().split('T')[0]
        };
        
        store.alerts.unshift(newAlert);
        
        // Update display
        displayAlerts(store.alerts);
        document.getElementById('alert-count').textContent = store.alerts.length;
        
        // Show success
        showNotification('Synchronization completed successfully', 'success');
        
        // Restore button
        syncBtn.innerHTML = originalText;
        syncBtn.disabled = false;
    }, 1500);
}

// ===== EXPORT FUNCTION =====
function exportProducts() {
    const store = storeDatabase[currentStore];
    const dataStr = JSON.stringify(store.products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `supermaroc_products_${currentStore}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification('Products exported successfully', 'success');
}

// ===== UTILITY FUNCTIONS =====
function calculateMargin() {
    const cost = parseFloat(document.getElementById('productCost').value) || 0;
    const price = parseFloat(document.getElementById('productPrice').value) || 0;
    
    if (cost > 0 && price > 0) {
        const margin = ((price - cost) / cost * 100).toFixed(2);
        document.getElementById('productMargin').value = `${margin}%`;
    } else {
        document.getElementById('productMargin').value = '';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// ===== VIEW STORE INFO MODAL =====
function viewStoreInfo() {
    const store = storeDatabase[currentStore];
    
    document.getElementById('storeModalTitle').textContent = `${store.name} - Information`;
    document.getElementById('store-modal-name').textContent = store.name;
    document.getElementById('store-address').textContent = store.address;
    document.getElementById('store-phone').textContent = store.phone;
    document.getElementById('store-manager-details').textContent = `${store.manager} (${store.managerEmail})`;
    document.getElementById('store-opening').textContent = formatDate(store.openingDate);
    document.getElementById('store-target').textContent = `${store.monthlyTarget.toLocaleString()} MAD`;
    
    const modal = new bootstrap.Modal(document.getElementById('storeInfoModal'));
    modal.show();
}

// Add this to initializeEventListeners if you want a button to view store info
// document.getElementById('view-store-info').addEventListener('click', viewStoreInfo);