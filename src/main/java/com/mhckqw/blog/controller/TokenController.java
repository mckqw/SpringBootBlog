package com.mhckqw.blog.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mhckqw.blog.model.User;
import com.mhckqw.blog.repository.UserRepository;

/**
 * A controller for the token resource.
 *
 */
@CrossOrigin(maxAge = 3600)
@RestController
public class TokenController {

	@Autowired
	JwtEncoder encoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/token")
	public ResponseEntity<Map<String, String>> token(Authentication authentication) {
		String scope = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(" "));
		String token = generateToken(authentication.getName(), scope);

		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
		Map<String, String> response = new HashMap<>();
		if (userRepository.findByUsername(user.getUsername()).isPresent()) {
			response.put("error", "Username already exists");
			return ResponseEntity.badRequest().body(response);
		}
		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			response.put("error", "Email already exists");
			return ResponseEntity.badRequest().body(response);
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		try {
			userRepository.save(user);
		} catch (Exception e) {
			response.put("error", e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}

		String token = generateToken(user.getUsername(), "USER");
		response.put("message", "User registered successfully");
		response.put("token", token);
		return ResponseEntity.ok(response);
	}

	private String generateToken(String subject, String scope) {
		Instant now = Instant.now();
		long expiry = 36000L;
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer("self")
				.issuedAt(now)
				.expiresAt(now.plusSeconds(expiry))
				.subject(subject)
				.claim("scope", scope)
				.build();
		return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}