package com.SuperMaroc.service;

import dto.OrderRequestDTO;
import dto.OrderResultDTO;
import service.OrderService;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.rmi.Naming;

@Service
public class OrderServiceProxy {

    private OrderService remote;

    @PostConstruct
    public void init() {
        try {
            remote = (OrderService) Naming.lookup("rmi://localhost:1099/OrderService");
            System.out.println("OrderService RMI connected successfully");
        } catch (Exception e) {
            System.err.println("Unable to connect to OrderService: " + e.getMessage());
            remote = null;
        }
    }

    public OrderResultDTO createOrder(OrderRequestDTO request) {
        if (remote == null) {
            throw new IllegalStateException("OrderService RMI is not available.");
        }

        try {
            return remote.createOrder(request);
        } catch (Exception e) {
            throw new RuntimeException("Unable to create order: " + e.getMessage(), e);
        }
    }
}