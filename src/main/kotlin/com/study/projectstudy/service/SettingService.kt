package com.study.projectstudy.service

import com.study.projectstudy.Setting
import com.study.projectstudy.repository.SettingRepository
import org.springframework.stereotype.Service

@Service
class SettingService(private val repository: SettingRepository) {
    fun getAll(): List<Setting> = repository.findAll()
    fun update(setting: Setting): Setting = repository.save(setting)
}

