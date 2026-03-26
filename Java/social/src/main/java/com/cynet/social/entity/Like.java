package com.cynet.social.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "likes",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"userId", "postId"})
        })
@Getter
@Setter
public class Like extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String postId;
}
