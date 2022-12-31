package com.kcterala.musicapp.Controller;

import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.entity.Song;
import com.kcterala.musicapp.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getArtist(@PathVariable long id){
        Artist artist = artistRepo.findById(id).orElseThrow(()->new RuntimeException("Artist not found"));
        Set<Song> songSet = artist.getSongs();
        songSet.forEach(s-> System.out.println(s.getSongname()));
        return new ResponseEntity<Artist>(artist,HttpStatus.OK);
    }
}
