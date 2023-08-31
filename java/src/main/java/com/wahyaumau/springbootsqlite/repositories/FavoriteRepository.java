package com.wahyaumau.springbootsqlite.repositories;

import com.wahyaumau.springbootsqlite.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    // Customized Queries, returns information about all collections associated with a given user ID
    // The result of the query is a list, where each element is a Map containing information about the collection
    @Query("SELECT new map(f.id as id ,f.parking_id as parkingId, u.address as address, u.price_per_hour as price_per_hour, u.price_per_day as price_per_day, u.standard as standard, u.name as userName)\n" +
            "FROM Favorite f\n" +
            "INNER JOIN Parking u ON f.parking_id = u.id\n" +
            "WHERE f.user_id = :id")
    List<?> findAllByUser(long id);
}