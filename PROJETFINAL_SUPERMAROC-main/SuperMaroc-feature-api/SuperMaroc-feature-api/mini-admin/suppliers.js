// Suppliers Management JavaScript
class SuppliersManager {
    constructor() {
        this.suppliers = [];
        this.selectedSuppliers = new Set();
        this.filters = {
            category: 'all',
            status: 'all',
            rating: '',
            search: ''
        };
        this.sampleProducts = [];
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderSuppliersList();
        this.renderTimeline();
    }

    loadSampleData() {
        // Sample products for ordering
        this.sampleProducts = [
            { id: 1, name: 'Fresh Milk 1L', category: 'Dairy', price: 7.5, stock: 45, supplier: 'SUP-001' },
            { id: 2, name: 'Whole Wheat Bread', category: 'Bakery', price: 3.8, stock: 12, supplier: 'SUP-001' },
            { id: 3, name: 'Mineral Water 1.5L', category: 'Beverages', price: 4.5, stock: 120, supplier: 'SUP-002' },
            { id: 4, name: 'Olive Oil 1L', category: 'Oils', price: 42.0, stock: 18, supplier: 'SUP-001' },
            { id: 5, name: 'Rice 5kg', category: 'Grains', price: 60.0, stock: 30, supplier: 'SUP-003' },
            { id: 6, name: 'Sugar 2kg', category: 'Sweets', price: 17.5, stock: 42, supplier: 'SUP-003' },
            { id: 7, name: 'Tea 500g', category: 'Beverages', price: 23.0, stock: 28, supplier: 'SUP-002' }
        ];

        // Sample suppliers
        this.suppliers = [
            {
                id: 'SUP-001',
                name: 'Fresh Foods Co.',
                category: 'fresh',
                taxId: '123456789',
                address: 'Zone Industrielle, Agadir',
                primaryContact: 'Ali Hassan',
                primaryPhone: '+212 612345678',
                primaryEmail: 'ali@freshfoods.ma',
                secondaryContact: 'Fatima Zahra',
                secondaryPhone: '+212 52228888',
                status: 'preferred',
                rating: 4.8,
                paymentTerms: '30 days',
                creditLimit: 50000,
                discount: 5,
                bankName: 'BMCE',
                bankAccount: '123-456-789',
                certifications: 'ISO9001, HACCP, Organic',
                notes: 'Preferred supplier for fresh products. Excellent quality.',
                createdAt: '2020-03-15',
                performance: {
                    onTimeDelivery: 95,
                    qualityScore: 96,
                    responseTime: '2h',
                    totalOrders: 245,
                    totalAmount: 1250000
                },
                lastOrder: '2024-11-11',
                products: ['Fresh Milk', 'Whole Wheat Bread', 'Olive Oil', 'Yogurt', 'Cheese']
            },
            {
                id: 'SUP-002',
                name: 'BevCorp Morocco',
                category: 'beverages',
                taxId: '987654321',
                address: 'Boulevard Anfa, Casablanca',
                primaryContact: 'Ahmed Benani',
                primaryPhone: '+212 622334455',
                primaryEmail: 'ahmed@bevcorp.ma',
                secondaryContact: 'Samira Alaoui',
                secondaryPhone: '+212 52336677',
                status: 'active',
                rating: 4.2,
                paymentTerms: '15 days',
                creditLimit: 30000,
                discount: 3,
                bankName: 'Attijariwafa Bank',
                bankAccount: '987-654-321',
                certifications: 'ISO22000, FDA',
                notes: 'Main beverages supplier. Good prices.',
                createdAt: '2019-07-20',
                performance: {
                    onTimeDelivery: 88,
                    qualityScore: 90,
                    responseTime: '4h',
                    totalOrders: 189,
                    totalAmount: 890000
                },
                lastOrder: '2024-11-10',
                products: ['Mineral Water', 'Tea', 'Coffee', 'Juices', 'Sodas']
            },
            {
                id: 'SUP-003',
                name: 'Moroccan Grains Ltd.',
                category: 'dry',
                taxId: '456789123',
                address: 'Route de Marrakech, Safi',
                primaryContact: 'Karim Alami',
                primaryPhone: '+212 633445566',
                primaryEmail: 'karim@grains.ma',
                secondaryContact: 'Leila Bennani',
                secondaryPhone: '+212 52447788',
                status: 'active',
                rating: 4.0,
                paymentTerms: '30 days',
                creditLimit: 40000,
                discount: 4,
                bankName: 'CIH Bank',
                bankAccount: '456-789-123',
                certifications: 'ISO9001',
                notes: 'Reliable for dry goods. Competitive prices.',
                createdAt: '2021-01-10',
                performance: {
                    onTimeDelivery: 92,
                    qualityScore: 94,
                    responseTime: '6h',
                    totalOrders: 156,
                    totalAmount: 760000
                },
                lastOrder: '2024-11-09',
                products: ['Rice', 'Sugar', 'Flour', 'Pasta', 'Couscous']
            },
            {
                id: 'SUP-004',
                name: 'CleanPro Hygiene',
                category: 'hygiene',
                taxId: '789123456',
                address: 'Avenue Hassan II, Rabat',
                primaryContact: 'Nadia El Fassi',
                primaryPhone: '+212 644556677',
                primaryEmail: 'nadia@cleanpro.ma',
                secondaryContact: 'Youssef Rachidi',
                secondaryPhone: '+212 53779900',
                status: 'active',
                rating: 3.8,
                paymentTerms: 'Cash on delivery',
                creditLimit: 20000,
                discount: 2,
                bankName: 'Banque Populaire',
                bankAccount: '789-123-456',
                certifications: 'CE, FDA',
                notes: 'New supplier. Needs monitoring.',
                createdAt: '2022-05-30',
                performance: {
                    onTimeDelivery: 85,
                    qualityScore: 88,
                    responseTime: '8h',
                    totalOrders: 78,
                    totalAmount: 320000
                },
                lastOrder: '2024-11-08',
                products: ['Soap', 'Shampoo', 'Detergent', 'Disinfectant', 'Paper Products']
            },
            {
                id: 'SUP-005',
                name: 'Equipment Solutions SARL',
                category: 'equipment',
                taxId: '321654987',
                address: 'Industrial Zone, Tangier',
                primaryContact: 'Omar Berrada',
                primaryPhone: '+212 655667788',
                primaryEmail: 'omar@equipments.ma',
                secondaryContact: 'Hassan Cherkaoui',
                secondaryPhone: '+212 53990011',
                status: 'pending',
                rating: 0,
                paymentTerms: 'Advance payment',
                creditLimit: 10000,
                discount: 0,
                bankName: 'Société Générale',
                bankAccount: '321-654-987',
                certifications: 'CE, ISO13485',
                notes: 'New equipment supplier. Under evaluation.',
                createdAt: '2024-10-15',
                performance: {
                    onTimeDelivery: 0,
                    qualityScore: 0,
                    responseTime: '24h',
                    totalOrders: 0,
                    totalAmount: 0
                },
                lastOrder: null,
                products: ['Shelving', 'Refrigerators', 'POS Systems', 'Security Equipment']
            },
            {
                id: 'SUP-006',
                name: 'ServicePlus Maintenance',
                category: 'services',
                taxId: '654987321',
                address: 'Rue des Orangers, Marrakech',
                primaryContact: 'Rachid Bouzidi',
                primaryPhone: '+212 666778899',
                primaryEmail: 'rachid@serviceplus.ma',
                secondaryContact: 'Khadija Mansouri',
                secondaryPhone: '+212 52443322',
                status: 'active',
                rating: 4.5,
                paymentTerms: 'Monthly invoice',
                creditLimit: 0,
                discount: 0,
                bankName: 'BMCI',
                bankAccount: '654-987-321',
                certifications: 'ISO9001, Safety Certified',
                notes: 'Excellent maintenance services.',
                createdAt: '2020-08-22',
                performance: {
                    onTimeDelivery: 98,
                    qualityScore: 95,
                    responseTime: '1h',
                    totalOrders: 112,
                    totalAmount: 450000
                },
                lastOrder: '2024-11-07',
                products: ['Maintenance', 'Repairs', 'Installation', 'Technical Support']
            }
        ];
    }

    setupEventListeners() {
        // Create supplier button
        document.getElementById('createSupplierBtn').addEventListener('click', () => {
            this.openCreateSupplierModal();
        });

        // Save supplier button
        document.getElementById('saveSupplierBtn').addEventListener('click', () => {
            this.saveSupplier();
        });

        // Place order button
        document.getElementById('placeOrderBtn').addEventListener('click', () => {
            this.openPlaceOrderModal();
        });

        // Check invoices button
        document.getElementById('checkInvoicesBtn').addEventListener('click', () => {
            this.showNotification('Invoices feature coming soon', 'info');
        });

        // Evaluate suppliers button
        document.getElementById('evaluateSuppliersBtn').addEventListener('click', () => {
            this.openEvaluateSupplierModal();
        });

        // Refresh suppliers
        document.getElementById('refreshSuppliersBtn').addEventListener('click', () => {
            this.refreshSuppliers();
        });

        // Supplier search
        document.getElementById('supplierSearch').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderSuppliersList();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.renderSuppliersList();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderSuppliersList();
        });

        // Rating filter
        document.getElementById('ratingFilter').addEventListener('change', (e) => {
            this.filters.rating = e.target.value;
            this.renderSuppliersList();
        });

        // Select all checkbox
        document.getElementById('selectAllSuppliers').addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });

        // Export suppliers
        document.getElementById('exportSuppliersBtn').addEventListener('click', () => {
            this.exportSuppliers();
        });

        // Rating stars
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('rating-stars') || e.target.classList.contains('fa-star')) {
                this.handleStarRating(e);
            }
        });

        // Submit evaluation
        document.getElementById('submitEvaluationBtn')?.addEventListener('click', () => {
            this.submitEvaluation();
        });

        // Submit order
        document.getElementById('submitOrderBtn')?.addEventListener('click', () => {
            this.submitOrder();
        });

        // Add product to order
        document.getElementById('addProductToOrderBtn')?.addEventListener('click', () => {
            this.addProductToOrder();
        });
    }

    renderDashboard() {
        this.updateStats();
    }

    updateStats() {
        const activeSuppliers = this.suppliers.filter(s => s.status === 'active' || s.status === 'preferred').length;
        const categories = [...new Set(this.suppliers.map(s => s.category))].length;
        const pendingOrders = 12; // This would come from orders data
        const onTimeDelivery = this.calculateAverageOnTimeDelivery();
        const topSupplier = this.getTopSupplier();
        
        // Update category counts
        const freshCount = this.suppliers.filter(s => s.category === 'fresh').length;
        const dryCount = this.suppliers.filter(s => s.category === 'dry').length;
        const beveragesCount = this.suppliers.filter(s => s.category === 'beverages').length;
        const hygieneCount = this.suppliers.filter(s => s.category === 'hygiene').length;
        
        // Update UI
        document.getElementById('activeSuppliers').textContent = activeSuppliers;
        document.getElementById('supplierCategories').textContent = `${categories} categories`;
        
        document.getElementById('pendingSupplierOrders').textContent = pendingOrders;
        document.getElementById('pendingAmount').textContent = '45,800 MAD';
        
        document.getElementById('onTimeDelivery').textContent = `${onTimeDelivery}%`;
        
        document.getElementById('topSupplierName').textContent = topSupplier.name;
        
        // Update category counts
        document.getElementById('categoryFresh').textContent = freshCount;
        document.getElementById('categoryDry').textContent = dryCount;
        document.getElementById('categoryBeverages').textContent = beveragesCount;
        document.getElementById('categoryHygiene').textContent = hygieneCount;
    }

    calculateAverageOnTimeDelivery() {
        const activeSuppliers = this.suppliers.filter(s => s.status === 'active' || s.status === 'preferred');
        if (activeSuppliers.length === 0) return 0;
        
        const totalOnTime = activeSuppliers.reduce((sum, supplier) => 
            sum + (supplier.performance?.onTimeDelivery || 0), 0);
        
        return Math.round(totalOnTime / activeSuppliers.length);
    }

    getTopSupplier() {
        // Find supplier with highest rating and good performance
        return this.suppliers.reduce((top, supplier) => {
            if (supplier.status === 'active' || supplier.status === 'preferred') {
                const score = (supplier.rating || 0) * 20 + (supplier.performance?.onTimeDelivery || 0);
                const topScore = (top.rating || 0) * 20 + (top.performance?.onTimeDelivery || 0);
                return score > topScore ? supplier : top;
            }
            return top;
        }, this.suppliers[0] || { name: 'None', rating: 0 });
    }

    renderSuppliersList() {
        const tbody = document.getElementById('suppliersTableBody');
        if (!tbody) return;

        // Filter suppliers
        let filteredSuppliers = this.suppliers;
        
        if (this.filters.category !== 'all') {
            filteredSuppliers = filteredSuppliers.filter(s => s.category === this.filters.category);
        }
        
        if (this.filters.status !== 'all') {
            filteredSuppliers = filteredSuppliers.filter(s => s.status === this.filters.status);
        }
        
        if (this.filters.rating) {
            const minRating = parseInt(this.filters.rating);
            filteredSuppliers = filteredSuppliers.filter(s => s.rating >= minRating);
        }
        
        if (this.filters.search) {
            filteredSuppliers = filteredSuppliers.filter(s => 
                s.name.toLowerCase().includes(this.filters.search) ||
                s.id.toLowerCase().includes(this.filters.search) ||
                s.primaryContact.toLowerCase().includes(this.filters.search) ||
                s.primaryPhone.includes(this.filters.search)
            );
        }

        // Clear table
        tbody.innerHTML = '';

        if (filteredSuppliers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-5">
                        <i class="fas fa-truck fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No suppliers found</h5>
                        <p class="text-muted">Try changing your filters or add a new supplier</p>
                        <button class="btn btn-yellow mt-2" onclick="suppliersManager.openCreateSupplierModal()">
                            <i class="fas fa-plus"></i> Add New Supplier
                        </button>
                    </td>
                </tr>
            `;
        } else {
            // Sort by status (preferred first, then active, etc.)
            const statusOrder = { preferred: 0, active: 1, pending: 2, inactive: 3, blocked: 4 };
            filteredSuppliers.sort((a, b) => {
                if (statusOrder[a.status] !== statusOrder[b.status]) {
                    return statusOrder[a.status] - statusOrder[b.status];
                }
                return (b.rating || 0) - (a.rating || 0);
            });

            // Render suppliers
            filteredSuppliers.forEach(supplier => {
                const row = this.createSupplierRow(supplier);
                tbody.appendChild(row);
            });
        }

        // Update count
        this.updateSupplierCount(filteredSuppliers.length);
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    createSupplierRow(supplier) {
        const row = document.createElement('tr');
        row.dataset.id = supplier.id;
        
        const performance = this.getPerformanceBadge(supplier.performance?.onTimeDelivery);
        const isSelected = this.selectedSuppliers.has(supplier.id);
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="supplier-checkbox" 
                       data-id="${supplier.id}" 
                       ${isSelected ? 'checked' : ''}>
            </td>
            <td>
                <strong class="text-muted">${supplier.id}</strong>
            </td>
            <td>
                <div class="supplier-item">
                    <div class="supplier-item-icon">
                        <i class="fas fa-truck text-primary"></i>
                    </div>
                    <div class="supplier-item-content">
                        <div class="supplier-item-title">${supplier.name}</div>
                        <div class="supplier-item-description">
                            <i class="fas fa-user"></i> ${supplier.primaryContact}
                        </div>
                        <div class="supplier-item-meta">
                            <i class="fas fa-star text-warning"></i> ${supplier.rating ? supplier.rating.toFixed(1) : 'N/A'}
                            <i class="fas fa-phone ms-2"></i> ${supplier.primaryPhone}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="category-badge category-${supplier.category}">
                    ${this.getCategoryDisplayName(supplier.category)}
                </span>
            </td>
            <td>
                <div>${supplier.primaryContact}</div>
                <small class="text-muted">${supplier.primaryPhone}</small>
            </td>
            <td>
                <span class="performance-badge ${performance.class}">
                    ${performance.text}
                </span>
                <div class="small text-muted mt-1">${supplier.performance?.onTimeDelivery || 0}% on-time</div>
            </td>
            <td>
                <div>${supplier.lastOrder ? this.formatDate(supplier.lastOrder) : 'No orders'}</div>
                <small class="text-muted">${supplier.performance?.totalOrders || 0} total orders</small>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-action btn-action-view" 
                            onclick="suppliersManager.viewSupplier('${supplier.id}')"
                            title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-action-edit" 
                            onclick="suppliersManager.editSupplier('${supplier.id}')"
                            title="Edit Supplier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-action btn-action-order" 
                            onclick="suppliersManager.placeOrderForSupplier('${supplier.id}')"
                            title="Place Order">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </td>
        `;

        // Add checkbox event listener
        const checkbox = row.querySelector('.supplier-checkbox');
        checkbox.addEventListener('change', (e) => {
            this.toggleSupplierSelection(supplier.id, e.target.checked);
        });

        return row;
    }

    renderTimeline() {
        const container = document.getElementById('supplierTimeline');
        if (!container) return;

        // Get recent activity (this would come from orders/activities data)
        const recentActivity = [
            {
                type: 'order',
                title: 'New Order Placed',
                description: 'Order ORD-2024-012 placed with Fresh Foods Co.',
                time: '2 hours ago',
                supplier: 'Fresh Foods Co.'
            },
            {
                type: 'delivery',
                title: 'Delivery Received',
                description: 'Delivery from Moroccan Grains Ltd. received and verified',
                time: '5 hours ago',
                supplier: 'Moroccan Grains Ltd.'
            },
            {
                type: 'payment',
                title: 'Invoice Paid',
                description: 'Invoice #INV-2024-045 paid to BevCorp Morocco',
                time: '1 day ago',
                supplier: 'BevCorp Morocco'
            },
            {
                type: 'evaluation',
                title: 'Supplier Evaluated',
                description: 'Monthly evaluation completed for CleanPro Hygiene',
                time: '2 days ago',
                supplier: 'CleanPro Hygiene'
            }
        ];

        let html = '';
        recentActivity.forEach(activity => {
            html += `
                <div class="timeline-item ${activity.type}">
                    <div class="timeline-content">
                        <div class="timeline-title">${activity.title}</div>
                        <div class="timeline-description">${activity.description}</div>
                        <div class="timeline-meta">
                            <span><i class="fas fa-truck"></i> ${activity.supplier}</span>
                            <span>${activity.time}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    updateSupplierCount(count) {
        const element = document.getElementById('supplierCountText');
        if (element) {
            const total = this.suppliers.length;
            element.textContent = `Showing ${count} of ${total} suppliers`;
        }
    }

    openCreateSupplierModal() {
        // Reset form
        document.getElementById('supplierForm').reset();
        
        const modal = new bootstrap.Modal(document.getElementById('createSupplierModal'));
        modal.show();
    }

    saveSupplier() {
        const name = document.getElementById('supplierName').value.trim();
        const category = document.getElementById('supplierCategory').value;
        const primaryContact = document.getElementById('primaryContact').value.trim();
        const primaryPhone = document.getElementById('primaryPhone').value.trim();
        const primaryEmail = document.getElementById('primaryEmail').value.trim();
        
        // Validate
        if (!name || !category || !primaryContact || !primaryPhone || !primaryEmail) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Create new supplier
        const newSupplier = {
            id: `SUP-${new Date().getFullYear()}-${String(this.suppliers.length + 1).padStart(3, '0')}`,
            name,
            category,
            taxId: document.getElementById('taxId').value,
            address: document.getElementById('companyAddress').value,
            primaryContact,
            primaryPhone,
            primaryEmail,
            secondaryContact: document.getElementById('secondaryContact').value,
            secondaryPhone: document.getElementById('secondaryPhone').value,
            status: document.getElementById('supplierStatus').value,
            rating: 0,
            paymentTerms: document.getElementById('paymentTerms').value,
            creditLimit: parseFloat(document.getElementById('creditLimit').value) || 0,
            discount: parseFloat(document.getElementById('discount').value) || 0,
            bankName: document.getElementById('bankName').value,
            bankAccount: document.getElementById('bankAccount').value,
            certifications: document.getElementById('certifications').value,
            notes: document.getElementById('supplierNotes').value,
            createdAt: new Date().toISOString().split('T')[0],
            performance: {
                onTimeDelivery: 0,
                qualityScore: 0,
                responseTime: '24h',
                totalOrders: 0,
                totalAmount: 0
            },
            lastOrder: null,
            products: []
        };
        
        // Add to suppliers array
        this.suppliers.unshift(newSupplier);
        
        // Update UI
        this.renderDashboard();
        this.renderSuppliersList();
        this.renderTimeline();
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('createSupplierModal')).hide();
        
        this.showNotification('Supplier created successfully', 'success');
    }

    viewSupplier(supplierId) {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) {
            this.showNotification('Supplier not found', 'error');
            return;
        }

        const modalContent = this.createSupplierDetails(supplier);
        document.getElementById('supplierDetailsContent').innerHTML = modalContent;
        
        const modal = new bootstrap.Modal(document.getElementById('supplierDetailsModal'));
        modal.show();
    }

    createSupplierDetails(supplier) {
        const statusDisplay = this.getStatusDisplayName(supplier.status);
        const categoryDisplay = this.getCategoryDisplayName(supplier.category);
        const ratingStars = this.generateStarRating(supplier.rating);
        
        return `
            <div class="supplier-details-container">
                <div class="supplier-details-header">
                    <div class="supplier-details-title">
                        ${supplier.name}
                        <span class="supplier-status status-${supplier.status} ms-2">
                            ${statusDisplay}
                        </span>
                    </div>
                    <div class="supplier-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Supplier ID</span>
                            <span class="meta-value">${supplier.id}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span class="meta-value">
                                <span class="category-badge category-${supplier.category}">
                                    ${categoryDisplay}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Rating</span>
                            <span class="meta-value">
                                ${ratingStars}
                                <span class="ms-1">${supplier.rating.toFixed(1)}/5</span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Since</span>
                            <span class="meta-value">${supplier.createdAt}</span>
                        </div>
                    </div>
                </div>
                
                <div class="supplier-stats">
                    <div class="stat-item">
                        <div class="stat-value">${supplier.performance.onTimeDelivery}%</div>
                        <div class="stat-label">On-Time Delivery</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${supplier.performance.qualityScore}%</div>
                        <div class="stat-label">Quality Score</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${supplier.performance.totalOrders}</div>
                        <div class="stat-label">Total Orders</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${this.formatCurrency(supplier.performance.totalAmount)}</div>
                        <div class="stat-label">Total Amount</div>
                    </div>
                </div>
                
                <div class="supplier-tabs">
                    <ul class="nav nav-tabs" id="supplierTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#info" type="button">
                                <i class="fas fa-info-circle"></i> Information
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#financial" type="button">
                                <i class="fas fa-money-bill-wave"></i> Financial
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#products" type="button">
                                <i class="fas fa-boxes"></i> Products
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#history" type="button">
                                <i class="fas fa-history"></i> Order History
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content" id="supplierTabContent">
                        <!-- Information Tab -->
                        <div class="tab-pane fade show active" id="info">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6><i class="fas fa-user-tie"></i> Contact Information</h6>
                                    <div class="mb-3">
                                        <strong>Primary Contact:</strong><br>
                                        ${supplier.primaryContact}<br>
                                        ${supplier.primaryPhone}<br>
                                        ${supplier.primaryEmail}
                                    </div>
                                    ${supplier.secondaryContact ? `
                                    <div class="mb-3">
                                        <strong>Secondary Contact:</strong><br>
                                        ${supplier.secondaryContact}<br>
                                        ${supplier.secondaryPhone}
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="col-md-6">
                                    <h6><i class="fas fa-map-marker-alt"></i> Company Information</h6>
                                    <div class="mb-3">
                                        <strong>Address:</strong><br>
                                        ${supplier.address || 'Not specified'}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Tax ID:</strong> ${supplier.taxId || 'Not specified'}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Certifications:</strong><br>
                                        ${supplier.certifications || 'None'}
                                    </div>
                                </div>
                            </div>
                            ${supplier.notes ? `
                            <div class="mt-3">
                                <h6><i class="fas fa-file-alt"></i> Notes</h6>
                                <p>${supplier.notes}</p>
                            </div>
                            ` : ''}
                        </div>
                        
                        <!-- Financial Tab -->
                        <div class="tab-pane fade" id="financial">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <strong>Payment Terms:</strong> ${supplier.paymentTerms}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Credit Limit:</strong> ${this.formatCurrency(supplier.creditLimit)}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Discount:</strong> ${supplier.discount}%
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <strong>Bank Name:</strong> ${supplier.bankName || 'Not specified'}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Bank Account:</strong> ${supplier.bankAccount || 'Not specified'}
                                    </div>
                                    <div class="mb-3">
                                        <strong>Last Order:</strong> ${supplier.lastOrder ? this.formatDate(supplier.lastOrder) : 'No orders yet'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Products Tab -->
                        <div class="tab-pane fade" id="products">
                            <h6>Supplied Products</h6>
                            ${supplier.products && supplier.products.length > 0 ? `
                            <ul class="list-group">
                                ${supplier.products.map(product => `<li class="list-group-item">${product}</li>`).join('')}
                            </ul>
                            ` : '<p class="text-muted">No products listed</p>'}
                            
                            <h6 class="mt-4">Related Products in Stock</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Current Stock</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.sampleProducts
                                            .filter(p => p.supplier === supplier.id)
                                            .map(product => `
                                                <tr>
                                                    <td>${product.name}</td>
                                                    <td>${product.category}</td>
                                                    <td>${product.stock} units</td>
                                                    <td>${product.price.toFixed(2)} MAD</td>
                                                </tr>
                                            `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <!-- Order History Tab -->
                        <div class="tab-pane fade" id="history">
                            <h6>Recent Orders</h6>
                            <p class="text-muted">Order history would be displayed here</p>
                            <div class="text-center py-4">
                                <i class="fas fa-shopping-cart fa-2x text-muted"></i>
                                <p class="mt-2">Order history integration coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    editSupplier(supplierId) {
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;

        // Pre-fill form with supplier data
        document.getElementById('supplierName').value = supplier.name;
        document.getElementById('supplierCategory').value = supplier.category;
        document.getElementById('taxId').value = supplier.taxId || '';
        document.getElementById('companyAddress').value = supplier.address || '';
        document.getElementById('primaryContact').value = supplier.primaryContact;
        document.getElementById('primaryPhone').value = supplier.primaryPhone;
        document.getElementById('primaryEmail').value = supplier.primaryEmail;
        document.getElementById('secondaryContact').value = supplier.secondaryContact || '';
        document.getElementById('secondaryPhone').value = supplier.secondaryPhone || '';
        document.getElementById('paymentTerms').value = supplier.paymentTerms;
        document.getElementById('creditLimit').value = supplier.creditLimit;
        document.getElementById('discount').value = supplier.discount;
        document.getElementById('bankName').value = supplier.bankName || '';
        document.getElementById('bankAccount').value = supplier.bankAccount || '';
        document.getElementById('certifications').value = supplier.certifications || '';
        document.getElementById('supplierNotes').value = supplier.notes || '';
        document.getElementById('supplierStatus').value = supplier.status;

        // Store supplier ID for update
        document.getElementById('supplierForm').dataset.supplierId = supplierId;
        
        const modal = new bootstrap.Modal(document.getElementById('createSupplierModal'));
        modal.show();
        
        // Change modal title
        document.querySelector('#createSupplierModal .modal-title').innerHTML = 
            '<i class="fas fa-edit"></i> Edit Supplier';
    }

    openPlaceOrderModal() {
        // Reset form
        document.getElementById('orderSupplierForm').reset();
        document.getElementById('orderProductsBody').innerHTML = '';
        this.updateOrderSummary();
        
        // Load suppliers into dropdown
        const select = document.getElementById('orderSupplierSelect');
        select.innerHTML = '<option value="">Select supplier...</option>';
        
        this.suppliers
            .filter(s => s.status === 'active' || s.status === 'preferred')
            .forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = `${supplier.name} (${supplier.id})`;
                select.appendChild(option);
            });
        
        const modal = new bootstrap.Modal(document.getElementById('placeOrderModal'));
        modal.show();
    }

    placeOrderForSupplier(supplierId) {
        this.openPlaceOrderModal();
        
        // Pre-select the supplier
        setTimeout(() => {
            document.getElementById('orderSupplierSelect').value = supplierId;
        }, 100);
    }

    addProductToOrder() {
        const supplierId = document.getElementById('orderSupplierSelect').value;
        if (!supplierId) {
            this.showNotification('Please select a supplier first', 'error');
            return;
        }

        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;

        // For demo, add a sample product
        const supplierProducts = this.sampleProducts.filter(p => p.supplier === supplierId);
        if (supplierProducts.length === 0) {
            this.showNotification('No products available for this supplier', 'info');
            return;
        }

        const product = supplierProducts[0]; // Get first product for demo
        
        const tbody = document.getElementById('orderProductsBody');
        const existingRow = tbody.querySelector(`tr[data-product-id="${product.id}"]`);
        
        if (existingRow) {
            // Update quantity
            const quantityInput = existingRow.querySelector('.order-quantity-input');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            this.updateOrderRow(existingRow, product, parseInt(quantityInput.value));
        } else {
            // Add new row
            const row = document.createElement('tr');
            row.dataset.productId = product.id;
            row.innerHTML = `
                <td>
                    <strong>${product.name}</strong>
                    <div class="small text-muted">${product.category}</div>
                </td>
                <td>${product.stock} units</td>
                <td>
                    <input type="number" 
                           class="form-control form-control-sm order-quantity-input" 
                           value="10" 
                           min="1" 
                           onchange="suppliersManager.updateOrderProduct(${product.id}, this.value)">
                </td>
                <td>${product.price.toFixed(2)} MAD</td>
                <td>${(product.price * 10).toFixed(2)} MAD</td>
                <td>
                    <button class="btn btn-danger btn-sm" 
                            onclick="suppliersManager.removeOrderProduct(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        }

        this.updateOrderSummary();
    }

    updateOrderProduct(productId, quantity) {
        const product = this.sampleProducts.find(p => p.id === productId);
        if (!product) return;

        const row = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (row) {
            this.updateOrderRow(row, product, parseInt(quantity) || 1);
            this.updateOrderSummary();
        }
    }

    updateOrderRow(row, product, quantity) {
        const totalCell = row.querySelector('td:nth-child(5)');
        totalCell.textContent = `${(product.price * quantity).toFixed(2)} MAD`;
    }

    removeOrderProduct(productId) {
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
            const totalCell = row.querySelector('td:nth-child(5)');
            const total = parseFloat(totalCell.textContent.replace(' MAD', '')) || 0;
            subtotal += total;
        });
        
        const discount = 0;
        const shipping = 50;
        const total = subtotal - discount + shipping;
        
        document.getElementById('orderSubtotal').textContent = subtotal.toFixed(2) + ' MAD';
        document.getElementById('orderDiscount').textContent = discount.toFixed(2) + ' MAD';
        document.getElementById('orderShipping').textContent = shipping.toFixed(2) + ' MAD';
        document.getElementById('orderTotal').innerHTML = `<strong>${total.toFixed(2)} MAD</strong>`;
    }

    submitOrder() {
        const supplierId = document.getElementById('orderSupplierSelect').value;
        const deliveryDate = document.getElementById('orderDeliveryDate').value;
        
        if (!supplierId || !deliveryDate) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const rows = document.querySelectorAll('#orderProductsBody tr');
        if (rows.length === 0) {
            this.showNotification('Please add at least one product', 'error');
            return;
        }
        
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;
        
        // In a real app, this would create an order in the database
        this.showNotification(`Order placed with ${supplier.name}`, 'success');
        
        // Update supplier's last order date
        supplier.lastOrder = new Date().toISOString().split('T')[0];
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('placeOrderModal')).hide();
        
        // Update UI
        this.renderSuppliersList();
        this.renderTimeline();
    }

    openEvaluateSupplierModal() {
        // Reset form
        document.getElementById('evaluationForm').reset();
        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.classList.remove('selected');
        });
        document.getElementById('overallRating').value = '0';
        
        // Load suppliers into dropdown
        const select = document.getElementById('evaluateSupplierSelect');
        select.innerHTML = '<option value="">Select supplier...</option>';
        
        this.suppliers
            .filter(s => s.status === 'active' || s.status === 'preferred')
            .forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.id;
                option.textContent = `${supplier.name} (${supplier.rating.toFixed(1)}/5)`;
                select.appendChild(option);
            });
        
        const modal = new bootstrap.Modal(document.getElementById('evaluateSupplierModal'));
        modal.show();
    }

    handleStarRating(e) {
        let star = e.target;
        if (!star.classList.contains('fa-star')) {
            star = e.target.querySelector('.fa-star') || e.target;
        }
        
        const rating = parseInt(star.dataset.rating) || 0;
        const stars = star.parentElement.querySelectorAll('.fa-star');
        
        // Update star colors
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
        
        // Update hidden input
        document.getElementById('overallRating').value = rating;
    }

    submitEvaluation() {
        const supplierId = document.getElementById('evaluateSupplierSelect').value;
        const rating = parseInt(document.getElementById('overallRating').value);
        const comments = document.getElementById('evaluationComments').value.trim();
        
        if (!supplierId || rating === 0) {
            this.showNotification('Please select a supplier and provide a rating', 'error');
            return;
        }
        
        const supplier = this.suppliers.find(s => s.id === supplierId);
        if (!supplier) return;
        
        // Update supplier rating (simple average for demo)
        const currentRating = supplier.rating || 0;
        const ratingCount = supplier.rating ? 1 : 0; // Simplified for demo
        supplier.rating = ((currentRating * ratingCount) + rating) / (ratingCount + 1);
        
        // Add comment to notes
        if (comments) {
            supplier.notes = supplier.notes ? `${supplier.notes}\n\nEvaluation (${new Date().toLocaleDateString()}): ${comments}` 
                                           : `Evaluation (${new Date().toLocaleDateString()}): ${comments}`;
        }
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('evaluateSupplierModal')).hide();
        
        // Update UI
        this.renderDashboard();
        this.renderSuppliersList();
        
        this.showNotification(`Evaluation submitted for ${supplier.name}`, 'success');
    }

    toggleSupplierSelection(supplierId, selected) {
        if (selected) {
            this.selectedSuppliers.add(supplierId);
        } else {
            this.selectedSuppliers.delete(supplierId);
        }
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    toggleSelectAll(selectAll) {
        const checkboxes = document.querySelectorAll('.supplier-checkbox');
        const visibleSuppliers = Array.from(document.querySelectorAll('#suppliersTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (selectAll) {
            visibleSuppliers.forEach(id => this.selectedSuppliers.add(id));
            checkboxes.forEach(cb => cb.checked = true);
        } else {
            visibleSuppliers.forEach(id => this.selectedSuppliers.delete(id));
            checkboxes.forEach(cb => cb.checked = false);
        }
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('selectAllSuppliers');
        if (!selectAllCheckbox) return;
        
        const visibleSuppliers = Array.from(document.querySelectorAll('#suppliersTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (visibleSuppliers.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.disabled = true;
            return;
        }
        
        selectAllCheckbox.disabled = false;
        const allSelected = visibleSuppliers.every(id => this.selectedSuppliers.has(id));
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = !allSelected && visibleSuppliers.some(id => this.selectedSuppliers.has(id));
    }

    refreshSuppliers() {
        // In a real app, this would fetch new data from server
        this.renderDashboard();
        this.renderSuppliersList();
        this.renderTimeline();
        
        this.showNotification('Suppliers refreshed', 'info');
    }

    exportSuppliers() {
        // Get selected suppliers or all if none selected
        const suppliersToExport = this.selectedSuppliers.size > 0
            ? this.suppliers.filter(s => this.selectedSuppliers.has(s.id))
            : this.suppliers;
        
        if (suppliersToExport.length === 0) {
            this.showNotification('No suppliers to export', 'warning');
            return;
        }
        
        // Prepare CSV data
        const headers = ['ID', 'Name', 'Category', 'Status', 'Rating', 'Contact', 'Phone', 'Email', 'On-Time Delivery', 'Last Order'];
        const csvData = suppliersToExport.map(supplier => [
            supplier.id,
            supplier.name,
            this.getCategoryDisplayName(supplier.category),
            this.getStatusDisplayName(supplier.status),
            supplier.rating.toFixed(1),
            supplier.primaryContact,
            supplier.primaryPhone,
            supplier.primaryEmail,
            `${supplier.performance.onTimeDelivery}%`,
            supplier.lastOrder || 'Never'
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        // Download CSV
        this.downloadFile(csvContent, `suppliers_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
        
        this.showNotification(`${suppliersToExport.length} suppliers exported to CSV`, 'success');
    }

    // Utility Methods
    getCategoryDisplayName(category) {
        const categories = {
            'fresh': 'Fresh Products',
            'dry': 'Dry Goods',
            'beverages': 'Beverages',
            'hygiene': 'Hygiene & Beauty',
            'cleaning': 'Cleaning',
            'equipment': 'Equipment',
            'services': 'Services'
        };
        return categories[category] || category;
    }

    getStatusDisplayName(status) {
        const statuses = {
            'active': 'Active',
            'inactive': 'Inactive',
            'pending': 'Pending',
            'preferred': 'Preferred',
            'blocked': 'Blocked'
        };
        return statuses[status] || status;
    }

    getPerformanceBadge(onTimeDelivery) {
        if (onTimeDelivery >= 95) {
            return { class: 'performance-excellent', text: 'Excellent' };
        } else if (onTimeDelivery >= 90) {
            return { class: 'performance-good', text: 'Good' };
        } else if (onTimeDelivery >= 80) {
            return { class: 'performance-average', text: 'Average' };
        } else {
            return { class: 'performance-poor', text: 'Poor' };
        }
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<i class="fas fa-star text-warning"></i>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt text-warning"></i>';
            } else {
                stars += '<i class="far fa-star text-warning"></i>';
            }
        }
        
        return stars;
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' MAD';
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

// Initialize Suppliers Manager
let suppliersManager;

document.addEventListener('DOMContentLoaded', function() {
    suppliersManager = new SuppliersManager();
    window.suppliersManager = suppliersManager;
});