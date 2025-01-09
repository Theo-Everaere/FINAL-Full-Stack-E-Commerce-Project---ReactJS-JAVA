package com.theoeve.ecommerce_project.model;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private Long userId;
    private List<OrderItemRequest> items;
    private Double totalPrice;

}
