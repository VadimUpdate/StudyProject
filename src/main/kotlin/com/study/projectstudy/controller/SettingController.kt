package com.study.projectstudy.controller

import com.study.projectstudy.Setting
import com.study.projectstudy.service.SettingService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/settings")
class SettingController(private val service: SettingService) {

    @GetMapping
    fun getAll(): List<Setting> = service.getAll()

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody setting: Setting): Setting {
        return service.update(setting)
    }
}
