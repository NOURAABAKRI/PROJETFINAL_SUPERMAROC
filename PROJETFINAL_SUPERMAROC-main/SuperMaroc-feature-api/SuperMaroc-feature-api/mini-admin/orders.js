// Orders Management JavaScript
class OrdersManager {
    constructor() {
        this.orders = [];
        this.selectedOrders = new Set();
        this.filters = {
            status: 'all',
            type: 'all',
            date: '',
            search: ''
        };
        this.products = [];
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
    }

    loadSampleData() {
        // Sample products
        this.products = [
            { id: 1, name: 'Fresh Milk 1L', category: 'Dairy', price: 8.5, stock: 45 },
            { id: 2, name: 'Whole Wheat Bread', category: 'Bakery', price: 4.2, stock: 12 },
            { id: 3, name: 'Mineral Water 1.5L', category: 'Beverages', price: 5.0, stock: 120 },
            { id: 4, name: 'Yogurt Natural', category: 'Dairy', price: 3.8, stock: 25 },
            { id: 5, name: 'Olive Oil 1L', category: 'Oils', price: 45.0, stock: 18 },
            { id: 6, name: 'Rice 5kg', category: 'Grains', price: 65.0, stock: 30 },
            { id: 7, name: 'Sugar 2kg', category: 'Sweets', price: 18.5, stock: 42 },
            { id: 8, name: 'Tea 500g', category: 'Beverages', price: 25.0, stock: 28 }
        ];

        // Sample orders
        this.orders = [
            {
                id: 'ORD-2024-001',
                customer: 'Ahmed Hassan',
                phone: '+212 612345678',
                email: 'ahmed@example.com',
                type: 'online',
                status: 'processing',
                amount: 450.50,
                createdAt: new Date('2024-11-11 11:30:00').toISOString(),
                deliveryDate: '2024-11-11',
                deliveryTime: 'afternoon',
                paymentMethod: 'card',
                address: '123 Avenue Mohammed V, Agadir',
                items: [
                    { productId: 1, name: 'Fresh Milk 1L', quantity: 2, price: 8.5 },
                    { productId: 2, name: 'Whole Wheat Bread', quantity: 1, price: 4.2 },
                    { productId: 3, name: 'Mineral Water 1.5L', quantity: 3, price: 5.0 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 11:30:00').toISOString(),
                        description: 'Order placed online'
                    },
                    {
                        action: 'confirmed',
                        user: 'Store Manager',
                        timestamp: new Date('2024-11-11 11:35:00').toISOString(),
                        description: 'Order confirmed'
                    }
                ]
            },
            {
                id: 'ORD-2024-002',
                customer: 'Restaurant Al Andalus',
                phone: '+212 52228888',
                email: 'contact@alandalus.ma',
                type: 'phone',
                status: 'confirmed',
                amount: 1200.00,
                createdAt: new Date('2024-11-11 10:15:00').toISOString(),
                deliveryDate: '2024-11-11',
                deliveryTime: 'morning',
                paymentMethod: 'check',
                address: '456 Boulevard Anfa, Casablanca',
                items: [
                    { productId: 5, name: 'Olive Oil 1L', quantity: 5, price: 45.0 },
                    { productId: 6, name: 'Rice 5kg', quantity: 3, price: 65.0 },
                    { productId: 7, name: 'Sugar 2kg', quantity: 2, price: 18.5 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'Bahija',
                        timestamp: new Date('2024-11-11 10:15:00').toISOString(),
                        description: 'Order received by phone'
                    }
                ]
            },
            {
                id: 'ORD-2024-003',
                customer: 'Fatima Zahra',
                phone: '+212 698765432',
                email: 'fatima@example.com',
                type: 'instore',
                status: 'ready',
                amount: 85.00,
                createdAt: new Date('2024-11-11 09:45:00').toISOString(),
                deliveryDate: '2024-11-11',
                deliveryTime: '',
                paymentMethod: 'cash',
                address: 'In-store pickup',
                items: [
                    { productId: 1, name: 'Fresh Milk 1L', quantity: 3, price: 8.5 },
                    { productId: 4, name: 'Yogurt Natural', quantity: 4, price: 3.8 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'Cashier',
                        timestamp: new Date('2024-11-11 09:45:00').toISOString(),
                        description: 'In-store purchase'
                    },
                    {
                        action: 'processing',
                        user: 'Stock Clerk',
                        timestamp: new Date('2024-11-11 09:50:00').toISOString(),
                        description: 'Order being prepared'
                    },
                    {
                        action: 'ready',
                        user: 'Stock Clerk',
                        timestamp: new Date('2024-11-11 10:00:00').toISOString(),
                        description: 'Order ready for pickup'
                    }
                ]
            },
            {
                id: 'ORD-2024-004',
                customer: 'Hotel Medina',
                phone: '+212 52441111',
                email: 'reception@medinahotel.ma',
                type: 'recurring',
                status: 'shipped',
                amount: 2500.00,
                createdAt: new Date('2024-11-10 16:30:00').toISOString(),
                deliveryDate: '2024-11-11',
                deliveryTime: 'morning',
                paymentMethod: 'bank',
                address: '789 Rue de la Koutoubia, Marrakech',
                items: [
                    { productId: 1, name: 'Fresh Milk 1L', quantity: 20, price: 8.5 },
                    { productId: 3, name: 'Mineral Water 1.5L', quantity: 30, price: 5.0 },
                    { productId: 8, name: 'Tea 500g', quantity: 10, price: 25.0 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-10 16:30:00').toISOString(),
                        description: 'Recurring order generated'
                    },
                    {
                        action: 'confirmed',
                        user: 'Store Manager',
                        timestamp: new Date('2024-11-10 16:45:00').toISOString(),
                        description: 'Order confirmed'
                    },
                    {
                        action: 'processing',
                        user: 'Stock Clerk',
                        timestamp: new Date('2024-11-11 08:00:00').toISOString(),
                        description: 'Order being prepared'
                    },
                    {
                        action: 'shipped',
                        user: 'Delivery',
                        timestamp: new Date('2024-11-11 09:30:00').toISOString(),
                        description: 'Order shipped for delivery'
                    }
                ]
            },
            {
                id: 'ORD-2024-005',
                customer: 'Mohamed Ali',
                phone: '+212 622334455',
                email: 'mohamed@example.com',
                type: 'delivery',
                status: 'delivered',
                amount: 320.75,
                createdAt: new Date('2024-11-10 14:20:00').toISOString(),
                deliveryDate: '2024-11-10',
                deliveryTime: 'evening',
                paymentMethod: 'mobile',
                address: '101 Avenue Mohammed VI, Rabat',
                items: [
                    { productId: 2, name: 'Whole Wheat Bread', quantity: 2, price: 4.2 },
                    { productId: 5, name: 'Olive Oil 1L', quantity: 1, price: 45.0 },
                    { productId: 7, name: 'Sugar 2kg', quantity: 3, price: 18.5 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-10 14:20:00').toISOString(),
                        description: 'Order placed online'
                    },
                    {
                        action: 'confirmed',
                        user: 'Store Manager',
                        timestamp: new Date('2024-11-10 14:30:00').toISOString(),
                        description: 'Order confirmed'
                    },
                    {
                        action: 'processing',
                        user: 'Stock Clerk',
                        timestamp: new Date('2024-11-10 15:00:00').toISOString(),
                        description: 'Order being prepared'
                    },
                    {
                        action: 'shipped',
                        user: 'Delivery',
                        timestamp: new Date('2024-11-10 17:00:00').toISOString(),
                        description: 'Order shipped for delivery'
                    },
                    {
                        action: 'delivered',
                        user: 'Delivery',
                        timestamp: new Date('2024-11-10 18:30:00').toISOString(),
                        description: 'Order delivered successfully'
                    }
                ]
            },
            {
                id: 'ORD-2024-006',
                customer: 'Café Central',
                phone: '+212 52336677',
                email: 'cafe@central.ma',
                type: 'phone',
                status: 'new',
                amount: 890.00,
                createdAt: new Date('2024-11-11 08:00:00').toISOString(),
                deliveryDate: '2024-11-11',
                deliveryTime: 'morning',
                paymentMethod: 'cash',
                address: '222 Rue des Cafés, Agadir',
                items: [
                    { productId: 1, name: 'Fresh Milk 1L', quantity: 15, price: 8.5 },
                    { productId: 8, name: 'Tea 500g', quantity: 5, price: 25.0 }
                ],
                timeline: [
                    {
                        action: 'created',
                        user: 'Bahija',
                        timestamp: new Date('2024-11-11 08:00:00').toISOString(),
                        description: 'Order received by phone'
                    }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Create order button
        document.getElementById('createOrderBtn').addEventListener('click', () => {
            this.openCreateOrderModal();
        });

        // Save order button
        document.getElementById('saveOrderBtn').addEventListener('click', () => {
            this.saveOrder();
        });

        // Add product button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.openAddProductModal();
        });

        // Refresh orders
        document.getElementById('refreshOrdersBtn').addEventListener('click', () => {
            this.refreshOrders();
        });

        // Process next order
        document.getElementById('processNextBtn').addEventListener('click', () => {
            this.processNextOrder();
        });

        // Order search
        document.getElementById('orderSearch').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderOrdersList();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderOrdersList();
        });

        // Type filter
        document.getElementById('typeFilter').addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.renderOrdersList();
        });

        // Date filter
        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.filters.date = e.target.value;
            this.renderOrdersList();
        });

        // Select all checkbox
        document.getElementById('selectAllOrders').addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });

        // Export orders
        document.getElementById('exportOrdersBtn').addEventListener('click', () => {
            this.exportOrders();
        });

        // Print invoice
        document.getElementById('printInvoiceBtn').addEventListener('click', () => {
            this.printInvoice();
        });

        // Product search in modal
        document.getElementById('productSearchInput')?.addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Quick actions
        document.getElementById('scanBarcodeBtn').addEventListener('click', () => {
            this.scanBarcode();
        });

        document.getElementById('printQueueBtn').addEventListener('click', () => {
            this.printQueue();
        });
    }

    renderDashboard() {
        this.updateStats();
    }

    updateStats() {
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = this.orders.filter(order => 
            order.createdAt.split('T')[0] === today
        );
        
        const pendingOrders = this.orders.filter(order => 
            ['new', 'confirmed', 'processing'].includes(order.status)
        ).length;
        
        const weeklyRevenue = this.calculateWeeklyRevenue();
        const avgOrderValue = this.calculateAverageOrderValue();
        
        // Update UI
        document.getElementById('ordersToday').textContent = todayOrders.length;
        document.getElementById('ordersTodayAmount').textContent = 
            todayOrders.reduce((sum, order) => sum + order.amount, 0).toFixed(2) + ' MAD';
        
        document.getElementById('pendingOrders').textContent = pendingOrders;
        document.getElementById('avgProcessTime').textContent = '45 min avg';
        
        document.getElementById('weeklyRevenue').textContent = weeklyRevenue.toLocaleString();
        document.getElementById('avgOrderValue').textContent = avgOrderValue.toFixed(0);
        
        // Update status counts
        this.updateStatusCounts();
    }

    updateStatusCounts() {
        const statusCounts = {
            new: this.orders.filter(o => o.status === 'new').length,
            processing: this.orders.filter(o => o.status === 'processing').length,
            ready: this.orders.filter(o => o.status === 'ready').length,
            delivered: this.orders.filter(o => o.status === 'delivered').length
        };
        
        document.getElementById('statusNew').textContent = statusCounts.new;
        document.getElementById('statusProcessing').textContent = statusCounts.processing;
        document.getElementById('statusReady').textContent = statusCounts.ready;
        document.getElementById('statusDelivered').textContent = statusCounts.delivered;
    }

    calculateWeeklyRevenue() {
        // Calculate revenue for current week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return this.orders
            .filter(order => new Date(order.createdAt) >= oneWeekAgo)
            .reduce((sum, order) => sum + order.amount, 0);
    }

    calculateAverageOrderValue() {
        if (this.orders.length === 0) return 0;
        const total = this.orders.reduce((sum, order) => sum + order.amount, 0);
        return total / this.orders.length;
    }

    renderOrdersList() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;

        // Filter orders
        let filteredOrders = this.orders;
        
        if (this.filters.status !== 'all') {
            filteredOrders = filteredOrders.filter(o => o.status === this.filters.status);
        }
        
        if (this.filters.type !== 'all') {
            filteredOrders = filteredOrders.filter(o => o.type === this.filters.type);
        }
        
        if (this.filters.date) {
            filteredOrders = filteredOrders.filter(o => 
                o.createdAt.split('T')[0] === this.filters.date
            );
        }
        
        if (this.filters.search) {
            filteredOrders = filteredOrders.filter(o => 
                o.customer.toLowerCase().includes(this.filters.search) ||
                o.id.toLowerCase().includes(this.filters.search) ||
                o.phone.includes(this.filters.search)
            );
        }

        // Clear table
        tbody.innerHTML = '';

        if (filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-5">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No orders found</h5>
                        <p class="text-muted">Try changing your filters or create a new order</p>
                        <button class="btn btn-yellow mt-2" onclick="ordersManager.openCreateOrderModal()">
                            <i class="fas fa-plus"></i> Create New Order
                        </button>
                    </td>
                </tr>
            `;
        } else {
            // Sort by creation date (newest first)
            filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Render orders
            filteredOrders.forEach(order => {
                const row = this.createOrderRow(order);
                tbody.appendChild(row);
            });
        }

        // Update count
        this.updateOrderCount(filteredOrders.length);
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    createOrderRow(order) {
        const row = document.createElement('tr');
        row.dataset.id = order.id;
        
        const createdAt = this.formatDateTime(order.createdAt);
        const deliveryTime = order.deliveryTime ? this.getDeliveryTimeDisplay(order.deliveryTime) : 'ASAP';
        const isSelected = this.selectedOrders.has(order.id);
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="order-checkbox" 
                       data-id="${order.id}" 
                       ${isSelected ? 'checked' : ''}>
            </td>
            <td>
                <strong class="text-muted">${order.id}</strong>
            </td>
            <td>
                <div class="order-item">
                    <div class="order-item-icon">
                        <i class="fas fa-user text-primary"></i>
                    </div>
                    <div class="order-item-content">
                        <div class="order-item-title">${order.customer}</div>
                        <div class="order-item-description">${order.phone}</div>
                        <div class="order-item-meta">
                            <i class="fas fa-map-marker-alt"></i> ${order.address.substring(0, 30)}${order.address.length > 30 ? '...' : ''}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="order-type type-${order.type}">
                    ${this.getOrderTypeDisplay(order.type)}
                </span>
            </td>
            <td>
                <strong>${order.amount.toFixed(2)} MAD</strong>
                <div class="small text-muted">${order.items.length} items</div>
            </td>
            <td>
                <span class="order-status status-${order.status}">
                    ${this.getOrderStatusDisplay(order.status)}
                </span>
            </td>
            <td>
                <div>${createdAt.split(',')[0]}</div>
                <small class="text-muted">${createdAt.split(',')[1]}</small>
            </td>
            <td>
                <div>${order.deliveryDate || 'Today'}</div>
                <small class="text-muted">${deliveryTime}</small>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-action btn-action-view" 
                            onclick="ordersManager.viewOrder('${order.id}')"
                            title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${order.status === 'new' ? `
                    <button class="btn btn-action btn-action-process" 
                            onclick="ordersManager.confirmOrder('${order.id}')"
                            title="Confirm Order">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    ${order.status === 'confirmed' ? `
                    <button class="btn btn-action btn-action-ready" 
                            onclick="ordersManager.processOrder('${order.id}')"
                            title="Process Order">
                        <i class="fas fa-cogs"></i>
                    </button>
                    ` : ''}
                    ${order.status === 'ready' ? `
                    <button class="btn btn-action btn-action-deliver" 
                            onclick="ordersManager.markAsShipped('${order.id}')"
                            title="Mark as Shipped">
                        <i class="fas fa-shipping-fast"></i>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;

        // Add checkbox event listener
        const checkbox = row.querySelector('.order-checkbox');
        checkbox.addEventListener('change', (e) => {
            this.toggleOrderSelection(order.id, e.target.checked);
        });

        return row;
    }

    renderTimeline() {
        const container = document.getElementById('orderTimeline');
        if (!container) return;

        // Get today's orders sorted by creation time
        const today = new Date().toISOString().split('T')[0];
        const todayOrders = this.orders
            .filter(order => order.createdAt.split('T')[0] === today)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        let html = '';
        todayOrders.forEach(order => {
            const time = this.formatTime(order.createdAt);
            
            html += `
                <div class="timeline-item ${order.status}">
                    <div class="timeline-content">
                        <div class="timeline-title">${order.id} - ${order.customer}</div>
                        <div class="timeline-description">
                            ${order.items.length} items • ${order.amount.toFixed(2)} MAD
                            <br>
                            <span class="order-type type-${order.type}">
                                ${this.getOrderTypeDisplay(order.type)}
                            </span>
                        </div>
                        <div class="timeline-meta">
                            <span><i class="fas fa-clock"></i> ${time}</span>
                            <span class="order-status status-${order.status}">
                                ${this.getOrderStatusDisplay(order.status)}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    updateOrderCount(count) {
        const element = document.getElementById('orderCountText');
        if (element) {
            const total = this.orders.length;
            element.textContent = `Showing ${count} of ${total} orders`;
        }
    }

    openCreateOrderModal() {
        // Reset form
        document.getElementById('orderForm').reset();
        document.getElementById('orderProductsBody').innerHTML = '';
        this.updateOrderSummary();
        
        const modal = new bootstrap.Modal(document.getElementById('createOrderModal'));
        modal.show();
    }

    openAddProductModal() {
        this.renderProductsSelection();
        const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
        modal.show();
    }

    renderProductsSelection() {
        const tbody = document.getElementById('productsSelectionBody');
        if (!tbody) return;

        let html = '';
        this.products.forEach(product => {
            html += `
                <tr>
                    <td>
                        <strong>${product.name}</strong>
                        <div class="small text-muted">${product.category}</div>
                    </td>
                    <td>${product.category}</td>
                    <td>${product.price.toFixed(2)} MAD</td>
                    <td>
                        <span class="${product.stock < 10 ? 'text-danger fw-bold' : 'text-success'}">
                            ${product.stock} units
                        </span>
                    </td>
                    <td>
                        <input type="number" 
                               class="form-control form-control-sm" 
                               value="1" 
                               min="1" 
                               max="${product.stock}"
                               data-product-id="${product.id}"
                               style="width: 80px;">
                    </td>
                    <td>
                        <button class="btn btn-yellow btn-sm" 
                                onclick="ordersManager.addProductToOrder(${product.id})">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    searchProducts(query) {
        const tbody = document.getElementById('productsSelectionBody');
        if (!tbody) return;

        const filteredProducts = query ? 
            this.products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase())
            ) : 
            this.products;

        let html = '';
        filteredProducts.forEach(product => {
            html += `
                <tr>
                    <td>
                        <strong>${product.name}</strong>
                        <div class="small text-muted">${product.category}</div>
                    </td>
                    <td>${product.category}</td>
                    <td>${product.price.toFixed(2)} MAD</td>
                    <td>${product.stock} units</td>
                    <td>
                        <input type="number" 
                               class="form-control form-control-sm" 
                               value="1" 
                               min="1" 
                               max="${product.stock}"
                               data-product-id="${product.id}"
                               style="width: 80px;">
                    </td>
                    <td>
                        <button class="btn btn-yellow btn-sm" 
                                onclick="ordersManager.addProductToOrder(${product.id})">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    }

    addProductToOrder(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
        const quantity = parseInt(quantityInput.value) || 1;

        if (quantity > product.stock) {
            this.showNotification(`Only ${product.stock} units available`, 'error');
            return;
        }

        const tbody = document.getElementById('orderProductsBody');
        const existingRow = tbody.querySelector(`tr[data-product-id="${productId}"]`);
        
        if (existingRow) {
            // Update existing row
            const existingQuantity = parseInt(existingRow.querySelector('.product-quantity-input').value);
            existingRow.querySelector('.product-quantity-input').value = existingQuantity + quantity;
            this.updateProductRow(existingRow, product, existingQuantity + quantity);
        } else {
            // Add new row
            const row = document.createElement('tr');
            row.dataset.productId = productId;
            row.innerHTML = `
                <td>
                    <strong>${product.name}</strong>
                    <div class="small text-muted">${product.category}</div>
                </td>
                <td>
                    <input type="number" 
                           class="form-control form-control-sm product-quantity-input" 
                           value="${quantity}" 
                           min="1" 
                           max="${product.stock}"
                           onchange="ordersManager.updateProductQuantity(${productId}, this.value)">
                </td>
                <td>${product.price.toFixed(2)} MAD</td>
                <td>${(product.price * quantity).toFixed(2)} MAD</td>
                <td>
                    <button class="btn btn-danger btn-sm" 
                            onclick="ordersManager.removeProductFromOrder(${productId})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        }

        this.updateOrderSummary();
        this.showNotification(`${quantity} x ${product.name} added to order`, 'success');
    }

    updateProductQuantity(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const row = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (row) {
            this.updateProductRow(row, product, parseInt(quantity) || 1);
            this.updateOrderSummary();
        }
    }

    updateProductRow(row, product, quantity) {
        const priceCell = row.querySelector('td:nth-child(3)');
        const totalCell = row.querySelector('td:nth-child(4)');
        
        priceCell.textContent = `${product.price.toFixed(2)} MAD`;
        totalCell.textContent = `${(product.price * quantity).toFixed(2)} MAD`;
    }

    removeProductFromOrder(productId) {
        const row = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (row) {
            row.remove();
            this.updateOrderSummary();
        }
    }

    updateOrderSummary() {
        const rows = document.querySelectorAll('#orderProductsBody tr');
        let subtotal = 0;
        
        rows.forEach(row => {
            const totalCell = row.querySelector('td:nth-child(4)');
            const total = parseFloat(totalCell.textContent.replace(' MAD', '')) || 0;
            subtotal += total;
        });
        
        const tax = subtotal * 0.1; // 10% tax
        const discount = 0; // No discount by default
        const total = subtotal + tax - discount;
        
        document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' MAD';
        document.getElementById('tax').textContent = tax.toFixed(2) + ' MAD';
        document.getElementById('discount').textContent = discount.toFixed(2) + ' MAD';
        document.getElementById('totalAmount').innerHTML = `<strong>${total.toFixed(2)} MAD</strong>`;
    }

    saveOrder() {
        const customerName = document.getElementById('customerName').value.trim();
        const orderType = document.getElementById('orderType').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        
        // Validate
        if (!customerName || !orderType || !paymentMethod) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Get products from table
        const products = [];
        const rows = document.querySelectorAll('#orderProductsBody tr');
        
        if (rows.length === 0) {
            this.showNotification('Please add at least one product', 'error');
            return;
        }
        
        rows.forEach(row => {
            const productId = parseInt(row.dataset.productId);
            const product = this.products.find(p => p.id === productId);
            const quantityInput = row.querySelector('.product-quantity-input');
            const quantity = parseInt(quantityInput.value) || 1;
            
            if (product) {
                products.push({
                    productId: product.id,
                    name: product.name,
                    quantity: quantity,
                    price: product.price
                });
            }
        });
        
        // Calculate total
        const total = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Create new order
        const newOrder = {
            id: `ORD-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`,
            customer: customerName,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            type: orderType,
            status: 'new',
            amount: total,
            createdAt: new Date().toISOString(),
            deliveryDate: document.getElementById('deliveryDate').value || new Date().toISOString().split('T')[0],
            deliveryTime: document.getElementById('deliveryTime').value,
            paymentMethod: paymentMethod,
            address: document.getElementById('deliveryAddress').value || 'In-store pickup',
            items: products,
            timeline: [
                {
                    action: 'created',
                    user: 'Current User',
                    timestamp: new Date().toISOString(),
                    description: 'Order created manually'
                }
            ]
        };
        
        // Add to orders array
        this.orders.unshift(newOrder);
        
        // Update UI
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('createOrderModal')).hide();
        
        this.showNotification('Order created successfully', 'success');
    }

    viewOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) {
            this.showNotification('Order not found', 'error');
            return;
        }

        const modalContent = this.createOrderDetails(order);
        document.getElementById('orderDetailsContent').innerHTML = modalContent;
        
        const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        modal.show();
    }

    createOrderDetails(order) {
        const createdAt = this.formatDateTime(order.createdAt);
        const deliveryDate = order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'ASAP';
        
        let itemsHtml = '';
        order.items.forEach(item => {
            itemsHtml += `
                <div class="product-row">
                    <div class="product-info">
                        <strong>${item.name}</strong>
                        <div class="small text-muted">Unit price: ${item.price.toFixed(2)} MAD</div>
                    </div>
                    <div class="product-quantity">${item.quantity}</div>
                    <div class="product-price">${(item.price * item.quantity).toFixed(2)} MAD</div>
                </div>
            `;
        });
        
        let timelineHtml = '';
        if (order.timeline && order.timeline.length > 0) {
            timelineHtml = `
                <div class="mt-4">
                    <h6><i class="fas fa-history"></i> Order Timeline</h6>
                    <div class="timeline">
                        ${order.timeline.map(step => `
                            <div class="timeline-item">
                                <div class="timeline-content">
                                    <div class="timeline-title">${this.getTimelineActionName(step.action)}</div>
                                    <div class="timeline-description">${step.description}</div>
                                    <div class="timeline-meta">
                                        <span><i class="fas fa-user"></i> ${step.user}</span>
                                        <span><i class="fas fa-clock"></i> ${this.formatDateTime(step.timestamp)}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return `
            <div class="order-details-container">
                <div class="order-details-header">
                    <div class="order-details-title">Order ${order.id}</div>
                    <div class="order-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Customer</span>
                            <span class="meta-value">${order.customer}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Phone</span>
                            <span class="meta-value">${order.phone}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Email</span>
                            <span class="meta-value">${order.email || 'N/A'}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Order Type</span>
                            <span class="meta-value">
                                <span class="order-type type-${order.type}">
                                    ${this.getOrderTypeDisplay(order.type)}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div class="order-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Status</span>
                            <span class="meta-value">
                                <span class="order-status status-${order.status}">
                                    ${this.getOrderStatusDisplay(order.status)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Payment Method</span>
                            <span class="meta-value">${this.getPaymentMethodDisplay(order.paymentMethod)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Created</span>
                            <span class="meta-value">${createdAt}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Delivery</span>
                            <span class="meta-value">${deliveryDate} ${order.deliveryTime ? '(' + this.getDeliveryTimeDisplay(order.deliveryTime) + ')' : ''}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-details-products">
                    <h6><i class="fas fa-boxes"></i> Order Items</h6>
                    ${itemsHtml}
                    
                    <div class="product-row total mt-3 pt-3 border-top">
                        <div class="product-info">
                            <strong>Total Amount</strong>
                        </div>
                        <div class="product-quantity"></div>
                        <div class="product-price">
                            <strong>${order.amount.toFixed(2)} MAD</strong>
                        </div>
                    </div>
                </div>
                
                <div class="mt-3">
                    <h6><i class="fas fa-map-marker-alt"></i> Delivery Address</h6>
                    <p>${order.address}</p>
                </div>
                
                ${timelineHtml}
            </div>
        `;
    }

    confirmOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        if (order.status !== 'new') {
            this.showNotification('Order already confirmed', 'warning');
            return;
        }

        // Update order
        order.status = 'confirmed';
        order.updatedAt = new Date().toISOString();
        
        // Add to timeline
        order.timeline.push({
            action: 'confirmed',
            user: 'Current User',
            timestamp: new Date().toISOString(),
            description: 'Order confirmed'
        });

        // Update UI
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
        
        this.showNotification(`Order ${orderId} confirmed`, 'success');
    }

    processOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        if (order.status !== 'confirmed') {
            this.showNotification('Order must be confirmed first', 'warning');
            return;
        }

        // Update order
        order.status = 'processing';
        order.updatedAt = new Date().toISOString();
        
        // Add to timeline
        order.timeline.push({
            action: 'processing',
            user: 'Current User',
            timestamp: new Date().toISOString(),
            description: 'Order processing started'
        });

        // Update UI
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
        
        this.showNotification(`Order ${orderId} is now processing`, 'success');
    }

    markAsShipped(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        if (order.status !== 'ready') {
            this.showNotification('Order must be ready first', 'warning');
            return;
        }

        // Update order
        order.status = 'shipped';
        order.updatedAt = new Date().toISOString();
        
        // Add to timeline
        order.timeline.push({
            action: 'shipped',
            user: 'Current User',
            timestamp: new Date().toISOString(),
            description: 'Order shipped for delivery'
        });

        // Update UI
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
        
        this.showNotification(`Order ${orderId} marked as shipped`, 'success');
    }

    processNextOrder() {
        // Find next new order to process
        const nextOrder = this.orders.find(o => o.status === 'new');
        
        if (nextOrder) {
            this.confirmOrder(nextOrder.id);
            this.showNotification(`Processing order ${nextOrder.id}`, 'info');
        } else {
            this.showNotification('No new orders to process', 'info');
        }
    }

    scanBarcode() {
        // Simulate barcode scanning
        this.showNotification('Scan barcode feature would open camera here', 'info');
        
        // For demo purposes, add a random product
        const randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
        setTimeout(() => {
            this.addProductToOrder(randomProduct.id);
        }, 1000);
    }

    printQueue() {
        // Get pending orders
        const pendingOrders = this.orders.filter(o => 
            ['new', 'confirmed', 'processing'].includes(o.status)
        );
        
        if (pendingOrders.length === 0) {
            this.showNotification('No orders in queue to print', 'info');
            return;
        }
        
        // Simulate printing
        this.showNotification(`Printing ${pendingOrders.length} order(s) in queue`, 'success');
    }

    toggleOrderSelection(orderId, selected) {
        if (selected) {
            this.selectedOrders.add(orderId);
        } else {
            this.selectedOrders.delete(orderId);
        }
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    toggleSelectAll(selectAll) {
        const checkboxes = document.querySelectorAll('.order-checkbox');
        const visibleOrders = Array.from(document.querySelectorAll('#ordersTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (selectAll) {
            visibleOrders.forEach(id => this.selectedOrders.add(id));
            checkboxes.forEach(cb => cb.checked = true);
        } else {
            visibleOrders.forEach(id => this.selectedOrders.delete(id));
            checkboxes.forEach(cb => cb.checked = false);
        }
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('selectAllOrders');
        if (!selectAllCheckbox) return;
        
        const visibleOrders = Array.from(document.querySelectorAll('#ordersTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (visibleOrders.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.disabled = true;
            return;
        }
        
        selectAllCheckbox.disabled = false;
        const allSelected = visibleOrders.every(id => this.selectedOrders.has(id));
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = !allSelected && visibleOrders.some(id => this.selectedOrders.has(id));
    }

    refreshOrders() {
        // In a real app, this would fetch new data from server
        this.renderDashboard();
        this.renderOrdersList();
        this.renderTimeline();
        
        this.showNotification('Orders refreshed', 'info');
    }

    exportOrders() {
        // Get selected orders or all if none selected
        const ordersToExport = this.selectedOrders.size > 0
            ? this.orders.filter(o => this.selectedOrders.has(o.id))
            : this.orders;
        
        if (ordersToExport.length === 0) {
            this.showNotification('No orders to export', 'warning');
            return;
        }
        
        // Prepare CSV data
        const headers = ['Order ID', 'Customer', 'Type', 'Status', 'Amount', 'Created', 'Delivery Date', 'Payment Method'];
        const csvData = ordersToExport.map(order => [
            order.id,
            order.customer,
            this.getOrderTypeDisplay(order.type),
            this.getOrderStatusDisplay(order.status),
            order.amount.toFixed(2),
            this.formatDateTime(order.createdAt),
            order.deliveryDate,
            this.getPaymentMethodDisplay(order.paymentMethod)
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        // Download CSV
        this.downloadFile(csvContent, `orders_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
        
        this.showNotification(`${ordersToExport.length} orders exported to CSV`, 'success');
    }

    printInvoice() {
        const modal = document.getElementById('orderDetailsModal');
        const orderId = modal.dataset.orderId;
        
        if (orderId) {
            this.showNotification(`Printing invoice for order ${orderId}`, 'success');
        }
    }

    // Utility Methods
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getOrderTypeDisplay(type) {
        const types = {
            'online': 'Online',
            'instore': 'In-Store',
            'phone': 'Phone',
            'delivery': 'Delivery',
            'pickup': 'Pickup',
            'recurring': 'Recurring'
        };
        return types[type] || type;
    }

    getOrderStatusDisplay(status) {
        const statuses = {
            'new': 'New',
            'confirmed': 'Confirmed',
            'processing': 'Processing',
            'ready': 'Ready',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled',
            'refunded': 'Refunded'
        };
        return statuses[status] || status;
    }

    getPaymentMethodDisplay(method) {
        const methods = {
            'cash': 'Cash',
            'card': 'Credit Card',
            'check': 'Check',
            'mobile': 'Mobile Payment',
            'bank': 'Bank Transfer'
        };
        return methods[method] || method;
    }

    getDeliveryTimeDisplay(time) {
        const times = {
            'morning': 'Morning (9AM-12PM)',
            'afternoon': 'Afternoon (1PM-5PM)',
            'evening': 'Evening (6PM-9PM)'
        };
        return times[time] || time;
    }

    getTimelineActionName(action) {
        const actions = {
            'created': 'Order Created',
            'confirmed': 'Order Confirmed',
            'processing': 'Processing Started',
            'ready': 'Order Ready',
            'shipped': 'Order Shipped',
            'delivered': 'Order Delivered'
        };
        return actions[action] || action;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        // Create notification container if it doesn't exist
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize Orders Manager
let ordersManager;

document.addEventListener('DOMContentLoaded', function() {
    ordersManager = new OrdersManager();
    window.ordersManager = ordersManager;
});