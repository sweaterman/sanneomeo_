//package com.hikers.sanneomeo.security.jwt;
//
//import java.io.IOException;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//@RequiredArgsConstructor
//@Component
//public class JwtTokenFilter extends OncePerRequestFilter {
//
//    private final JwtTokenProvider jwtTokenProvider;
//
//    private final String excludeUrl = "/user/login/**";
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        //login 요청의 경우 다음 필터로
//        if ((request.getRequestURI()).equals(excludeUrl)) {
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        try{
//            String jwt = JwtTokenUtils.resolveAccessToken(request);
//            //유효할 경우
//            if(JwtTokenUtils.isValidToken(jwt)){
//                Authentication authentication = jwtTokenProvider.getAuthentication(jwt); // 정상 토큰이면 SecurityContext 저장
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            } else{ //만료된 경우
//                throw new BaseException(BaseResponseStatus.ACCESS_TOKEN_EXPIRED);
//            }
//        } catch (BaseException e){
//            request.setAttribute("exception", e.getStatus().name());
//        }
//        doFilter(request, response, filterChain);
//    }
//}
