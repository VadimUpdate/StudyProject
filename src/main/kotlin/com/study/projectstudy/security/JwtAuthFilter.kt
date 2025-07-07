    package com.study.projectstudy.security

    import jakarta.servlet.FilterChain
    import jakarta.servlet.ServletException
    import jakarta.servlet.http.HttpServletRequest
    import jakarta.servlet.http.HttpServletResponse
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
    import org.springframework.security.core.context.SecurityContextHolder
    import org.springframework.security.core.userdetails.UserDetailsService
    import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
    import org.springframework.stereotype.Component
    import org.springframework.web.filter.OncePerRequestFilter
    import java.io.IOException


    @Component
    class JwtAuthFilter(
        private val jwtUtil: JwtUtil,
        private val userDetailsService: UserDetailsService
    ) : OncePerRequestFilter() {

        @Throws(ServletException::class, IOException::class)
        override fun doFilterInternal(
            request: HttpServletRequest,
            response: HttpServletResponse,
            filterChain: FilterChain
        ) {
            // 1️⃣ Публичные маршруты — пропускаем без проверки токена
            val path = request.servletPath
            if (path.startsWith("/api/auth/register") || path.startsWith("/api/auth/login")) {
                filterChain.doFilter(request, response)
                return
            }

            // 2️⃣ Читаем заголовок Authorization
            val authHeader = request.getHeader("Authorization")
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                val token = authHeader.substring(7)
                // 3️⃣ Извлекаем username из токена
                val username = jwtUtil.getUsernameFromToken(token)

                // 4️⃣ Если пользователь ещё не аутентифицирован в контексте и username != null
                if (username != null && SecurityContextHolder.getContext().authentication == null) {
                    // Подгружаем из базы details
                    val userDetails = userDetailsService.loadUserByUsername(username)

                    // 5️⃣ Проверяем валидность токена
                    if (jwtUtil.validateToken(token)) {
                        // 6️⃣ Создаём объект аутентификации и ставим в контекст
                        val authToken = UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.authorities
                        )
                        authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                        SecurityContextHolder.getContext().authentication = authToken
                    }
                }
            }

            // 7️⃣ Передаём управление дальше по цепочке
            filterChain.doFilter(request, response)
        }
    }
