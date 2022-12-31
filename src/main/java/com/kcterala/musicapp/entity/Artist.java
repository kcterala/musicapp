package com.kcterala.musicapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDate;

import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long artistId;
    private String artistName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;
    private String bio;
    @ManyToMany(mappedBy = "artists")
    private Set<Song> songs;
}
