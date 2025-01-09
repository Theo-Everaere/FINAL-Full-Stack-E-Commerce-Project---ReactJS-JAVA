package com.theoeve.ecommerce_project.repository;

import com.theoeve.ecommerce_project.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUserId(int userId);
}
