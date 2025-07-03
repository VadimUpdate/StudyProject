package com.study.projectstudy.repository

import com.study.projectstudy.Setting
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository



interface SettingRepository : JpaRepository<Setting, Long> {
    fun findByValue(value: Int): Setting?
}
