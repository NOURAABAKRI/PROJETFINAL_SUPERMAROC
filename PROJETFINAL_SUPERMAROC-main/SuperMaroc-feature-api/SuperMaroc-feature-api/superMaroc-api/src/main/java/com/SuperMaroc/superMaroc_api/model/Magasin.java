package com.SuperMaroc.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Magasin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String ville;
}

