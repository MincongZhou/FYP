package com.wahyaumau.springbootsqlite.services;
import com.wahyaumau.springbootsqlite.entities.Favorite;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class FavoriteService {
    @Autowired
    private FavoriteRepository favoriteRepository;
    // Updating a Favorite entity
    public BaseResponse update(Long id, Favorite favorite) {
        favorite.setId(id);
        return new BaseResponse("200","", favoriteRepository.save(favorite));
    }
    // Save a new Favorite entity
    public BaseResponse save(Favorite favorite){
        return new BaseResponse("200","", favoriteRepository.save(favorite));
    }
    // Deleting a Favorite entity
    public BaseResponse delete(Long id) {
        favoriteRepository.deleteById(id);
        return new BaseResponse("200","" );
    }
    // Find all Favorite entities
    public BaseResponse findAll(long id) {
        return new BaseResponse("200","", favoriteRepository.findAllByUser(id));
    }
}
