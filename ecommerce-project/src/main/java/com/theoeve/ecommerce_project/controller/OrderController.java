package com.theoeve.ecommerce_project.controller;

import com.theoeve.ecommerce_project.model.OrderRequest;
import com.theoeve.ecommerce_project.model.Orders;
import com.theoeve.ecommerce_project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Orders>> getOrdersByUserId(@PathVariable int userId) {
        if (userId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.emptyList());
        }

        List<Orders> orders = orderService.getOrdersByUserId(userId);
        if (orders == null || orders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
        }


        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }


    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {
        if (orderRequest == null || orderRequest.getItems().isEmpty() || orderRequest.getUserId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Données de commande invalides.");
        }

        try {
            orderService.createOrder(orderRequest);
            return ResponseEntity.ok("Commande passée avec succès !");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors de la commande : " + e.getMessage());
        }
    }

}
