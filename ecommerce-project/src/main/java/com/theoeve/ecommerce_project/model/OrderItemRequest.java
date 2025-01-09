package com.theoeve.ecommerce_project.model;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;
    private String name;
    private int quantity;
    private Double unitPrice;

}
