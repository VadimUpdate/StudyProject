package com.study.projectstudy.entity

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,  // Уникальный идентификатор пользователя (автоинкремент)

    @Column(unique = true, nullable = false)
    val username: String,  // Имя пользователя (уникальное, не null)

    @Column(nullable = false)
    val password: String   // Хешированный пароль (не null)
)
