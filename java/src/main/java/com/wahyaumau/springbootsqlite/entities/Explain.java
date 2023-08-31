package com.wahyaumau.springbootsqlite.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "explain")                // Specifies the name of the table corresponding to this entity class
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Explain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // The primary key generation strategy is self-incrementing
    private Long id;

    @Column(nullable = false)
    private String issue;
    // Corresponds to a column in the database table that is not allowed to be null.
    @Column(nullable = false)
    private String answer;

    @Column(nullable = false)
    private String state;


    @Column(name = "created_at", updatable = false, nullable = false)
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @PrePersist                         // method will be called before the entity is persisted.
    private void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate                          // method will be called before the entity is updated.
    private void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
