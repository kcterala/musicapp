package com.kcterala.musicapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private int ratingValue;
    @ManyToOne
    @JoinColumn(referencedColumnName = "songId")
    private Song song;
    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    @JsonIgnore
    private User user;
}
