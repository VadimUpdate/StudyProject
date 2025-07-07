package com.study.projectstudy.security

import com.study.projectstudy.entity.User
import com.study.projectstudy.repository.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {

    // Этот метод вызывается Spring Security для загрузки данных пользователя по имени
    override fun loadUserByUsername(username: String): UserDetails {
        // 1) Ищем пользователя в базе
        val user: User = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User '$username' not found")

        // 2) Преобразуем нашу сущность User в UserDetails, который понимает Spring
        val authorities: List<GrantedAuthority> = listOf(
            SimpleGrantedAuthority("ROLE_USER") // по умолчанию роль USER, можно расширить
        )

        return org.springframework.security.core.userdetails.User(
            user.username,
            user.password,
            authorities
        )
    }
}
