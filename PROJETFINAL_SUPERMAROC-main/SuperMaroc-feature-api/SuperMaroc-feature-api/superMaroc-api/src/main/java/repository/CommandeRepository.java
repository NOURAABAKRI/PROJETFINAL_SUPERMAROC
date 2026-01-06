package com.SuperMaroc.repository;

import com.SuperMaroc.model.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Long> { }
