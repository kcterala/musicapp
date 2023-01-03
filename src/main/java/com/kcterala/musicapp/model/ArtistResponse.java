package com.kcterala.musicapp.model;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
public class ArtistResponse {
    private String name;
    private LocalDate dateOfBirth;
    private List<String> songs;
}
