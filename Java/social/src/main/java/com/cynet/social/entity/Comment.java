package com.cynet.social.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments",
        indexes = {
            @Index(name = "idx_post_id", columnList = "postId"),
                @Index(name = "idx_user_id", columnList = "userId")
        })
@Getter
@Setter
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private Long postId;
    private Long userId;

    @Column(length = 500)
    private String content;
}
