package com.study.projectstudy.service

import com.study.projectstudy.repository.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found: $username")

        return User.builder()
            .username(user.username)
            .password(user.password)
            .roles("USER") // или подтягивай роли из БД
            .build()
    }
}
