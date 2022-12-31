package com.kcterala.musicapp.Controller;

import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.entity.Song;
import com.kcterala.musicapp.model.SongRequest;
import com.kcterala.musicapp.repository.ArtistRepository;
import com.kcterala.musicapp.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/song")
public class SongController {
    @Autowired
    private ArtistRepository artistRepo;
    @Autowired
    private SongRepository songRepo;

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
}
