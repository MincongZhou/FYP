package com.wahyaumau.springbootsqlite.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "parking")
@Data
@NoArgsConstructor              // Automatic generation of no-argument constructors
@AllArgsConstructor             // Automatic generation all-argument constructors
public class Parking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)     // The primary key generation strategy is self-incrementing
    private long id;
    private String name;
    private String description;
    private String address;
    private String latitude;
    private String longitude;
    private String images;
    private String user_id;
    private String price_per_day;
    private String price_per_hour;
    private String standard; // parking standard
    @Column(nullable = false)
    private Date start_time;

    @Column(nullable = false)
    private Date end_time;
    private String to_access;
    private String size; // how big the parking space is, for example 12*12
    private String visible;

    @OneToMany(mappedBy = "parking")            // a parking lot can may have multiple reservations
    @JsonIgnoreProperties(value = {"parking", "parking_id"})
    List<Reserve> reserve = new ArrayList<>();

    @Column(name = "created_at", updatable = false, nullable = false)
    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", updatable = false, nullable = false)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @PrePersist                     // method will be called before the entity is persisted.
    private void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }


    @PreUpdate                      // method will be called before the entity is updated.
    private void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
