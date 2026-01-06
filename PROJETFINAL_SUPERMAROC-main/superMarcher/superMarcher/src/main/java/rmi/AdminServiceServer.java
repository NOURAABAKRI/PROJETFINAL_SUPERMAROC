package service;

import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class AdminServiceServer {
    public static void main(String[] args) {
        try {
            // Start RMI registry
            LocateRegistry.createRegistry(1099);

            // Bind AdminService implementation
            AdminServiceImpl adminService = new AdminServiceImpl();
            Naming.rebind("AdminService", adminService);

            System.out.println("✅ AdminService RMI server started on port 1099");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}