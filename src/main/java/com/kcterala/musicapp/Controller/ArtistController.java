package com.kcterala.musicapp.Controller;

import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.entity.Song;
import com.kcterala.musicapp.model.ArtistResponse;
import com.kcterala.musicapp.repository.ArtistRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(exposedHeaders = {"Authorization"})
@Log4j2
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

    @GetMapping
    public ResponseEntity<?> getArtists(){
        List<Artist> artistList = artistRepo.findAll();
        return new ResponseEntity<List<Artist>>(artistList, HttpStatus.OK);
    }

    @GetMapping("/top")
    public ResponseEntity<?> getTopArtists(){
        List<Artist> artistList = artistRepo.findAll();

        artistList.sort(new Comparator<Artist>() {
            @Override
            public int compare(Artist o1, Artist o2) {
                Set<Song> songs1 = o1.getSongs();
                Set<Song> songs2 = o2.getSongs();
                int songsRatings1 = 0;
                int songsRatings2 = 0;
                for (Song song : songs1) {
                    songsRatings1 += song.getTotalRating();
                }
                for (Song song : songs2) {
                    songsRatings2 += song.getTotalRating();
                }

                return songsRatings2 - songsRatings1;
            }
        });
        List<ArtistResponse> artistResponseList = new ArrayList<>();
        for(Artist artist: artistList){
            List<String> songNames = new ArrayList<>();
            for(Song song :artist.getSongs()){
                songNames.add(song.getSongname());
            }
            ArtistResponse artistResponse = new ArtistResponse();
            artistResponse.setName(artist.getArtistName());
            artistResponse.setDateOfBirth(artist.getDateOfBirth());
            artistResponse.setSongs(songNames);
            artistResponseList.add(artistResponse);
        }
        return new ResponseEntity<>(artistResponseList, HttpStatus.OK);
    }
}
