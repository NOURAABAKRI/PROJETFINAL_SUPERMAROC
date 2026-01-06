// Alerts Management JavaScript
class AlertsManager {
    constructor() {
        this.alerts = [];
        this.selectedAlerts = new Set();
        this.filters = {
            priority: 'all',
            status: 'all',
            category: 'all',
            store: 'all',
            search: ''
        };
        this.charts = {};
        
        this.init();
    }

    init() {
        this.loadSampleAlerts();
        this.initCharts();
        this.setupEventListeners();
        this.renderDashboard();
        this.renderAlertsList();
        this.renderTimeline();
    }

    loadSampleAlerts() {
        this.alerts = [
            {
                id: 'ALT-2024-001',
                title: 'Critical Stock Shortage',
                description: 'Fresh Milk 1L is out of stock in main fridge',
                category: 'stock',
                priority: 'critical',
                status: 'new',
                store: 'agadir',
                createdAt: new Date('2024-11-11 10:30:15').toISOString(),
                updatedAt: new Date('2024-11-11 10:30:15').toISOString(),
                assignedTo: 'Store Manager',
                dueDate: new Date('2024-11-11 18:00:00').toISOString(),
                impact: 'High - Affects 20% of daily sales',
                actions: ['Reorder from supplier', 'Check alternative brands'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 10:30:15').toISOString(),
                        description: 'Alert automatically generated'
                    }
                ]
            },
            {
                id: 'ALT-2024-002',
                title: 'Temperature Alert - Freezer 2',
                description: 'Temperature above threshold (-15°C detected, should be -18°C to -22°C)',
                category: 'operations',
                priority: 'high',
                status: 'in-progress',
                store: 'casa',
                createdAt: new Date('2024-11-11 09:45:22').toISOString(),
                updatedAt: new Date('2024-11-11 11:20:00').toISOString(),
                assignedTo: 'Maintenance Team',
                dueDate: new Date('2024-11-11 14:00:00').toISOString(),
                impact: 'Medium - Risk of product spoilage',
                actions: ['Check compressor', 'Transfer products to backup freezer'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 09:45:22').toISOString(),
                        description: 'Sensor reading above threshold'
                    },
                    {
                        action: 'acknowledged',
                        user: 'Ahmed Hassan',
                        timestamp: new Date('2024-11-11 10:15:00').toISOString(),
                        description: 'Maintenance team notified'
                    }
                ]
            },
            {
                id: 'ALT-2024-003',
                title: 'Sales Drop Detected',
                description: '40% decrease in sales between 18:00-19:00 compared to yesterday',
                category: 'sales',
                priority: 'high',
                status: 'new',
                store: 'marrakech',
                createdAt: new Date('2024-11-11 19:30:00').toISOString(),
                updatedAt: new Date('2024-11-11 19:30:00').toISOString(),
                assignedTo: 'Regional Manager',
                dueDate: new Date('2024-11-12 10:00:00').toISOString(),
                impact: 'High - Significant revenue loss',
                actions: ['Check POS system', 'Review staff schedule', 'Investigate competitor activity'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 19:30:00').toISOString(),
                        description: 'Anomaly detected in sales data'
                    }
                ]
            },
            {
                id: 'ALT-2024-004',
                title: 'Multiple Failed Login Attempts',
                description: '5 failed login attempts detected from unknown IP address',
                category: 'security',
                priority: 'critical',
                status: 'acknowledged',
                store: 'agadir',
                createdAt: new Date('2024-11-11 03:15:30').toISOString(),
                updatedAt: new Date('2024-11-11 03:45:00').toISOString(),
                assignedTo: 'IT Security',
                dueDate: new Date('2024-11-11 12:00:00').toISOString(),
                impact: 'Critical - Potential security breach',
                actions: ['Lock affected account', 'Review access logs', 'Notify security team'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 03:15:30').toISOString(),
                        description: 'Security rule triggered'
                    },
                    {
                        action: 'acknowledged',
                        user: 'IT Security',
                        timestamp: new Date('2024-11-11 03:45:00').toISOString(),
                        description: 'Account locked, investigation started'
                    }
                ]
            },
            {
                id: 'ALT-2024-005',
                title: 'Customer Complaint - Product Quality',
                description: 'Customer reported expired products on shelf',
                category: 'customer',
                priority: 'medium',
                status: 'resolved',
                store: 'rabat',
                createdAt: new Date('2024-11-10 14:20:45').toISOString(),
                updatedAt: new Date('2024-11-11 09:15:00').toISOString(),
                assignedTo: 'Quality Control',
                dueDate: new Date('2024-11-11 10:00:00').toISOString(),
                impact: 'Medium - Reputation risk',
                actions: ['Remove expired products', 'Check all similar products', 'Refund customer'],
                timeline: [
                    {
                        action: 'created',
                        user: 'Sarah Johnson',
                        timestamp: new Date('2024-11-10 14:20:45').toISOString(),
                        description: 'Customer complaint received'
                    },
                    {
                        action: 'acknowledged',
                        user: 'Quality Control',
                        timestamp: new Date('2024-11-10 15:30:00').toISOString(),
                        description: 'Investigation started'
                    },
                    {
                        action: 'resolved',
                        user: 'Quality Control',
                        timestamp: new Date('2024-11-11 09:15:00').toISOString(),
                        description: 'Expired products removed, customer refunded'
                    }
                ]
            },
            {
                id: 'ALT-2024-006',
                title: 'Low Stock Alert - Mineral Water',
                description: 'Stock below threshold (45 units, threshold: 50)',
                category: 'stock',
                priority: 'medium',
                status: 'new',
                store: 'agadir',
                createdAt: new Date('2024-11-11 08:15:00').toISOString(),
                updatedAt: new Date('2024-11-11 08:15:00').toISOString(),
                assignedTo: 'Stock Clerk',
                dueDate: new Date('2024-11-12 12:00:00').toISOString(),
                impact: 'Low - Will run out in 2 days',
                actions: ['Place reorder', 'Check incoming shipments'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 08:15:00').toISOString(),
                        description: 'Stock level below threshold'
                    }
                ]
            },
            {
                id: 'ALT-2024-007',
                title: 'POS System Slow Performance',
                description: 'Checkout system responding slowly during peak hours',
                category: 'operations',
                priority: 'high',
                status: 'in-progress',
                store: 'casa',
                createdAt: new Date('2024-11-10 18:45:00').toISOString(),
                updatedAt: new Date('2024-11-11 10:00:00').toISOString(),
                assignedTo: 'IT Support',
                dueDate: new Date('2024-11-11 17:00:00').toISOString(),
                impact: 'High - Affects customer experience',
                actions: ['Restart system', 'Check network connection', 'Clear cache'],
                timeline: [
                    {
                        action: 'created',
                        user: 'Cashier Report',
                        timestamp: new Date('2024-11-10 18:45:00').toISOString(),
                        description: 'Performance issue reported'
                    },
                    {
                        action: 'acknowledged',
                        user: 'IT Support',
                        timestamp: new Date('2024-11-11 09:00:00').toISOString(),
                        description: 'Troubleshooting in progress'
                    }
                ]
            },
            {
                id: 'ALT-2024-008',
                title: 'Expiring Products Alert',
                description: '15 products expiring within 7 days',
                category: 'stock',
                priority: 'medium',
                status: 'new',
                store: 'marrakech',
                createdAt: new Date('2024-11-11 07:00:00').toISOString(),
                updatedAt: new Date('2024-11-11 07:00:00').toISOString(),
                assignedTo: 'Store Manager',
                dueDate: new Date('2024-11-13 12:00:00').toISOString(),
                impact: 'Medium - Potential waste',
                actions: ['Create promotion', 'Move to front of shelf', 'Consider donation'],
                timeline: [
                    {
                        action: 'created',
                        user: 'System',
                        timestamp: new Date('2024-11-11 07:00:00').toISOString(),
                        description: 'Daily expiry check completed'
                    }
                ]
            }
        ];
    }

    initCharts() {
        // Alerts Trend Chart
        const trendCtx = document.getElementById('alertsTrendChart');
        if (trendCtx) {
            this.charts.trend = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Critical',
                            data: [2, 1, 3, 2, 4, 1, 3],
                            borderColor: '#DC3545',
                            backgroundColor: 'rgba(220, 53, 69, 0.1)',
                            borderWidth: 2,
                            tension: 0.4
                        },
                        {
                            label: 'High',
                            data: [3, 2, 4, 3, 5, 2, 4],
                            borderColor: '#FF6B35',
                            backgroundColor: 'rgba(255, 107, 53, 0.1)',
                            borderWidth: 2,
                            tension: 0.4
                        },
                        {
                            label: 'Medium',
                            data: [5, 4, 6, 5, 7, 4, 6],
                            borderColor: '#17A2B8',
                            backgroundColor: 'rgba(23, 162, 184, 0.1)',
                            borderWidth: 2,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Alerts'
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
                    labels: ['Stock', 'Sales', 'Security', 'Operations', 'Customer', 'Financial'],
                    datasets: [{
                        data: [35, 20, 15, 18, 8, 4],
                        backgroundColor: [
                            '#0d6efd', // Stock - Blue
                            '#28a745', // Sales - Green
                            '#dc3545', // Security - Red
                            '#ffc107', // Operations - Yellow
                            '#17a2b8', // Customer - Cyan
                            '#6f42c1'  // Financial - Purple
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    cutout: '60%'
                }
            });

            // Create legend
            this.createCategoryLegend();
        }
    }

    createCategoryLegend() {
        const container = document.getElementById('categoryLegend');
        if (!container) return;

        const categories = [
            { name: 'Stock', color: '#0d6efd' },
            { name: 'Sales', color: '#28a745' },
            { name: 'Security', color: '#dc3545' },
            { name: 'Operations', color: '#ffc107' },
            { name: 'Customer', color: '#17a2b8' },
            { name: 'Financial', color: '#6f42c1' }
        ];

        let html = '';
        categories.forEach(category => {
            html += `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${category.color}"></div>
                    <span>${category.name}</span>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    setupEventListeners() {
        // Filter dropdown
        document.querySelectorAll('[data-filter]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
            });
        });

        // Create alert button
        document.getElementById('createAlertBtn').addEventListener('click', () => {
            this.openCreateAlertModal();
        });

        // Save alert button
        document.getElementById('saveAlertBtn').addEventListener('click', () => {
            this.saveAlert();
        });

        // Refresh alerts
        document.getElementById('refreshAlertsBtn').addEventListener('click', () => {
            this.refreshAlerts();
        });

        // Export alerts
        document.getElementById('exportAlertsBtn').addEventListener('click', () => {
            this.exportAlerts();
        });

        // Bulk actions
        document.getElementById('bulkActionBtn').addEventListener('click', () => {
            this.openBulkActionsModal();
        });

        // Apply bulk action
        document.getElementById('applyBulkActionBtn').addEventListener('click', () => {
            this.applyBulkAction();
        });

        // Bulk action select change
        document.getElementById('bulkActionSelect').addEventListener('change', (e) => {
            this.updateBulkActionFields(e.target.value);
        });

        // Alert search
        document.getElementById('alertSearch').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.renderAlertsList();
        });

        // Category filter
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.renderAlertsList();
        });

        // Store filter
        document.getElementById('storeFilter').addEventListener('change', (e) => {
            this.filters.store = e.target.value;
            this.renderAlertsList();
        });

        // Clear filters
        document.getElementById('clearAlertFiltersBtn').addEventListener('click', () => {
            this.clearFilters();
        });

        // Select all checkbox
        document.getElementById('selectAllAlerts').addEventListener('change', (e) => {
            this.toggleSelectAll(e.target.checked);
        });

        // Period selector buttons
        document.querySelectorAll('[data-period]').forEach(button => {
            button.addEventListener('click', (e) => {
                const period = e.target.dataset.period;
                this.changePeriod(period);
            });
        });

        // Resolve alert button
        document.getElementById('resolveAlertBtn')?.addEventListener('click', () => {
            this.resolveCurrentAlert();
        });
    }

    renderDashboard() {
        this.updateStats();
        this.updateAnalytics();
    }

    updateStats() {
        const critical = this.alerts.filter(a => a.priority === 'critical' && a.status !== 'resolved').length;
        const high = this.alerts.filter(a => a.priority === 'high' && a.status !== 'resolved').length;
        const unresolved = this.alerts.filter(a => a.status !== 'resolved').length;
        const today = this.alerts.filter(a => this.isToday(a.createdAt)).length;
        
        // Calculate average response time (simulated)
        const avgResponseTime = '45m';
        const resolutionRate = '92%';
        const falsePositives = '8%';

        // Update UI
        document.getElementById('criticalCount').textContent = critical;
        document.getElementById('highCount').textContent = high;
        document.getElementById('unresolvedCount').textContent = unresolved;
        document.getElementById('todayCount').textContent = today;
        document.getElementById('avgResponseTime').textContent = avgResponseTime;
        document.getElementById('resolutionRate').textContent = resolutionRate;
        document.getElementById('falsePositives').textContent = falsePositives;
        document.getElementById('unresolvedRate').textContent = `${100 - parseInt(resolutionRate)}%`;
    }

    updateAnalytics() {
        // Update charts if needed
        if (this.charts.trend) {
            // In a real app, this would update chart data based on filters
            this.charts.trend.update();
        }
    }

    renderAlertsList() {
        const tbody = document.getElementById('alertsTableBody');
        if (!tbody) return;

        // Filter alerts
        let filteredAlerts = this.alerts;
        
        if (this.filters.priority !== 'all') {
            filteredAlerts = filteredAlerts.filter(a => a.priority === this.filters.priority);
        }
        
        if (this.filters.status !== 'all') {
            filteredAlerts = filteredAlerts.filter(a => a.status === this.filters.status);
        }
        
        if (this.filters.category !== 'all') {
            filteredAlerts = filteredAlerts.filter(a => a.category === this.filters.category);
        }
        
        if (this.filters.store !== 'all') {
            filteredAlerts = filteredAlerts.filter(a => a.store === this.filters.store);
        }
        
        if (this.filters.search) {
            filteredAlerts = filteredAlerts.filter(a => 
                a.title.toLowerCase().includes(this.filters.search) ||
                a.description.toLowerCase().includes(this.filters.search) ||
                a.id.toLowerCase().includes(this.filters.search)
            );
        }

        // Clear table
        tbody.innerHTML = '';

        if (filteredAlerts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center py-5">
                        <i class="fas fa-bell-slash fa-3x text-muted mb-3"></i>
                        <h5 class="text-muted">No alerts found</h5>
                        <p class="text-muted">Try changing your filters or create a new alert</p>
                    </td>
                </tr>
            `;
        } else {
            // Sort by priority and creation date
            filteredAlerts.sort((a, b) => {
                const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            // Render alerts
            filteredAlerts.forEach(alert => {
                const row = this.createAlertRow(alert);
                tbody.appendChild(row);
            });
        }

        // Update count
        this.updateAlertCount(filteredAlerts.length);
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    createAlertRow(alert) {
        const row = document.createElement('tr');
        row.dataset.id = alert.id;
        
        const timeAgo = this.getTimeAgo(alert.createdAt);
        const storeName = this.getStoreName(alert.store);
        const isSelected = this.selectedAlerts.has(alert.id);
        
        row.innerHTML = `
            <td>
                <input type="checkbox" class="alert-checkbox" 
                       data-id="${alert.id}" 
                       ${isSelected ? 'checked' : ''}>
            </td>
            <td>
                <strong class="text-muted">${alert.id}</strong>
            </td>
            <td>
                <div class="alert-item">
                    <div class="alert-item-icon">
                        <i class="fas ${this.getAlertIcon(alert.category)} text-${this.getPriorityColor(alert.priority)}"></i>
                    </div>
                    <div class="alert-item-content">
                        <div class="alert-item-title">${alert.title}</div>
                        <div class="alert-item-description">${alert.description}</div>
                        <div class="alert-item-meta">
                            <i class="fas fa-user"></i> ${alert.assignedTo || 'Unassigned'}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <span class="category-badge category-${alert.category}">
                    ${this.getCategoryDisplayName(alert.category)}
                </span>
            </td>
            <td>
                <span class="priority-badge priority-${alert.priority}">
                    ${this.getPriorityDisplayName(alert.priority)}
                </span>
            </td>
            <td>${storeName}</td>
            <td>
                <div>${this.formatTime(alert.createdAt)}</div>
                <small class="text-muted">${timeAgo}</small>
            </td>
            <td>
                <span class="status-badge status-${alert.status}">
                    ${this.getStatusDisplayName(alert.status)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-action btn-action-view" 
                            onclick="alertsManager.viewAlert('${alert.id}')"
                            title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${alert.status === 'new' ? `
                    <button class="btn btn-action btn-action-acknowledge" 
                            onclick="alertsManager.acknowledgeAlert('${alert.id}')"
                            title="Acknowledge">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    ${alert.status !== 'resolved' ? `
                    <button class="btn btn-action btn-action-resolve" 
                            onclick="alertsManager.resolveAlert('${alert.id}')"
                            title="Mark as Resolved">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;

        // Add checkbox event listener
        const checkbox = row.querySelector('.alert-checkbox');
        checkbox.addEventListener('change', (e) => {
            this.toggleAlertSelection(alert.id, e.target.checked);
        });

        return row;
    }

    renderTimeline() {
        const container = document.getElementById('alertTimeline');
        if (!container) return;

        // Get recent alerts (last 5)
        const recentAlerts = [...this.alerts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        let html = '';
        recentAlerts.forEach(alert => {
            const timeAgo = this.getTimeAgo(alert.createdAt);
            const storeName = this.getStoreName(alert.store);
            
            html += `
                <div class="timeline-item ${alert.priority}">
                    <div class="timeline-content">
                        <div class="timeline-title">${alert.title}</div>
                        <div class="timeline-description">${alert.description}</div>
                        <div class="timeline-meta">
                            <span>
                                <i class="fas fa-store"></i> ${storeName}
                                <i class="fas fa-user ms-2"></i> ${alert.assignedTo || 'Unassigned'}
                            </span>
                            <span>${timeAgo}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    updateAlertCount(count) {
        const element = document.getElementById('alertCountText');
        if (element) {
            const total = this.alerts.length;
            element.textContent = `Showing ${count} of ${total} alerts`;
        }
    }

    applyFilter(filter) {
        // Parse filter type from filter string
        if (['critical', 'high', 'medium', 'low'].includes(filter)) {
            this.filters.priority = filter;
        } else if (['new', 'in-progress', 'resolved', 'acknowledged'].includes(filter)) {
            this.filters.status = filter;
        } else if (filter === 'all') {
            this.filters.priority = 'all';
            this.filters.status = 'all';
        }
        
        this.renderAlertsList();
        this.showNotification(`Filter applied: ${filter}`, 'info');
    }

    clearFilters() {
        this.filters = {
            priority: 'all',
            status: 'all',
            category: 'all',
            store: 'all',
            search: ''
        };
        
        document.getElementById('alertSearch').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('storeFilter').value = '';
        
        this.renderAlertsList();
        this.showNotification('All filters cleared', 'info');
    }

    openCreateAlertModal() {
        const modal = new bootstrap.Modal(document.getElementById('createAlertModal'));
        modal.show();
    }

    saveAlert() {
        const title = document.getElementById('alertTitle').value.trim();
        const category = document.getElementById('alertCategory').value;
        const priority = document.getElementById('alertPriority').value;
        const store = document.getElementById('alertStore').value;
        const description = document.getElementById('alertDescription').value.trim();
        const assignedTo = document.getElementById('alertAssignedTo').value;
        const dueDate = document.getElementById('alertDueDate').value;

        // Validate
        if (!title || !category || !priority || !store || !description) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Create new alert
        const newAlert = {
            id: `ALT-${new Date().getFullYear()}-${String(this.alerts.length + 1).padStart(3, '0')}`,
            title,
            description,
            category,
            priority,
            store,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            assignedTo: assignedTo || null,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            impact: 'To be assessed',
            actions: [],
            timeline: [
                {
                    action: 'created',
                    user: 'Manual Entry',
                    timestamp: new Date().toISOString(),
                    description: 'Alert created manually'
                }
            ]
        };

        // Add to alerts array
        this.alerts.unshift(newAlert);
        
        // Update UI
        this.renderDashboard();
        this.renderAlertsList();
        this.renderTimeline();
        
        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('createAlertModal')).hide();
        document.getElementById('alertForm').reset();
        
        this.showNotification('Alert created successfully', 'success');
    }

    viewAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) {
            this.showNotification('Alert not found', 'error');
            return;
        }

        const modalContent = this.createAlertDetails(alert);
        document.getElementById('alertDetailsContent').innerHTML = modalContent;
        
        // Store current alert ID for resolution
        document.getElementById('alertDetailsModal').dataset.alertId = alertId;
        
        const modal = new bootstrap.Modal(document.getElementById('alertDetailsModal'));
        modal.show();
    }

    createAlertDetails(alert) {
        const createdAt = this.formatDateTime(alert.createdAt);
        const updatedAt = this.formatDateTime(alert.updatedAt);
        const dueDate = alert.dueDate ? this.formatDateTime(alert.dueDate) : 'Not set';
        const storeName = this.getStoreName(alert.store);
        
        let actionsHtml = '';
        if (alert.actions && alert.actions.length > 0) {
            actionsHtml = `
                <div class="mb-3">
                    <h6><i class="fas fa-tasks"></i> Recommended Actions</h6>
                    <ul class="list-group">
                        ${alert.actions.map(action => `<li class="list-group-item">${action}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        let timelineHtml = '';
        if (alert.timeline && alert.timeline.length > 0) {
            timelineHtml = `
                <div class="alert-timeline-details">
                    <h6><i class="fas fa-history"></i> Timeline</h6>
                    ${alert.timeline.map(step => `
                        <div class="timeline-step">
                            <div class="timeline-step-icon ${step.action}">
                                <i class="fas fa-${this.getTimelineIcon(step.action)}"></i>
                            </div>
                            <div class="timeline-step-content">
                                <div class="timeline-step-title">${this.getTimelineActionName(step.action)}</div>
                                <div class="timeline-step-description">${step.description}</div>
                                <div class="timeline-step-time">
                                    <i class="fas fa-user"></i> ${step.user} • 
                                    <i class="fas fa-clock"></i> ${this.formatDateTime(step.timestamp)}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        return `
            <div class="alert-details-container">
                <div class="alert-details-header">
                    <div class="alert-details-title">${alert.title}</div>
                    <div class="alert-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Priority</span>
                            <span class="meta-value">
                                <span class="priority-badge priority-${alert.priority}">
                                    ${this.getPriorityDisplayName(alert.priority)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Category</span>
                            <span class="meta-value">
                                <span class="category-badge category-${alert.category}">
                                    ${this.getCategoryDisplayName(alert.category)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Status</span>
                            <span class="meta-value">
                                <span class="status-badge status-${alert.status}">
                                    ${this.getStatusDisplayName(alert.status)}
                                </span>
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Store</span>
                            <span class="meta-value">${storeName}</span>
                        </div>
                    </div>
                    <div class="alert-details-meta">
                        <div class="meta-item">
                            <span class="meta-label">Created</span>
                            <span class="meta-value">${createdAt}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Last Updated</span>
                            <span class="meta-value">${updatedAt}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Due Date</span>
                            <span class="meta-value">${dueDate}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Assigned To</span>
                            <span class="meta-value">${alert.assignedTo || 'Unassigned'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="alert-details-description">
                    <h6><i class="fas fa-info-circle"></i> Description</h6>
                    <p>${alert.description}</p>
                    ${alert.impact ? `<p class="mt-2"><strong>Impact:</strong> ${alert.impact}</p>` : ''}
                </div>
                
                ${actionsHtml}
                ${timelineHtml}
            </div>
        `;
    }

    acknowledgeAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) return;

        if (alert.status === 'acknowledged') {
            this.showNotification('Alert already acknowledged', 'warning');
            return;
        }

        // Update alert
        alert.status = 'acknowledged';
        alert.updatedAt = new Date().toISOString();
        
        // Add to timeline
        alert.timeline.push({
            action: 'acknowledged',
            user: 'Current User',
            timestamp: new Date().toISOString(),
            description: 'Alert acknowledged'
        });

        // Update UI
        this.renderDashboard();
        this.renderAlertsList();
        this.renderTimeline();
        
        this.showNotification(`Alert ${alertId} acknowledged`, 'success');
    }

    resolveAlert(alertId) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) return;

        if (alert.status === 'resolved') {
            this.showNotification('Alert already resolved', 'warning');
            return;
        }

        // Update alert
        alert.status = 'resolved';
        alert.updatedAt = new Date().toISOString();
        
        // Add to timeline
        alert.timeline.push({
            action: 'resolved',
            user: 'Current User',
            timestamp: new Date().toISOString(),
            description: 'Alert resolved'
        });

        // Update UI
        this.renderDashboard();
        this.renderAlertsList();
        this.renderTimeline();
        
        this.showNotification(`Alert ${alertId} marked as resolved`, 'success');
    }

    resolveCurrentAlert() {
        const modal = document.getElementById('alertDetailsModal');
        const alertId = modal.dataset.alertId;
        
        if (alertId) {
            this.resolveAlert(alertId);
            bootstrap.Modal.getInstance(modal).hide();
        }
    }

    toggleAlertSelection(alertId, selected) {
        if (selected) {
            this.selectedAlerts.add(alertId);
        } else {
            this.selectedAlerts.delete(alertId);
        }
        
        // Update select all checkbox
        this.updateSelectAllCheckbox();
    }

    toggleSelectAll(selectAll) {
        const checkboxes = document.querySelectorAll('.alert-checkbox');
        const visibleAlerts = Array.from(document.querySelectorAll('#alertsTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (selectAll) {
            visibleAlerts.forEach(id => this.selectedAlerts.add(id));
            checkboxes.forEach(cb => cb.checked = true);
        } else {
            visibleAlerts.forEach(id => this.selectedAlerts.delete(id));
            checkboxes.forEach(cb => cb.checked = false);
        }
    }

    updateSelectAllCheckbox() {
        const selectAllCheckbox = document.getElementById('selectAllAlerts');
        if (!selectAllCheckbox) return;
        
        const visibleAlerts = Array.from(document.querySelectorAll('#alertsTableBody tr[data-id]'))
            .map(row => row.dataset.id);
        
        if (visibleAlerts.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.disabled = true;
            return;
        }
        
        selectAllCheckbox.disabled = false;
        const allSelected = visibleAlerts.every(id => this.selectedAlerts.has(id));
        selectAllCheckbox.checked = allSelected;
        selectAllCheckbox.indeterminate = !allSelected && visibleAlerts.some(id => this.selectedAlerts.has(id));
    }

    openBulkActionsModal() {
        if (this.selectedAlerts.size === 0) {
            this.showNotification('Please select alerts first', 'warning');
            return;
        }
        
        const modal = new bootstrap.Modal(document.getElementById('bulkActionsModal'));
        modal.show();
    }

    updateBulkActionFields(action) {
        const extraContainer = document.getElementById('bulkActionExtra');
        if (!extraContainer) return;
        
        let html = '';
        
        switch (action) {
            case 'assign':
                html = `
                    <div class="mb-3">
                        <label class="form-label">Assign To</label>
                        <select class="form-select" id="bulkAssignTo">
                            <option value="store-manager">Store Manager</option>
                            <option value="assistant-manager">Assistant Manager</option>
                            <option value="stock-clerk">Stock Clerk</option>
                            <option value="cashier">Cashier</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="it-support">IT Support</option>
                        </select>
                    </div>
                `;
                break;
            case 'change-priority':
                html = `
                    <div class="mb-3">
                        <label class="form-label">New Priority</label>
                        <select class="form-select" id="bulkNewPriority">
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                `;
                break;
        }
        
        extraContainer.innerHTML = html;
        extraContainer.style.display = html ? 'block' : 'none';
    }

    applyBulkAction() {
        const action = document.getElementById('bulkActionSelect').value;
        if (!action) {
            this.showNotification('Please select an action', 'error');
            return;
        }
        
        const alertIds = Array.from(this.selectedAlerts);
        
        switch (action) {
            case 'acknowledge':
                alertIds.forEach(id => this.acknowledgeAlert(id));
                break;
                
            case 'assign':
                const assignTo = document.getElementById('bulkAssignTo').value;
                alertIds.forEach(id => this.assignAlert(id, assignTo));
                break;
                
            case 'change-priority':
                const newPriority = document.getElementById('bulkNewPriority').value;
                alertIds.forEach(id => this.changeAlertPriority(id, newPriority));
                break;
                
            case 'resolve':
                alertIds.forEach(id => this.resolveAlert(id));
                break;
                
            case 'archive':
                alertIds.forEach(id => this.archiveAlert(id));
                break;
        }
        
        // Clear selection
        this.selectedAlerts.clear();
        
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('bulkActionsModal')).hide();
        
        this.showNotification(`Action applied to ${alertIds.length} alerts`, 'success');
    }

    assignAlert(alertId, assignTo) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) return;
        
        alert.assignedTo = this.getAssigneeName(assignTo);
        alert.updatedAt = new Date().toISOString();
        
        // Update UI
        this.renderAlertsList();
    }

    changeAlertPriority(alertId, newPriority) {
        const alert = this.alerts.find(a => a.id === alertId);
        if (!alert) return;
        
        alert.priority = newPriority;
        alert.updatedAt = new Date().toISOString();
        
        // Update UI
        this.renderDashboard();
        this.renderAlertsList();
    }

    archiveAlert(alertId) {
        // In a real app, this would move alert to archive
        // For now, just mark as resolved
        this.resolveAlert(alertId);
    }

    refreshAlerts() {
        // In a real app, this would fetch new data from server
        this.renderDashboard();
        this.renderAlertsList();
        this.renderTimeline();
        
        this.showNotification('Alerts refreshed', 'info');
    }

    exportAlerts() {
        // Get selected alerts or all if none selected
        const alertsToExport = this.selectedAlerts.size > 0
            ? this.alerts.filter(a => this.selectedAlerts.has(a.id))
            : this.alerts;
        
        if (alertsToExport.length === 0) {
            this.showNotification('No alerts to export', 'warning');
            return;
        }
        
        // Prepare CSV data
        const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Store', 'Created At', 'Assigned To'];
        const csvData = alertsToExport.map(alert => [
            alert.id,
            alert.title,
            this.getCategoryDisplayName(alert.category),
            this.getPriorityDisplayName(alert.priority),
            this.getStatusDisplayName(alert.status),
            this.getStoreName(alert.store),
            this.formatDateTime(alert.createdAt),
            alert.assignedTo || 'Unassigned'
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.map(cell => `"${cell}"`).join(','))
            .join('\n');
        
        // Download CSV
        this.downloadFile(csvContent, `alerts_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
        
        this.showNotification(`${alertsToExport.length} alerts exported to CSV`, 'success');
    }

    changePeriod(period) {
        // Update active button
        document.querySelectorAll('[data-period]').forEach(button => {
            button.classList.toggle('active', button.dataset.period === period);
        });
        
        // In a real app, this would update chart data based on period
        this.showNotification(`Showing ${period} data`, 'info');
    }

    // Utility Methods
    isToday(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return `${diffDays}d ago`;
    }

    formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

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

    getAlertIcon(category) {
        const icons = {
            'stock': 'fa-box',
            'sales': 'fa-chart-line',
            'security': 'fa-shield-alt',
            'operations': 'fa-cogs',
            'customer': 'fa-user',
            'financial': 'fa-money-bill-wave'
        };
        return icons[category] || 'fa-bell';
    }

    getPriorityColor(priority) {
        const colors = {
            'critical': 'danger',
            'high': 'warning',
            'medium': 'info',
            'low': 'secondary'
        };
        return colors[priority] || 'secondary';
    }

    getPriorityDisplayName(priority) {
        const names = {
            'critical': 'Critical',
            'high': 'High',
            'medium': 'Medium',
            'low': 'Low'
        };
        return names[priority] || priority;
    }

    getCategoryDisplayName(category) {
        const names = {
            'stock': 'Stock',
            'sales': 'Sales',
            'security': 'Security',
            'operations': 'Operations',
            'customer': 'Customer',
            'financial': 'Financial'
        };
        return names[category] || category;
    }

    getStatusDisplayName(status) {
        const names = {
            'new': 'New',
            'in-progress': 'In Progress',
            'resolved': 'Resolved',
            'acknowledged': 'Acknowledged'
        };
        return names[status] || status;
    }

    getStoreName(storeCode) {
        const stores = {
            'agadir': 'Agadir',
            'casa': 'Casablanca',
            'marrakech': 'Marrakech',
            'rabat': 'Rabat'
        };
        return stores[storeCode] || storeCode;
    }

    getAssigneeName(assignCode) {
        const assignees = {
            'store-manager': 'Store Manager',
            'assistant-manager': 'Assistant Manager',
            'stock-clerk': 'Stock Clerk',
            'cashier': 'Cashier',
            'maintenance': 'Maintenance',
            'it-support': 'IT Support'
        };
        return assignees[assignCode] || assignCode;
    }

    getTimelineIcon(action) {
        const icons = {
            'created': 'plus-circle',
            'acknowledged': 'check',
            'resolved': 'check-circle',
            'updated': 'edit',
            'assigned': 'user-check'
        };
        return icons[action] || 'history';
    }

    getTimelineActionName(action) {
        const names = {
            'created': 'Alert Created',
            'acknowledged': 'Alert Acknowledged',
            'resolved': 'Alert Resolved',
            'updated': 'Alert Updated',
            'assigned': 'Alert Assigned'
        };
        return names[action] || action;
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

// Initialize Alerts Manager
let alertsManager;

document.addEventListener('DOMContentLoaded', function() {
    alertsManager = new AlertsManager();
    window.alertsManager = alertsManager;
});