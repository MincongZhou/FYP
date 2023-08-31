package com.wahyaumau.springbootsqlite.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "favorite")
@Data                           // Automatic generation of getter and setter
@NoArgsConstructor
@AllArgsConstructor             // Automatic generation of no-argument constructors and all-argument constructors
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)                                   
    private Long user_id;

    @Column(nullable = false)
    private Long parking_id;

    @Column(name = "created_at", updatable = false, nullable = false)
    @JsonProperty("created_at")                         // Specifies the name of the field when serialized to JSON.
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @PrePersist                                         // method will be called before the entity is persisted.
    private void onCreate(){
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate                                          // method will be called before the entity is updated.
    private void onUpdate(){
        updatedAt = LocalDateTime.now();
    }
}
