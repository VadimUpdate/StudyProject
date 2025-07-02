package com.study.projectstudy

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class NumberEntity(
    @Id
    val id: Long,
    var number: Int
)
