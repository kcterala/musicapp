package com.kcterala.musicapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
@Data
public class SongRequest {
    private String songname;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfRelease;

    private ArrayList<Integer> artistIds;
}
