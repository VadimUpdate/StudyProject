package com.study.projectstudy.repository

import com.study.projectstudy.Setting
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SettingRepository : JpaRepository<Setting, Long> {
    fun findByKey(key: String): Setting
}