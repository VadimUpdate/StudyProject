package com.study.projectstudy.service

import com.study.projectstudy.Setting
import com.study.projectstudy.repository.SettingRepository
import org.springframework.stereotype.Service

@Service
class SettingService(private val settingRepository: SettingRepository) {

    fun getSettingByKey(key: String): Setting? {
        return settingRepository.findByKey(key)
    }

    fun save(setting: Setting): Setting {
        return settingRepository.save(setting)
    }

    fun getAllSettings(): List<Setting> {
        return settingRepository.findAll()
    }
}

