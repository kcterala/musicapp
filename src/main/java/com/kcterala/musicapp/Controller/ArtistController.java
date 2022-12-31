package com.kcterala.musicapp.Controller;

import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/artist")
public class ArtistController {
    @Autowired
    private ArtistRepository artistRepo;

    @PostMapping
    public ResponseEntity<?> createArtist(@RequestBody Artist artist){
        artist = artistRepo.save(artist);
        return new ResponseEntity<Long>(artist.getArtistId(), HttpStatus.OK);
    }

}
