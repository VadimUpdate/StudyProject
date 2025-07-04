package com.study.projectstudy.repository

import com.study.projectstudy.Setting
import org.springframework.data.jpa.repository.JpaRepository

interface SettingRepository : JpaRepository<Setting, Long>
