package com.kcterala.musicapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int ratingValue;
    @OneToOne(mappedBy = "rating")
    private Song song;
    @OneToOne(mappedBy = "rating")
    private User user;
}
