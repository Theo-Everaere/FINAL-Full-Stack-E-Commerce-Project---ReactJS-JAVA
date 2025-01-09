package com.theoeve.ecommerce_project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Orders order;

    private Long productId;

    private String name;

    private int quantity;

    private Double unitPrice;

    // images files
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageDate;
}
