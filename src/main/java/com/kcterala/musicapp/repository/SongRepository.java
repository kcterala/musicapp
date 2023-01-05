package com.kcterala.musicapp.repository;

import com.kcterala.musicapp.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {

    @Query(value = "select r.ratingValue from Rating r where r.song.songId = ?1 and r.user.id = ?" +
            "" +
            "2")
    int getRatingBySongAndUser(long songId,long userId);
}
