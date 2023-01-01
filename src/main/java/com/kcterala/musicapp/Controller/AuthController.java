package com.kcterala.musicapp.Controller;


import com.kcterala.musicapp.entity.User;
import com.kcterala.musicapp.model.AuthRequest;
import com.kcterala.musicapp.repository.UserRepository;
import com.kcterala.musicapp.utility.JwtTokenUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(exposedHeaders = {"Authorization"})
@Log4j2
public class AuthController {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
    @GetMapping("/hello")
    public String getHello(){
        return "Hello";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        log.info("Logging in");
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();
            user.setPassword(null);
            log.info("Login Successful");
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtTokenUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            log.error("Login Failed : BAD CREDENTIALS");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
        log.info("Registering the user");
        String password = passwordEncoder.encode(authRequest.getPassword());
        User user = User.builder()
                .password(password)
                .username(authRequest.getUsername())
                .build();

        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateJwt(@RequestParam String token){
        log.info("Validing Json web token...");
        UserDetails userDetails = userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(token)).orElse(null);
        return new ResponseEntity<Boolean>(jwtTokenUtil.validateToken(token,userDetails),HttpStatus.OK);
    }
}
