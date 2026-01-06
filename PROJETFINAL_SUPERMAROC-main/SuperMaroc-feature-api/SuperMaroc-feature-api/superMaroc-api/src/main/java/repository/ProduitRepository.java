package com.SuperMaroc.repository;

import com.SuperMaroc.model.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByMagasin(String magasin);
}
