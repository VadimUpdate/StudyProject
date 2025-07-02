package com.study.projectstudy

import jakarta.persistence.*

@Entity
@Table(name = "setting")
data class Setting(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "key", nullable = false)
    val key: String = "",

    @Column(name = "value")
    var value: Int = 0
)
