// Sales Analytics JavaScript
class SalesAnalytics {
    constructor() {
        this.salesData = [];
        this.transactions = [];
        this.currentPeriod = 'day';
        this.currentDateRange = 'today';
        this.charts = {};
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.initCharts();
        this.setupEventListeners();
        this.updateDashboard();
        this.renderTransactions();
        this.setupDateRangePicker();
    }

    loadSampleData() {
        // Sample sales data
        this.salesData = {
            today: {
                revenue: 8450,
                transactions: 127,
                avgTicket: 66.54,
                itemsPerSale: 8.3,
                hourlyData: [150, 200, 180, 120, 90, 120, 180, 250, 300, 280, 200, 150, 
                            130, 110, 100, 120, 180, 250, 300, 350, 320, 280, 200, 150],
                categoryData: {
                    labels: ['Food', 'Beverages', 'Hygiene', 'Household', 'Fruits', 'Dairy', 'Bakery'],
                    data: [2500, 1800, 1200, 900, 800, 750, 500],
                    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384']
                }
            },
            week: {
                revenue: 58900,
                transactions: 890,
                avgTicket: 66.18,
                itemsPerSale: 8.1
            },
            month: {
                revenue: 245000,
                transactions: 3680,
                avgTicket: 66.58,
                itemsPerSale: 8.2
            }
        };

        // Sample transactions
        this.transactions = [
            {
                id: 'TRX001',
                time: '2024-11-11 18:30:15',
                customer: 'Walk-in Customer',
                items: 12,
                amount: 156.75,
                payment: 'card',
                cashier: 'Sarah Johnson',
                status: 'completed',
                itemsList: [
                    { name: 'Fresh Milk 1L', qty: 2, price: 8.50 },
                    { name: 'Whole Wheat Bread', qty: 1, price: 4.20 },
                    { name: 'Mineral Water 1.5L', qty: 3, price: 5.00 }
                ]
            },
            {
                id: 'TRX002',
                time: '2024-11-11 17:45:22',
                customer: 'Mohammed Ali',
                items: 8,
                amount: 89.50,
                payment: 'cash',
                cashier: 'Ahmed Hassan',
                status: 'completed',
                itemsList: [
                    { name: 'Olive Oil 1L', qty: 1, price: 45.00 },
                    { name: 'Pasta 500g', qty: 2, price: 8.00 }
                ]
            },
            {
                id: 'TRX003',
                time: '2024-11-11 16:20:10',
                customer: 'Fatima Zahra',
                items: 15,
                amount: 234.80,
                payment: 'mobile',
                cashier: 'Karim Alami',
                status: 'completed',
                itemsList: [
                    { name: 'Chicken Breast 500g', qty: 2, price: 44.00 },
                    { name: 'Apples 1kg', qty: 1, price: 12.00 }
                ]
            },
            {
                id: 'TRX004',
                time: '2024-11-11 14:15:33',
                customer: 'Walk-in Customer',
                items: 5,
                amount: 42.30,
                payment: 'card',
                cashier: 'Sarah Johnson',
                status: 'completed',
                itemsList: [
                    { name: 'Yogurt 500g', qty: 2, price: 7.60 },
                    { name: 'Butter 250g', qty: 1, price: 15.50 }
                ]
            },
            {
                id: 'TRX005',
                time: '2024-11-11 12:45:18',
                customer: 'Hassan Berrada',
                items: 20,
                amount: 312.90,
                payment: 'cash',
                cashier: 'Ahmed Hassan',
                status: 'pending',
                itemsList: [
                    { name: 'Rice 2kg', qty: 1, price: 25.00 },
                    { name: 'Cooking Oil 2L', qty: 1, price: 38.00 }
                ]
            },
            {
                id: 'TRX006',
                time: '2024-11-11 11:30:05',
                customer: 'Amina El Fassi',
                items: 7,
                amount: 67.25,
                payment: 'card',
                cashier: 'Karim Alami',
                status: 'completed',
                itemsList: [
                    { name: 'Coffee 250g', qty: 1, price: 35.00 },
                    { name: 'Sugar 1kg', qty: 1, price: 12.00 }
                ]
            },
            {
                id: 'TRX007',
                time: '2024-11-11 10:15:42',
                customer: 'Walk-in Customer',
                items: 3,
                amount: 24.90,
                payment: 'cash',
                cashier: 'Sarah Johnson',
                status: 'refunded',
                itemsList: [
                    { name: 'Newspaper', qty: 1, price: 5.00 },
                    { name: 'Chocolate Bar', qty: 2, price: 9.90 }
                ]
            },
            {
                id: 'TRX008',
                time: '2024-11-11 09:45:28',
                customer: 'Youssef Benani',
                items: 18,
                amount: 278.40,
                payment: 'mobile',
                cashier: 'Ahmed Hassan',
                status: 'completed',
                itemsList: [
                    { name: 'Laundry Detergent', qty: 1, price: 45.00 },
                    { name: 'Dish Soap', qty: 2, price: 15.60 }
                ]
            }
        ];

        // Top products
        this.topProducts = [
            { name: 'Mineral Water 1.5L', sold: 245, revenue: 1225, trend: '+12%' },
            { name: 'Fresh Milk 1L', sold: 198, revenue: 1683, trend: '+8%' },
            { name: 'Whole Wheat Bread', sold: 156, revenue: 655.20, trend: '+15%' },
            { name: 'Yogurt Natural 500g', sold: 142, revenue: 539.60, trend: '-5%' },
            { name: 'Apples (1kg)', sold: 128, revenue: 1536, trend: '+22%' },
            { name: 'Coffee 250g', sold: 95, revenue: 3325, trend: '+18%' },
            { name: 'Olive Oil 1L', sold: 78, revenue: 3510, trend: '+10%' },
            { name: 'Chicken Breast 500g', sold: 65, revenue: 1430, trend: '+25%' }
        ];
    }

    initCharts() {
        // Sales Trend Chart
        const trendCtx = document.getElementById('salesTrendChart');
        if (trendCtx) {
            this.charts.trend = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                    datasets: [{
                        label: 'Sales (MAD)',
                        data: [1500, 3200, 4500, 5200, 3800, 4200, 6800, 8200, 4500],
                        borderColor: '#FFD700',
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => `Revenue: ${context.parsed.y.toLocaleString()} MAD`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) => `${value.toLocaleString()} MAD`
                            }
                        }
                    }
                }
            });
        }

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            this.charts.category = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: this.salesData.today.categoryData.labels,
                    datasets: [{
                        data: this.salesData.today.categoryData.data,
                        backgroundColor: this.salesData.today.categoryData.colors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((context.parsed / total) * 100);
                                    return `${context.label}: ${context.parsed.toLocaleString()} MAD (${percentage}%)`;
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });

            // Create legend
            this.createCategoryLegend();
        }

        // Hourly Chart
        const hourlyCtx = document.getElementById('hourlyChart');
        if (hourlyCtx) {
            this.charts.hourly = new Chart(hourlyCtx, {
                type: 'bar',
                data: {
                    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                    datasets: [{
                        label: 'Transactions',
                        data: this.salesData.today.hourlyData,
                        backgroundColor: (context) => {
                            const hour = context.dataIndex;
                            if (hour >= 10 && hour <= 12) return '#FFD700'; // Morning peak
                            if (hour >= 18 && hour <= 20) return '#FFC107'; // Evening peak
                            return '#E9ECEF'; // Regular hours
                        },
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) => `${value}`
                            }
                        }
                    }
                }
            });
        }

        // Store Comparison Chart
        const storeCtx = document.getElementById('storeComparisonChart');
        if (storeCtx) {
            this.charts.store = new Chart(storeCtx, {
                type: 'bar',
                data: {
                    labels: ['Agadir', 'Casablanca', 'Marrakech', 'Rabat'],
                    datasets: [{
                        label: 'Weekly Revenue',
                        data: [58900, 89200, 52100, 47800],
                        backgroundColor: ['#FFD700', '#36A2EB', '#4BC0C0', '#9966FF'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) => `${(value / 1000).toFixed(0)}K MAD`
                            }
                        }
                    }
                }
            });
        }
    }

    createCategoryLegend() {
        const container = document.getElementById('categoryLegend');
        if (!container) return;

        const categories = this.salesData.today.categoryData;
        let html = '';

        categories.labels.forEach((label, index) => {
            const total = categories.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((categories.data[index] / total) * 100);
            
            html += `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${categories.colors[index]}"></div>
                    <span>${label}</span>
                    <span class="text-muted">(${percentage}%)</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    setupEventListeners() {
        // Period selector buttons
        document.querySelectorAll('[data-period]').forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.changePeriod(period);
            });
        });

        // Export button
        document.getElementById('exportReportBtn').addEventListener('click', () => {
            this.openExportModal();
        });

        // Refresh transactions
        document.getElementById('refreshTransactionsBtn').addEventListener('click', () => {
            this.refreshTransactions();
        });

        // Transaction search
        document.getElementById('transactionSearch').addEventListener('input', (e) => {
            this.searchTransactions(e.target.value);
        });

        // Payment filter
        document.getElementById('paymentFilter').addEventListener('change', (e) => {
            this.filterTransactions();
        });

        // Amount filter
        document.getElementById('amountFilter').addEventListener('change', (e) => {
            this.filterTransactions();
        });

        // Clear filters
        document.getElementById('clearTransactionFiltersBtn').addEventListener('click', () => {
            this.clearTransactionFilters();
        });

        // Export modal
        document.getElementById('exportFormat').addEventListener('change', (e) => {
            this.updateExportOptions();
        });

        document.getElementById('exportDateRange').addEventListener('change', (e) => {
            this.toggleCustomDateRange(e.target.value === 'custom');
        });

        document.getElementById('confirmExportBtn').addEventListener('click', () => {
            this.exportReport();
        });

        // Print receipt
        document.getElementById('printReceiptBtn')?.addEventListener('click', () => {
            this.printReceipt();
        });
    }

    setupDateRangePicker() {
        const picker = document.getElementById('dateRangePicker');
        const text = document.getElementById('dateRangeText');
        
        if (!picker || !text) return;

        // Simple date range toggle for now
        picker.addEventListener('click', () => {
            const options = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month', 'Last Month'];
            const currentIndex = options.indexOf(text.textContent);
            const nextIndex = (currentIndex + 1) % options.length;
            
            text.textContent = options[nextIndex];
            this.currentDateRange = options[nextIndex].toLowerCase().replace(' ', '-');
            this.updateDashboard();
        });
    }

    changePeriod(period) {
        this.currentPeriod = period;
        
        // Update active button
        document.querySelectorAll('[data-period]').forEach(button => {
            button.classList.toggle('active', button.dataset.period === period);
        });
        
        // Update chart data
        this.updateTrendChart(period);
        this.showNotification(`Showing ${period} data`, 'info');
    }

    updateTrendChart(period) {
        if (!this.charts.trend) return;
        
        let data;
        let labels;
        
        switch (period) {
            case 'day':
                labels = ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
                data = [1500, 3200, 4500, 5200, 3800, 4200, 6800, 8200, 4500];
                break;
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = [8500, 9200, 8450, 9100, 7800, 12500, 9800];
                break;
            case 'month':
                labels = Array.from({ length: 30 }, (_, i) => i + 1);
                data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 10000) + 5000);
                break;
        }
        
        this.charts.trend.data.labels = labels;
        this.charts.trend.data.datasets[0].data = data;
        this.charts.trend.update();
    }

    updateDashboard() {
        const data = this.salesData[this.currentPeriod];
        
        if (data) {
            document.getElementById('totalRevenue').textContent = 
                `${data.revenue.toLocaleString()} MAD`;
            document.getElementById('totalTransactions').textContent = 
                data.transactions.toLocaleString();
            document.getElementById('avgTicket').textContent = 
                data.avgTicket.toFixed(2) + ' MAD';
            document.getElementById('itemsPerSale').textContent = 
                data.itemsPerSale.toFixed(1);
        }
        
        // Update top products table
        this.updateTopProducts();
    }

    updateTopProducts() {
        const tbody = document.getElementById('topProductsBody');
        if (!tbody) return;
        
        let html = '';
        this.topProducts.forEach((product, index) => {
            const trendClass = product.trend.startsWith('+') ? 'positive' : 'negative';
            
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <strong>${product.name}</strong>
                    </td>
                    <td>${product.sold.toLocaleString()}</td>
                    <td>${product.revenue.toLocaleString()} MAD</td>
                    <td>
                        <span class="trend ${trendClass}">
                            ${product.trend}
                        </span>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }

    renderTransactions() {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;
        
        let html = '';
        this.transactions.forEach(transaction => {
            const time = new Date(transaction.time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const date = new Date(transaction.time).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            
            html += `
                <tr class="cursor-pointer" onclick="salesAnalytics.viewTransaction('${transaction.id}')">
                    <td><strong>${transaction.id}</strong></td>
                    <td>
                        <div>${date}</div>
                        <small class="text-muted">${time}</small>
                    </td>
                    <td>${transaction.customer}</td>
                    <td>${transaction.items}</td>
                    <td>
                        <strong class="text-success">${transaction.amount.toFixed(2)} MAD</strong>
                    </td>
                    <td>
                        <span class="payment-badge payment-${transaction.payment}">
                            ${this.getPaymentMethodName(transaction.payment)}
                        </span>
                    </td>
                    <td>${transaction.cashier}</td>
                    <td>
                        <span class="status-badge status-${transaction.status}">
                            ${this.getStatusText(transaction.status)}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-action btn-action-view" 
                                    onclick="event.stopPropagation(); salesAnalytics.viewTransaction('${transaction.id}')"
                                    title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-action btn-action-refund" 
                                    onclick="event.stopPropagation(); salesAnalytics.processRefund('${transaction.id}')"
                                    title="Process Refund">
                                <i class="fas fa-undo"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
        this.updateTransactionCount();
    }

    searchTransactions(query) {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;
        
        const filtered = this.transactions.filter(transaction => 
            transaction.id.toLowerCase().includes(query.toLowerCase()) ||
            transaction.customer.toLowerCase().includes(query.toLowerCase()) ||
            transaction.cashier.toLowerCase().includes(query.toLowerCase())
        );
        
        this.displayFilteredTransactions(filtered);
    }

    filterTransactions() {
        const paymentFilter = document.getElementById('paymentFilter').value;
        const amountFilter = document.getElementById('amountFilter').value;
        
        let filtered = this.transactions;
        
        if (paymentFilter) {
            filtered = filtered.filter(t => t.payment === paymentFilter);
        }
        
        if (amountFilter) {
            filtered = filtered.filter(t => {
                switch (amountFilter) {
                    case 'low': return t.amount < 50;
                    case 'medium': return t.amount >= 50 && t.amount <= 200;
                    case 'high': return t.amount > 200;
                    default: return true;
                }
            });
        }
        
        this.displayFilteredTransactions(filtered);
    }

    displayFilteredTransactions(transactions) {
        const tbody = document.getElementById('transactionsTableBody');
        if (!tbody) return;
        
        if (transactions.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-5">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No transactions found</h5>
                        <p class="text-muted">Try changing your search criteria</p>
                    </td>
                </tr>
            `;
        } else {
            let html = '';
            transactions.forEach(transaction => {
                const time = new Date(transaction.time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                const date = new Date(transaction.time).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                
                html += `
                    <tr class="cursor-pointer" onclick="salesAnalytics.viewTransaction('${transaction.id}')">
                        <td><strong>${transaction.id}</strong></td>
                        <td>
                            <div>${date}</div>
                            <small class="text-muted">${time}</small>
                        </td>
                        <td>${transaction.customer}</td>
                        <td>${transaction.items}</td>
                        <td>
                            <strong class="text-success">${transaction.amount.toFixed(2)} MAD</strong>
                        </td>
                        <td>
                            <span class="payment-badge payment-${transaction.payment}">
                                ${this.getPaymentMethodName(transaction.payment)}
                            </span>
                        </td>
                        <td>${transaction.cashier}</td>
                        <td>
                            <span class="status-badge status-${transaction.status}">
                                ${this.getStatusText(transaction.status)}
                            </span>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-action btn-action-view" 
                                        onclick="event.stopPropagation(); salesAnalytics.viewTransaction('${transaction.id}')"
                                        title="View Details">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-action btn-action-refund" 
                                        onclick="event.stopPropagation(); salesAnalytics.processRefund('${transaction.id}')"
                                        title="Process Refund">
                                    <i class="fas fa-undo"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            
            tbody.innerHTML = html;
        }
        
        this.updateTransactionCount(transactions.length);
    }

    clearTransactionFilters() {
        document.getElementById('transactionSearch').value = '';
        document.getElementById('paymentFilter').value = '';
        document.getElementById('amountFilter').value = '';
        
        this.renderTransactions();
        this.showNotification('All filters cleared', 'info');
    }

    updateTransactionCount(count = null) {
        const total = count || this.transactions.length;
        const element = document.getElementById('transactionCountText');
        if (element) {
            element.textContent = `Showing ${total} transactions`;
        }
    }

    viewTransaction(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            this.showNotification('Transaction not found', 'error');
            return;
        }
        
        const modalContent = this.createTransactionDetails(transaction);
        document.getElementById('transactionDetails').innerHTML = modalContent;
        
        const modal = new bootstrap.Modal(document.getElementById('transactionModal'));
        modal.show();
    }

    createTransactionDetails(transaction) {
        const date = new Date(transaction.time).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        let itemsHtml = '';
        transaction.itemsList.forEach(item => {
            itemsHtml += `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-center">${item.qty}</td>
                    <td class="text-end">${item.price.toFixed(2)} MAD</td>
                    <td class="text-end">${(item.qty * item.price).toFixed(2)} MAD</td>
                </tr>
            `;
        });
        
        const subtotal = transaction.amount;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;
        
        return `
            <div class="receipt-container">
                <div class="receipt-header text-center mb-4">
                    <h4>SUPERMAROC</h4>
                    <p class="text-muted">Agadir Store</p>
                    <p>${date}</p>
                </div>
                
                <div class="transaction-info mb-4">
                    <div class="row">
                        <div class="col-6">
                            <strong>Transaction ID:</strong><br>
                            ${transaction.id}
                        </div>
                        <div class="col-6 text-end">
                            <strong>Cashier:</strong><br>
                            ${transaction.cashier}
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12">
                            <strong>Customer:</strong><br>
                            ${transaction.customer}
                        </div>
                    </div>
                </div>
                
                <div class="items-table mb-4">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th class="text-center">Qty</th>
                                <th class="text-end">Price</th>
                                <th class="text-end">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>
                
                <div class="receipt-totals">
                    <div class="row">
                        <div class="col-6">Subtotal:</div>
                        <div class="col-6 text-end">${subtotal.toFixed(2)} MAD</div>
                    </div>
                    <div class="row">
                        <div class="col-6">Tax (10%):</div>
                        <div class="col-6 text-end">${tax.toFixed(2)} MAD</div>
                    </div>
                    <div class="row total-row">
                        <div class="col-6"><strong>TOTAL:</strong></div>
                        <div class="col-6 text-end"><strong>${total.toFixed(2)} MAD</strong></div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-6">Payment Method:</div>
                        <div class="col-6 text-end">
                            <span class="payment-badge payment-${transaction.payment}">
                                ${this.getPaymentMethodName(transaction.payment)}
                            </span>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-6">Status:</div>
                        <div class="col-6 text-end">
                            <span class="status-badge status-${transaction.status}">
                                ${this.getStatusText(transaction.status)}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="receipt-footer text-center mt-4">
                    <p class="text-muted small">Thank you for shopping at SuperMaroc!</p>
                    <p class="text-muted small">Visit us again soon</p>
                </div>
            </div>
        `;
    }

    processRefund(transactionId) {
        if (!confirm('Are you sure you want to process a refund for this transaction?')) {
            return;
        }
        
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) {
            this.showNotification('Transaction not found', 'error');
            return;
        }
        
        if (transaction.status === 'refunded') {
            this.showNotification('This transaction has already been refunded', 'warning');
            return;
        }
        
        // Update transaction status
        transaction.status = 'refunded';
        
        // Refresh display
        this.renderTransactions();
        
        // Show success message
        this.showNotification(`Refund processed for ${transaction.id}`, 'success');
        
        // Log refund action (in a real app, this would go to a server)
        console.log(`Refund processed: ${transaction.id}, Amount: ${transaction.amount} MAD`);
    }

    refreshTransactions() {
        // In a real app, this would fetch new data from the server
        this.renderTransactions();
        this.showNotification('Transactions refreshed', 'info');
    }

    openExportModal() {
        const modal = new bootstrap.Modal(document.getElementById('exportModal'));
        modal.show();
    }

    updateExportOptions() {
        const format = document.getElementById('exportFormat').value;
        const includeCharts = document.getElementById('includeCharts');
        
        // Hide/show charts option based on format
        if (format === 'csv') {
            includeCharts.disabled = true;
            includeCharts.checked = false;
        } else {
            includeCharts.disabled = false;
        }
    }

    toggleCustomDateRange(show) {
        const customRange = document.getElementById('customDateRange');
        customRange.style.display = show ? 'block' : 'none';
    }

    exportReport() {
        const format = document.getElementById('exportFormat').value;
        const dateRange = document.getElementById('exportDateRange').value;
        const includeCharts = document.getElementById('includeCharts').checked;
        
        // Get dates
        let startDate, endDate;
        
        switch (dateRange) {
            case 'today':
                startDate = endDate = new Date().toISOString().split('T')[0];
                break;
            case 'week':
                endDate = new Date().toISOString().split('T')[0];
                startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                break;
            case 'month':
                endDate = new Date().toISOString().split('T')[0];
                startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                break;
            case 'custom':
                startDate = document.getElementById('exportStartDate').value;
                endDate = document.getElementById('exportEndDate').value;
                if (!startDate || !endDate) {
                    this.showNotification('Please select custom dates', 'error');
                    return;
                }
                break;
        }
        
        // Generate filename
        const filename = `sales_report_${startDate}_to_${endDate}.${format}`;
        
        // In a real app, this would generate and download the file
        // For now, just show a notification
        this.showNotification(`Exporting ${format.toUpperCase()} report for ${startDate} to ${endDate}`, 'success');
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('exportModal')).hide();
        
        // Simulate download
        setTimeout(() => {
            this.showNotification(`${filename} downloaded successfully`, 'success');
        }, 1500);
    }

    printReceipt() {
        window.print();
    }

    // Utility methods
    getPaymentMethodName(method) {
        const methods = {
            'cash': 'Cash',
            'card': 'Card',
            'mobile': 'Mobile'
        };
        return methods[method] || method;
    }

    getStatusText(status) {
        const statuses = {
            'completed': 'Completed',
            'pending': 'Pending',
            'refunded': 'Refunded'
        };
        return statuses[status] || status;
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

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-MA', {
            style: 'currency',
            currency: 'MAD'
        }).format(amount);
    }
}

// Initialize Sales Analytics
let salesAnalytics;

document.addEventListener('DOMContentLoaded', function() {
    salesAnalytics = new SalesAnalytics();
    window.salesAnalytics = salesAnalytics;
});