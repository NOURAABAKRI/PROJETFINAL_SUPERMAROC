// Inventory Management JavaScript
class InventoryManager {
    constructor() {
        this.inventory = [];
        this.selectedItems = new Set();
        this.filters = {
            category: 'all',
            status: 'all',
            location: 'all',
            search: ''
        };
        this.stockMovements = [];
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderInventoryList();
        this.renderTimeline();
        this.renderAlerts();
    }

    loadSampleData() {
        // Sample inventory data
        this.inventory = [
            {
                id: 'PROD-001',
                name: 'Fresh Milk 1L',
                category: 'dairy',
                currentStock: 45,
                threshold: 20,
                minStock: 10,
                maxStock: 100,
                price: 8.5,
                cost: 6.0,
                location: 'aisle1',
                aisle: 'A1',
                shelf: 'B2',
                supplier: 'Fresh Foods Co.',
                barcode: '123456789012',
                expiryDate: '2024-12-15',
                lastUpdated: '2024-11-10',
                status: 'in-stock',
                value: 382.5,
                units: 'piece',
                daysOfSupply: 15
            },
            {
                id: 'PROD-002',
                name: 'Whole Wheat Bread',
                category: 'bakery',
                currentStock: 5,
                threshold: 15,
                minStock: 8,
                maxStock: 50,
                price: 4.2,
                cost: 2.8,
                location: 'aisle2',
                aisle: 'A2',
                shelf: 'C1',
                supplier: 'Fresh Foods Co.',
                barcode: '234567890123',
                expiryDate: '2024-11-25',
                lastUpdated: '2024-11-11',
                status: 'low-stock',
                value: 21.0,
                units: 'piece',
                daysOfSupply: 3
            },
            {
                id: 'PROD-003',
                name: 'Mineral Water 1.5L',
                category: 'beverages',
                currentStock: 120,
                threshold: 30,
                minStock: 20,
                maxStock: 200,
                price: 5.0,
                cost: 3.2,
                location: 'aisle3',
                aisle: 'A3',
                shelf: 'D3',
                supplier: 'BevCorp Morocco',
                barcode: '345678901234',
                expiryDate: '2025-06-30',
                lastUpdated: '2024-11-09',
                status: 'in-stock',
                value: 600.0,
                units: 'bottle',
                daysOfSupply: 40
            },
            {
                id: 'PROD-004',
                name: 'Yogurt Natural',
                category: 'dairy',
                currentStock: 0,
                threshold: 25,
                minStock: 15,
                maxStock: 80,
                price: 3.8,
                cost: 2.5,
                location: 'aisle1',
                aisle: 'A1',
                shelf: 'B1',
                supplier: 'Fresh Foods Co.',
                barcode: '456789012345',
                expiryDate: '2024-11-20',
                lastUpdated: '2024-11-11',
                status: 'out-of-stock',
                value: 0,
                units: 'piece',
                daysOfSupply: 0
            },
            {
                id: 'PROD-005',
                name: 'Olive Oil 1L',
                category: 'oils',
                currentStock: 18,
                threshold: 10,
                minStock: 5,
                maxStock: 40,
                price: 45.0,
                cost: 32.0,
                location: 'aisle4',
                aisle: 'A4',
                shelf: 'E2',
                supplier: 'Fresh Foods Co.',
                barcode: '567890123456',
                expiryDate: '2025-03-15',
                lastUpdated: '2024-11-10',
                status: 'in-stock',
                value: 810.0,
                units: 'bottle',
                daysOfSupply: 60
            },
            {
                id: 'PROD-006',
                name: 'Rice 5kg',
                category: 'grains',
                currentStock: 30,
                threshold: 15,
                minStock: 10,
                maxStock: 60,
                price: 65.0,
                cost: 48.0,
                location: 'aisle5',
                aisle: 'A5',
                shelf: 'F1',
                supplier: 'Moroccan Grains Ltd.',
                barcode: '678901234567',
                expiryDate: '2025-08-31',
                lastUpdated: '2024-11-09',
                status: 'in-stock',
                value: 1950.0,
                units: 'bag',
                daysOfSupply: 90
            },
            {
                id: 'PROD-007',
                name: 'Frozen Chicken',
                category: 'frozen',
                currentStock: 12,
                threshold: 8,
                minStock: 5,
                maxStock: 30,
                price: 42.5,
                cost: 35.0,
                location: 'freezer',
                aisle: 'FZ',
                shelf: 'G3',
                supplier: 'Meat Suppliers',
                barcode: '789012345678',
                expiryDate: '2024-12-05',
                lastUpdated: '2024-11-10',
                status: 'expiring',
                value: 510.0,
                units: 'kg',
                daysOfSupply: 20
            },
            {
                id: 'PROD-008',
                name: 'Apples (Red)',
                category: 'fruits',
                currentStock: 25,
                threshold: 10,
                minStock: 5,
                maxStock: 40,
                price: 12.0,
                cost: 8.5,
                location: 'aisle4',
                aisle: 'A4',
                shelf: 'H1',
                supplier: 'Fresh Produce Co.',
                barcode: '890123456789',
                expiryDate: '2024-11-18',
                lastUpdated: '2024-11-11',
                status: 'expiring',
                value: 300.0,
                units: 'kg',
                daysOfSupply: 7
            }
        ];

        // Sample stock movements
        this.stockMovements = [
            {
                id: 'MOV-001',
                productId: 'PROD-001',
                productName: 'Fresh Milk 1L',
                type: 'stock-in',
                quantity: 20,
                previousStock: 25,
                newStock: 45,
                reason: 'Delivery from supplier',
                user: 'Stock Clerk',
                timestamp: '2024-11-10 09:30:00'
            },
            {
                id: 'MOV-002',
                productId: 'PROD-002',
                productName: 'Whole Wheat Bread',
                type: 'stock-out',
                quantity: 15,
                previousStock: 20,
                newStock: 5,
                reason: 'Sales',
                user: 'POS System',
                timestamp: '2024-11-11 14:15:00'
            },
            {
                id: 'MOV-003',
                productId: 'PROD-007',
                productName: 'Frozen Chicken',
                type: 'adjustment',
                quantity: -3,
                previousStock: 15,
                newStock: 12,
                reason: 'Damaged packaging',
                user: 'Quality Control',
                timestamp: '2024-11-10 16:45:00'
            },
            {
                id: 'MOV-004',
                productId: 'PROD-004',
                productName: 'Yogurt Natural',
                type: 'expiry',
                quantity: 10,
                previousStock: 10,
                newStock: 0,
                reason: 'Expired products removed',
                user: 'Stock Clerk',
                timestamp: '2024-11-11 08:00:00'
            },
            {
                id: 'MOV-005',
                productId: 'PROD-003',
                productName: 'Mineral Water 1.5L',
                type: 'stock-in',
                quantity: 50,
                previousStock: 70,
                newStock: 120,
                reason: 'Bulk order received',
                user: 'Assistant Manager',
                timestamp: '2024-11-09 11:20:00'
            }
        ];

        // Calculate total inventory value
        this.calculateInventoryMetrics();
    }

    setupEventListeners() {
        // Inventory check button
        document.getElementById('inventoryCheckBtn').addEventListener('click', () => {
            this.openInventoryCheckModal();
        });

        // Scan barcode button
        document.getElementById('scanBarcodeBtn').addEventListener('click', () => {
            this.openScanBarcodeModal();
        });

        // Adjust stock button
        document.getElementById('adjustStockBtn').addEventListener('click', () => {
            this.showNotification('Select a product to adjust stock', 'info');
        });

        // Check expiry button
        document.getElementById('checkExpiryBtn').addEventListener('click', () => {
            this.checkExpiringProducts();
        });

        // Refresh inventory
        document.getElementById('refreshInventoryBtn').addEventListener('click', () => {
            this.refreshInventory();
        });

        // Inventory search
        document.getElementById('inventorySearch').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderInventoryList();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.renderInventoryList();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderInventoryList();
        });

        // Location filter
        document.getElementById('locationFilter').addEventListener('change', (e) => {
            this.filters.location = e.target.value;
            this.renderInventoryList();
        });

        // Select all checkbox
        document.getElementById('selectAllInventory').addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });

        // Start inventory check
        document.getElementById('startCheckBtn')?.addEventListener('click', () => {
            this.startInventoryCheck();
        });

        // Save adjustment
        document.getElementById('saveAdjustmentBtn')?.addEventListener('click', () => {
            this.saveStockAdjustment();
        });

        // Manual scan
        document.getElementById('manualScanBtn')?.addEventListener('click', () => {
            this.manualBarcodeSearch();
        });

        // Order now button
        document.getElementById('orderNowBtn')?.addEventListener('click', () => {
            this.orderProduct();
        });

        // Export inventory
        document.getElementById('exportInventoryBtn').addEventListener('click', () => {
            this.exportInventory();
        });
    }

    renderDashboard() {
        this.updateStats();
    }

    calculateInventoryMetrics() {
        // Calculate inventory value
        const totalValue = this.inventory.reduce((sum, item) => sum + item.value, 0);
        
        // Count products by status
        const inStock = this.inventory.filter(item => item.status === 'in-stock').length;
        const lowStock = this.inventory.filter(item => item.status === 'low-stock').length;
        const outOfStock = this.inventory.filter(item => item.status === 'out-of-stock').length;
        const expiring = this.inventory.filter(item => item.status === 'expiring').length;
        
        // Calculate stock turnover (simplified)
        const stockTurnover = 4.2; // This would come from sales data
        
        return {
            totalProducts: this.inventory.length,
            totalValue,
            inStock,
            lowStock,
            outOfStock,
            expiring,
            stockTurnover
        };
    }

    updateStats() {
        const metrics = this.calculateInventoryMetrics();
        
        // Update UI
        document.getElementById('totalProducts').textContent = metrics.totalProducts.toLocaleString();
        document.getElementById('lowStockCount').textContent = metrics.lowStock;
        document.getElementById('inventoryValue').textContent = metrics.totalValue.toLocaleString();
        document.getElementById('stockTurnover').textContent = metrics.stockTurnover.toFixed(1);
        
        // Update status counts
        document.getElementById('statusInStock').textContent = metrics.inStock;
        document.getElementById('statusLowStock').textContent = metrics.lowStock;
        document.getElementById('statusOutOfStock').textContent = metrics.outOfStock;
        document.getElementById('statusExpiring').textContent = metrics.expiring;
    }

    renderInventoryList() {
        const tbody = document.getElementById('inventoryTableBody');
        if (!tbody) return;

        // Filter inventory
        let filteredInventory = this.inventory;
        
        if (this.filters.category !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.category === this.filters.category);
        }
        
        if (this.filters.status !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.status === this.filters.status);
        }
        
        if (this.filters.location !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.location === this.filters.location);
        }
        
        if (this.filters.search) {
            filteredInventory = filteredInventory.filter(item => 
                item.name.toLowerCase().includes(this.filters.search) ||
                item.id.toLowerCase().includes(this.filters.search) ||
                item.barcode.includes(this.filters.search)
            );
        }

        // Clear table
        tbody.innerHTML = '';

        if (filteredInventory.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" class="text-center py-5">
                        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No inventory items found</h5>
                        <p class="text-muted">Try changing your filters</p>
                    </td>
                </tr>
            `;
        } else {
            // Sort by status (critical first)
            const statusOrder = { 'out-of-stock': 0, 'low-stock': 1, 'expiring': 2, 'in-stock': 3 };
            filteredInventory.sort((a, b) => {
                if (statusOrder[a.status] !== statusOrder[b.status]) {
                    return statusOrder[a.status] - statusOrder[b.status];
                }
                return a.currentStock - b.currentStock;
            });

            // Render inventory items
            filteredInventory.forEach(item => {
                const row = this.createInventoryRow(item);
                tbody.appendChild(row);
            });
        }

        // Update count
        this.updateInventoryCount(filteredInventory.length);
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    createInventoryRow(item) {
        const row = document.createElement('tr');
        row.dataset.id = item.id;
        
        const stockPercentage = (item.currentStock / item.maxStock) * 100;
        const progressBarClass = this.getProgressBarClass(stockPercentage, item.threshold);
        const isSelected = this.selectedItems.has(item.id);
        const expiryWarning = this.isExpiringSoon(item.expiryDate) ? '<i class="fas fa-exclamation-triangle text-warning ms-1"></i>' : '';
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="inventory-checkbox" 
                       data-id="${item.id}" 
                       ${isSelected ? 'checked' : ''}>
            </td>
            <td>
                <strong class="text-muted">${item.id}</strong>
            </td>
            <td>
                <div class="product-item">
                    <div class="product-item-icon">
                        <i class="fas fa-box text-primary"></i>
                    </div>
                    <div class="product-item-content">
                        <div class="product-item-title">${item.name}</div>
                        <div class="product-item-description">
                            ${item.supplier ? `<i class="fas fa-truck"></i> ${item.supplier}` : ''}
                        </div>
                        <div class="product-item-meta">
                            <i class="fas fa-barcode"></i> ${item.barcode}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="category-badge category-${item.category}">
                    ${this.getCategoryDisplayName(item.category)}
                </span>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="me-2">
                        <strong class="${item.currentStock < item.threshold ? 'text-danger' : 'text-success'}">
                            ${item.currentStock}
                        </strong>
                        <div class="small text-muted">${item.units}</div>
                    </div>
                    <div class="stock-progress" style="width: 60px;">
                        <div class="progress">
                            <div class="progress-bar ${progressBarClass}" 
                                 style="width: ${stockPercentage}%"></div>
                        </div>
                        <div class="stock-indicator">
                            <span>0</span>
                            <span>${item.maxStock}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <strong>${item.threshold}</strong>
                <div class="small text-muted">Min: ${item.minStock}</div>
            </td>
            <td>
                <span class="inventory-status status-${item.status}">
                    ${this.getStatusDisplayName(item.status)}
                </span>
            </td>
            <td>
                <span class="location-badge location-${item.location}">
                    ${this.getLocationDisplay(item.location)}
                </span>
                <div class="small text-muted mt-1">${item.aisle}, ${item.shelf}</div>
            </td>
            <td>
                <div>${this.formatDate(item.expiryDate)}${expiryWarning}</div>
                <small class="text-muted">${this.getDaysUntilExpiry(item.expiryDate)} days</small>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-action btn-action-view" 
                            onclick="inventoryManager.viewProduct('${item.id}')"
                            title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-action btn-action-adjust" 
                            onclick="inventoryManager.adjustStock('${item.id}')"
                            title="Adjust Stock">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                    <button class="btn btn-action btn-action-order" 
                            onclick="inventoryManager.orderProductFromList('${item.id}')"
                            title="Order More">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </td>
        `;

        // Add checkbox event listener
        const checkbox = row.querySelector('.inventory-checkbox');
        checkbox.addEventListener('change', (e) => {
            this.toggleItemSelection(item.id, e.target.checked);
        });

        return row;
    }

    renderTimeline() {
        const container = document.getElementById('inventoryTimeline');
        if (!container) return;

        // Get recent stock movements
        const recentMovements = this.stockMovements
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

        let html = '';
        recentMovements.forEach(movement => {
            const time = this.formatTime(movement.timestamp);
            const sign = movement.type === 'stock-in' ? '+' : '-';
            const quantityDisplay = movement.type === 'stock-in' ? 
                `<span class="text-success">+${movement.quantity}</span>` : 
                `<span class="text-danger">-${movement.quantity}</span>`;
            
            html += `
                <div class="timeline-item ${movement.type}">
                    <div class="timeline-content">
                        <div class="timeline-title">${movement.productName}</div>
                        <div class="timeline-description">
                            ${quantityDisplay} units • ${this.getMovementTypeDisplay(movement.type)}
                            <br>
                            <small>${movement.reason}</small>
                        </div>
                        <div class="timeline-meta">
                            <span><i class="fas fa-user"></i> ${movement.user}</span>
                            <span><i class="fas fa-clock"></i> ${time}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderAlerts() {
        const container = document.getElementById('inventoryAlerts');
        if (!container) return;

        // Get critical alerts
        const criticalAlerts = this.getCriticalAlerts();

        let html = '';
        if (criticalAlerts.length === 0) {
            html = `
                <div class="text-center py-4">
                    <i class="fas fa-check-circle fa-2x text-success mb-3"></i>
                    <p class="text-muted">No critical alerts</p>
                    <small class="text-muted">All inventory levels are satisfactory</small>
                </div>
            `;
        } else {
            criticalAlerts.forEach(alert => {
                const alertClass = alert.severity === 'critical' ? 'critical' : 
                                 alert.severity === 'warning' ? 'warning' : 'info';
                
                html += `
                    <div class="alert-item ${alertClass}">
                        <div class="alert-icon">
                            <i class="fas fa-${this.getAlertIcon(alert.type)}"></i>
                        </div>
                        <div class="alert-content">
                            <div class="alert-title">${alert.title}</div>
                            <div class="alert-description">${alert.description}</div>
                            <div class="alert-time">${this.getTimeAgo(alert.timestamp)}</div>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;
    }

    getCriticalAlerts() {
        const alerts = [];
        const now = new Date();
        
        this.inventory.forEach(item => {
            // Check for low stock
            if (item.currentStock <= item.threshold && item.currentStock > 0) {
                alerts.push({
                    type: 'low-stock',
                    severity: 'warning',
                    title: 'Low Stock Alert',
                    description: `${item.name} is below threshold (${item.currentStock}/${item.threshold})`,
                    timestamp: item.lastUpdated,
                    productId: item.id
                });
            }
            
            // Check for out of stock
            if (item.currentStock === 0) {
                alerts.push({
                    type: 'out-of-stock',
                    severity: 'critical',
                    title: 'Out of Stock',
                    description: `${item.name} is out of stock`,
                    timestamp: item.lastUpdated,
                    productId: item.id
                });
            }
            
            // Check for expiring soon
            if (this.isExpiringSoon(item.expiryDate)) {
                const days = this.getDaysUntilExpiry(item.expiryDate);
                alerts.push({
                    type: 'expiry',
                    severity: 'warning',
                    title: 'Product Expiring Soon',
                    description: `${item.name} expires in ${days} days`,
                    timestamp: item.lastUpdated,
                    productId: item.id
                });
            }
        });
        
        // Sort by severity (critical first)
        const severityOrder = { critical: 0, warning: 1, info: 2 };
        alerts.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
        
        return alerts.slice(0, 5); // Return top 5 alerts
    }

    updateInventoryCount(count) {
        const element = document.getElementById('inventoryCountText');
        if (element) {
            const total = this.inventory.length;
            element.textContent = `Showing ${count} of ${total} items`;
        }
    }

    openInventoryCheckModal() {
        // Set default dates
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        document.getElementById('checkStartDate').value = today;
        document.getElementById('checkEndDate').value = nextWeek;
        
        const modal = new bootstrap.Modal(document.getElementById('inventoryCheckModal'));
        modal.show();
    }

    startInventoryCheck() {
        const checkType = document.getElementById('checkType').value;
        const assignedTo = document.getElementById('assignedTo').value;
        const startDate = document.getElementById('checkStartDate').value;
        
        if (!checkType || !assignedTo || !startDate) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // In a real app, this would create an inventory check record
        this.showNotification(`Inventory check started (${checkType})`, 'success');
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('inventoryCheckModal')).hide();
    }

    openScanBarcodeModal() {
        document.getElementById('manualBarcode').value = '';
        document.getElementById('scanResult').innerHTML = '';
        
        const modal = new bootstrap.Modal(document.getElementById('scanBarcodeModal'));
        modal.show();
    }

    manualBarcodeSearch() {
        const barcode = document.getElementById('manualBarcode').value.trim();
        if (!barcode) {
            this.showNotification('Please enter a barcode', 'error');
            return;
        }
        
        const product = this.inventory.find(item => item.barcode === barcode);
        const resultDiv = document.getElementById('scanResult');
        
        if (product) {
            resultDiv.innerHTML = `
                <div class="alert alert-success">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-check-circle fa-2x me-3"></i>
                        <div>
                            <h6 class="mb-1">${product.name}</h6>
                            <p class="mb-1">Stock: ${product.currentStock} ${product.units}</p>
                            <p class="mb-0">Status: ${this.getStatusDisplayName(product.status)}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="alert alert-warning">
                    <div class="d-flex align-items-center">
                        <i class="fas fa-exclamation-triangle fa-2x me-3"></i>
                        <div>
                            <h6 class="mb-1">Product Not Found</h6>
                            <p class="mb-0">No product found with barcode: ${barcode}</p>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    adjustStock(productId) {
        const product = this.inventory.find(item => item.id === productId);
        if (!product) return;
        
        // Fill form with product data
        document.getElementById('adjustProductId').value = product.id;
        document.getElementById('adjustProductName').value = product.name;
        document.getElementById('currentStock').value = product.currentStock;
        document.getElementById('adjustmentQuantity').value = '1';
        
        const modal = new bootstrap.Modal(document.getElementById('adjustStockModal'));
        modal.show();
    }

    saveStockAdjustment() {
        const productId = document.getElementById('adjustProductId').value;
        const adjustmentType = document.getElementById('adjustmentType').value;
        const quantity = parseInt(document.getElementById('adjustmentQuantity').value);
        const reason = document.getElementById('adjustmentReason').value;
        const notes = document.getElementById('adjustmentNotes').value;
        
        if (!productId || !adjustmentType || !quantity || !reason) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const product = this.inventory.find(item => item.id === productId);
        if (!product) return;
        
        let newStock = product.currentStock;
        let movementType = 'adjustment';
        
        switch (adjustmentType) {
            case 'add':
                newStock += quantity;
                movementType = 'stock-in';
                break;
            case 'remove':
                newStock -= quantity;
                movementType = 'stock-out';
                break;
            case 'set':
                newStock = quantity;
                break;
            case 'damage':
            case 'theft':
                newStock -= quantity;
                break;
        }
        
        if (newStock < 0) {
            this.showNotification('Stock cannot be negative', 'error');
            return;
        }
        
        // Update product stock
        const oldStock = product.currentStock;
        product.currentStock = newStock;
        product.lastUpdated = new Date().toISOString();
        
        // Update status based on new stock
        if (newStock === 0) {
            product.status = 'out-of-stock';
        } else if (newStock < product.threshold) {
            product.status = 'low-stock';
        } else {
            product.status = 'in-stock';
        }
        
        // Update inventory value
        product.value = product.currentStock * product.price;
        
        // Add stock movement record
        this.stockMovements.unshift({
            id: `MOV-${new Date().getTime()}`,
            productId: product.id,
            productName: product.name,
            type: movementType,
            quantity: adjustmentType === 'set' ? newStock - oldStock : 
                     adjustmentType === 'add' ? quantity : -quantity,
            previousStock: oldStock,
            newStock: newStock,
            reason: `${reason}: ${notes || ''}`.trim(),
            user: 'Current User',
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
        });
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('adjustStockModal')).hide();
        
        // Update UI
        this.renderDashboard();
        this.renderInventoryList();
        this.renderTimeline();
        this.renderAlerts();
        
        this.showNotification(`Stock updated for ${product.name}`, 'success');
    }

    checkExpiringProducts() {
        const expiringProducts = this.inventory.filter(item => this.isExpiringSoon(item.expiryDate));
        
        if (expiringProducts.length === 0) {
            this.showNotification('No products expiring soon', 'info');
        } else {
            const productList = expiringProducts.map(p => 
                `${p.name} (${this.getDaysUntilExpiry(p.expiryDate)} days)`
            ).join('\n');
            
            this.showNotification(
                `${expiringProducts.length} products expiring soon:\n${productList}`,
                'warning'
            );
        }
    }

    viewProduct(productId) {
        const product = this.inventory.find(item => item.id === productId);
        if (!product) {
            this.showNotification('Product not found', 'error');
            return;
        }

        const modalContent = this.createProductDetails(product);
        document.getElementById('productDetailsContent').innerHTML = modalContent;
        
        // Store product ID for ordering
        document.getElementById('productDetailsModal').dataset.productId = productId;
        
        const modal = new bootstrap.Modal(document.getElementById('productDetailsModal'));
        modal.show();
    }

    createProductDetails(product) {
        const stockPercentage = (product.currentStock / product.maxStock) * 100;
        const progressBarClass = this.getProgressBarClass(stockPercentage, product.threshold);
        const daysToExpiry = this.getDaysUntilExpiry(product.expiryDate);
        const expiryClass = daysToExpiry <= 7 ? 'text-danger' : daysToExpiry <= 14 ? 'text-warning' : 'text-success';
        
        return `
            <div class="product-details-container">
                <div class="product-details-header">
                    <div class="product-details-title">${product.name}</div>
                    <div class="product-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Product ID</span>
                            <span class="meta-value">${product.id}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span class="meta-value">
                                <span class="category-badge category-${product.category}">
                                    ${this.getCategoryDisplayName(product.category)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Status</span>
                            <span class="meta-value">
                                <span class="inventory-status status-${product.status}">
                                    ${this.getStatusDisplayName(product.status)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Barcode</span>
                            <span class="meta-value">${product.barcode}</span>
                        </div>
                    </div>
                </div>
                
                <div class="product-stats">
                    <div class="stat-item">
                        <div class="stat-value">${product.currentStock}</div>
                        <div class="stat-label">Current Stock</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${product.threshold}</div>
                        <div class="stat-label">Threshold</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${product.daysOfSupply}</div>
                        <div class="stat-label">Days of Supply</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${product.value.toFixed(2)}</div>
                        <div class="stat-label">Stock Value (MAD)</div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h6><i class="fas fa-chart-line"></i> Stock Level</h6>
                            <div class="stock-progress">
                                <div class="progress" style="height: 20px;">
                                    <div class="progress-bar ${progressBarClass}" 
                                         style="width: ${stockPercentage}%">
                                        <span class="ms-2">${product.currentStock}/${product.maxStock}</span>
                                    </div>
                                </div>
                                <div class="stock-indicator">
                                    <span>0</span>
                                    <span>Min: ${product.minStock}</span>
                                    <span>Threshold: ${product.threshold}</span>
                                    <span>Max: ${product.maxStock}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <h6><i class="fas fa-map-marker-alt"></i> Location</h6>
                            <p>
                                <span class="location-badge location-${product.location}">
                                    ${this.getLocationDisplay(product.location)}
                                </span>
                                <br>
                                <small class="text-muted">Aisle: ${product.aisle}, Shelf: ${product.shelf}</small>
                            </p>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h6><i class="fas fa-calendar-alt"></i> Expiry Information</h6>
                            <p>
                                <strong>Expiry Date:</strong> ${this.formatDate(product.expiryDate)}<br>
                                <strong>Days Remaining:</strong> <span class="${expiryClass}">${daysToExpiry} days</span><br>
                                <small class="text-muted">${this.isExpiringSoon(product.expiryDate) ? '⚠️ Expiring soon - Consider promotion' : '✓ Within acceptable range'}</small>
                            </p>
                        </div>
                        
                        <div class="mb-3">
                            <h6><i class="fas fa-truck"></i> Supplier Information</h6>
                            <p>
                                <strong>Supplier:</strong> ${product.supplier}<br>
                                <strong>Last Updated:</strong> ${this.formatDate(product.lastUpdated)}<br>
                                <strong>Units:</strong> ${product.units}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h6><i class="fas fa-money-bill-wave"></i> Pricing</h6>
                            <p>
                                <strong>Selling Price:</strong> ${product.price.toFixed(2)} MAD<br>
                                <strong>Cost Price:</strong> ${product.cost.toFixed(2)} MAD<br>
                                <strong>Margin:</strong> ${((product.price - product.cost) / product.cost * 100).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    orderProduct() {
        const modal = document.getElementById('productDetailsModal');
        const productId = modal.dataset.productId;
        
        if (productId) {
            this.orderProductFromList(productId);
            bootstrap.Modal.getInstance(modal).hide();
        }
    }

    orderProductFromList(productId) {
        const product = this.inventory.find(item => item.id === productId);
        if (!product) return;
        
        const orderQuantity = Math.max(product.maxStock - product.currentStock, product.threshold * 2);
        
        // In a real app, this would create an order
        this.showNotification(`Order created for ${orderQuantity} ${product.units} of ${product.name}`, 'success');
    }

    toggleItemSelection(itemId, selected) {
        if (selected) {
            this.selectedItems.add(itemId);
        } else {
            this.selectedItems.delete(itemId);
        }
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    toggleSelectAll(selectAll) {
        const checkboxes = document.querySelectorAll('.inventory-checkbox');
        const visibleItems = Array.from(document.querySelectorAll('#inventoryTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (selectAll) {
            visibleItems.forEach(id => this.selectedItems.add(id));
            checkboxes.forEach(cb => cb.checked = true);
        } else {
            visibleItems.forEach(id => this.selectedItems.delete(id));
            checkboxes.forEach(cb => cb.checked = false);
        }
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('selectAllInventory');
        if (!selectAllCheckbox) return;
        
        const visibleItems = Array.from(document.querySelectorAll('#inventoryTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (visibleItems.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.disabled = true;
            return;
        }
        
        selectAllCheckbox.disabled = false;
        const allSelected = visibleItems.every(id => this.selectedItems.has(id));
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = !allSelected && visibleItems.some(id => this.selectedItems.has(id));
    }

    refreshInventory() {
        // In a real app, this would fetch new data from server
        this.renderDashboard();
        this.renderInventoryList();
        this.renderTimeline();
        this.renderAlerts();
        
        this.showNotification('Inventory refreshed', 'info');
    }

    exportInventory() {
        // Get selected items or all if none selected
        const itemsToExport = this.selectedItems.size > 0
            ? this.inventory.filter(item => this.selectedItems.has(item.id))
            : this.inventory;
        
        if (itemsToExport.length === 0) {
            this.showNotification('No items to export', 'warning');
            return;
        }
        
        // Prepare CSV data
        const headers = ['ID', 'Name', 'Category', 'Current Stock', 'Threshold', 'Min Stock', 'Max Stock', 'Status', 'Location', 'Expiry Date', 'Supplier', 'Value'];
        const csvData = itemsToExport.map(item => [
            item.id,
            item.name,
            this.getCategoryDisplayName(item.category),
            item.currentStock,
            item.threshold,
            item.minStock,
            item.maxStock,
            this.getStatusDisplayName(item.status),
            this.getLocationDisplay(item.location),
            this.formatDate(item.expiryDate),
            item.supplier,
            item.value.toFixed(2)
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        // Download CSV
        this.downloadFile(csvContent, `inventory_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
        
        this.showNotification(`${itemsToExport.length} items exported to CSV`, 'success');
    }

    // Utility Methods
    getCategoryDisplayName(category) {
        const categories = {
            'dairy': 'Dairy',
            'bakery': 'Bakery',
            'beverages': 'Beverages',
            'meat': 'Meat & Poultry',
            'fruits': 'Fruits & Vegetables',
            'frozen': 'Frozen Foods',
            'hygiene': 'Hygiene',
            'cleaning': 'Cleaning',
            'oils': 'Oils',
            'grains': 'Grains'
        };
        return categories[category] || category;
    }

    getStatusDisplayName(status) {
        const statuses = {
            'in-stock': 'In Stock',
            'low-stock': 'Low Stock',
            'out-of-stock': 'Out of Stock',
            'expiring': 'Expiring Soon'
        };
        return statuses[status] || status;
    }

    getLocationDisplay(location) {
        const locations = {
            'aisle1': 'Aisle 1 - Dairy',
            'aisle2': 'Aisle 2 - Bakery',
            'aisle3': 'Aisle 3 - Beverages',
            'aisle4': 'Aisle 4 - Fresh Produce',
            'aisle5': 'Aisle 5 - Dry Goods',
            'freezer': 'Freezer Section',
            'storage': 'Storage Room',
            'backroom': 'Backroom'
        };
        return locations[location] || location;
    }

    getMovementTypeDisplay(type) {
        const types = {
            'stock-in': 'Stock In',
            'stock-out': 'Stock Out',
            'adjustment': 'Adjustment',
            'expiry': 'Expiry Removal'
        };
        return types[type] || type;
    }

    getProgressBarClass(percentage, threshold) {
        const thresholdPercentage = (threshold / 100) * 100; // Assuming maxStock is 100 for threshold percentage
        if (percentage <= 10) return 'critical';
        if (percentage <= thresholdPercentage) return 'low';
        return '';
    }

    isExpiringSoon(expiryDate) {
        if (!expiryDate) return false;
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 14 && diffDays >= 0;
    }

    getDaysUntilExpiry(expiryDate) {
        if (!expiryDate) return 'N/A';
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    formatDate(dateString) {
        if (!dateString || dateString === 'N/A') return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(dateTimeString) {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getTimeAgo(dateTimeString) {
        if (!dateTimeString) return '';
        const date = new Date(dateTimeString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays}d ago`;
        return this.formatDate(dateTimeString);
    }

    getAlertIcon(type) {
        const icons = {
            'low-stock': 'exclamation-triangle',
            'out-of-stock': 'times-circle',
            'expiry': 'calendar-times'
        };
        return icons[type] || 'bell';
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

// Initialize Inventory Manager
let inventoryManager;

document.addEventListener('DOMContentLoaded', function() {
    inventoryManager = new InventoryManager();
    window.inventoryManager = inventoryManager;
});