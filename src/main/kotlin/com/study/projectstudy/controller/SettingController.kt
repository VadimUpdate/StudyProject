package com.study.projectstudy.controller

import com.study.projectstudy.Setting
import com.study.projectstudy.service.SettingService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/settings")
class SettingController(private val settingService: SettingService) {


    @GetMapping
    fun getSetting(): Setting? {
        return settingService.getSettingByKey("site_title")
    }


    @PostMapping
    fun updateSetting(@RequestBody setting: Setting): Setting {
        return settingService.save(setting)
    }
}
