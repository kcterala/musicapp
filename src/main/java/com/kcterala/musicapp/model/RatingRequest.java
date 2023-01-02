package com.kcterala.musicapp.model;

import lombok.Data;

@Data
public class RatingRequest {
    private long songId;
    private int ratingValue;
}
