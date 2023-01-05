package com.kcterala.musicapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kcterala.musicapp.entity.Artist;
import com.kcterala.musicapp.entity.Rating;
import com.kcterala.musicapp.entity.Song;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
@Data
@Builder
public class SongResponse {
    private Song song;
    private int currRating;
}
