package com.SuperMaroc.controller;

import com.SuperMaroc.service.OrderServiceProxy;
import dto.OrderRequestDTO;
import dto.OrderResultDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderServiceProxy orderService;

    public OrderController(OrderServiceProxy orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResultDTO> createOrder(
            @RequestBody OrderRequestDTO request) {

        OrderResultDTO result = orderService.createOrder(request);
        return ResponseEntity.ok(result);
    }
}