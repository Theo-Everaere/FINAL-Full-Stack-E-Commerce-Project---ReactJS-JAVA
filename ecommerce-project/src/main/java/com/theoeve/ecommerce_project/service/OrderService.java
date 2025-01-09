package com.theoeve.ecommerce_project.service;


import com.theoeve.ecommerce_project.model.OrderItem;
import com.theoeve.ecommerce_project.model.OrderItemRequest;
import com.theoeve.ecommerce_project.model.OrderRequest;
import com.theoeve.ecommerce_project.model.Orders;
import com.theoeve.ecommerce_project.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrdersRepository ordersRepository;

    @Autowired
    public OrderService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    public List<Orders> getOrdersByUserId(int userId) {
        if (userId <= 0) {
            throw new IllegalArgumentException("Invalid User ID");
        }
        return ordersRepository.findByUserId(userId);
    }

    public void createOrder(OrderRequest orderRequest) {
        Orders order = new Orders();

        order.setUserId(orderRequest.getUserId());

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(itemRequest.getProductId());
            orderItem.setName(itemRequest.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(itemRequest.getUnitPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
        }
        order.setItems(orderItems);
        order.setTotalPrice(orderRequest.getTotalPrice());

        ordersRepository.save(order);
    }
}
