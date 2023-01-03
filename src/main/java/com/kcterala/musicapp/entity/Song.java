package com.kcterala.musicapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long songId;

    private int totalRating;
    private float avgRating;
    private String songname;
    private LocalDate dateOfRelease;
    @OneToMany(mappedBy = "song", orphanRemoval = true)
    @JsonIgnore
    private List<Rating> rating;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "song_artist_table",
            joinColumns = @JoinColumn(name = "songId"),
            inverseJoinColumns = @JoinColumn(name = "artistId")
    )

    private Set<Artist> artists;

    public long getSongId() {
        return songId;
    }

    public void setSongId(long songId) {
        this.songId = songId;
    }

    public String getSongname() {
        return songname;
    }

    public void setSongname(String songname) {
        this.songname = songname;
    }

    public LocalDate getDateOfRelease() {
        return dateOfRelease;
    }

    public void setDateOfRelease(LocalDate dateOfRelease) {
        this.dateOfRelease = dateOfRelease;
    }
    @JsonIgnore
    public List<Rating> getRating() {
        return rating;
    }

    public void setRating(List<Rating> rating) {
        this.rating = rating;
    }

    public Set<Artist> getArtists() {
        return artists;
    }

    public void setArtists(Set<Artist> artists) {
        this.artists = artists;
    }

    public float getAvgRating() {
        this.avgRating = (float)getTotalRating() / getRating().size();
        return avgRating;
    }

    public int getTotalRating() {
        return getAllRatings();
    }

    public void setTotalRating(int totalRating) {
        this.totalRating = totalRating;
    }

    private int getAllRatings(){
        List<Rating> ratings = getRating();
        int sum = 0;
        for(Rating rating1 : ratings){
            sum += rating1.getRatingValue();
        }
        return sum;
    }
}
