package com.SuperMaroc.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idClient;
    private double total;
    private String etat;
    private String magasinAffecte;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCommande;
}
