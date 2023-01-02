package com.kcterala.musicapp.repository;

import com.kcterala.musicapp.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query("Select r from Rating r where r.song.songId = ?1 and r.user.id= ?2")
    Rating findByUserAndSong(long songid, long userid);

    @Query(value = "select r from Rating r group by r.song.songId order by avg(r.ratingValue) desc")
    List<Rating> getTopRatings();
}
