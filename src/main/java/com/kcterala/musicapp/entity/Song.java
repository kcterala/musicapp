package com.kcterala.musicapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long songId;
    private String songname;
    private LocalDate dateOfRelease;
    @OneToOne
    @JoinColumn(referencedColumnName = "id")
    private Rating rating;
    @ManyToMany
    @JoinTable(
            name = "song_artist_table",
            joinColumns = @JoinColumn(name = "songId"),
            inverseJoinColumns = @JoinColumn(name = "artistId")
    )
    private Set<Artist> artists;

}
