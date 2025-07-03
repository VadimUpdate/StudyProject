package com.study.projectstudy.service

import com.study.projectstudy.Setting
import com.study.projectstudy.repository.SettingRepository
import org.springframework.stereotype.Service

@Service
class SettingService(private val settingRepository: SettingRepository) {

    fun getSettingByValue(value: Int): Setting? {
        return settingRepository.findFirstByValue(value)
    }

    fun getSettingById(id: Long): Setting? {
        return settingRepository.findById(id).orElse(null)
    }

    fun save(setting: Setting): Setting {
        return settingRepository.save(setting)
    }

    fun updateSettingById(id: Long, newValue: Int): Setting? {
        val setting = settingRepository.findById(id).orElse(null) ?: return null
        setting.value = newValue
        return settingRepository.save(setting)
    }
}

