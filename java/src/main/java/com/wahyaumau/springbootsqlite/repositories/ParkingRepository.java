package com.wahyaumau.springbootsqlite.repositories;

import com.wahyaumau.springbootsqlite.entities.Parking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingRepository extends JpaRepository<Parking, Long> {
    List<Parking> findByNameContainingOrDescriptionContainingOrAddressContaining(String name, String description, String address);
}
// use name, description, or address contains the given string, to find a parking space