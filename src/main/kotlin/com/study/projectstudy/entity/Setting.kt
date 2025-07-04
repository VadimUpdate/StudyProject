package com.study.projectstudy

import jakarta.persistence.*

@Entity
data class Setting(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    var value: String
)

