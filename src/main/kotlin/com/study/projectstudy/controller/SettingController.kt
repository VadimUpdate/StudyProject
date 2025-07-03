package com.study.projectstudy.controller

import com.study.projectstudy.Setting
import com.study.projectstudy.service.SettingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/settings")
class SettingController(private val settingService: SettingService) {

    @GetMapping
    fun getSetting(): ResponseEntity<Setting> {
        val setting = settingService.getSettingByValue(0)
        return setting?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }


    @GetMapping("/{id}")
    fun getSettingById(@PathVariable id: Long): Setting? {
        return settingService.getSettingById(id)
    }

    @PostMapping
    fun updateSetting(@RequestBody setting: Setting): Setting {
        return settingService.save(setting)
    }

    @PutMapping("/{id}")
    fun updateSetting(@PathVariable id: Long, @RequestBody newValue: Map<String, Int>): ResponseEntity<Setting> {
        val updated = settingService.updateSettingById(id, newValue["value"] ?: return ResponseEntity.badRequest().build())
        return updated?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()
    }
}
