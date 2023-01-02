package com.kcterala.musicapp.Controller;

import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.entity.Rating;
import com.kcterala.musicapp.entity.Song;
import com.kcterala.musicapp.entity.User;
import com.kcterala.musicapp.model.RatingRequest;
import com.kcterala.musicapp.model.SongRequest;
import com.kcterala.musicapp.repository.ArtistRepository;
import com.kcterala.musicapp.repository.RatingRepository;
import com.kcterala.musicapp.repository.SongRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(exposedHeaders = {"Authorization"})
@Log4j2
@RequestMapping("/song")
public class SongController {
    @Autowired
    private ArtistRepository artistRepo;
    @Autowired
    private SongRepository songRepo;
    @Autowired
    private RatingRepository ratingRepo;

    @PostMapping
    public ResponseEntity<?> createSong(@RequestBody SongRequest songRequest){
        ArrayList<Integer> ids = songRequest.getArtistIds();
        Set<Artist> artistSet = ids.stream().map(i -> artistRepo.findById(i.longValue()).orElse(null)).collect(Collectors.toSet());
        Song song = Song.builder()
                .artists(artistSet)
                .songname(songRequest.getSongname())
                .dateOfRelease(songRequest.getDateOfRelease())
                .build();

        song = songRepo.save(song);

        return new ResponseEntity<Song>(song, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSong(@PathVariable long id){
        return new ResponseEntity<Song>(songRepo.findById(id).orElse(null),HttpStatus.OK);
    }


    @PostMapping("/rate")
    public ResponseEntity<?> ratethesong(@RequestBody RatingRequest request, @AuthenticationPrincipal User user){
        Song song = songRepo.findById(request.getSongId()).orElseThrow(()->new RuntimeException("Song not found"));
        Rating oldRating = ratingRepo.findByUserAndSong(song.getSongId(),user.getId());
        if(oldRating!=null){
            oldRating.setRatingValue(request.getRatingValue());
            ratingRepo.save(oldRating);
            return new ResponseEntity<Long>(oldRating.getId(), HttpStatus.OK);
        }
        Rating rating = Rating.builder()
                .song(song)
                .ratingValue(request.getRatingValue())
                .user(user)
                .build();
        rating = ratingRepo.save(rating);
        song.setRating(rating);
        user.getRating().add(rating);
        return new ResponseEntity<Long>(rating.getId(), HttpStatus.OK);
    }



    @GetMapping("/top")
    public ResponseEntity<?> getTopSongs(){
        List<Rating> ratings = ratingRepo.getTopRatings();
        List<Song> songs = new ArrayList<>();
        for(Rating rating : ratings){
            long songId = rating.getSong().getSongId();
            songs.add(songRepo.findById(songId).orElse(null));
        }

        return new ResponseEntity<>(songs,HttpStatus.OK);
    }
}
