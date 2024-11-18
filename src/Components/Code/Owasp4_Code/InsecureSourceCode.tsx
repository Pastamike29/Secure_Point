
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getInsecureDesignCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const bcrypt = require('bcrypt');

// ตัวอย่างรหัสผ่านจากผู้ใช้
const password = 'user_password123';

// การเข้ารหัสรหัสผ่าน
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hashedPassword);

  // สามารถเก็บ hashedPassword ในฐานข้อมูลได้แทนรหัสผ่านที่ไม่ปลอดภัย
});


`,
           python: `import bcrypt

# ตัวอย่างรหัสผ่านจากผู้ใช้
password = "user_password123".encode('utf-8')

# การเข้ารหัสรหัสผ่าน
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt(10))
print("Hashed password:", hashed_password.decode('utf-8'))

# สามารถเก็บ hashed_password ในฐานข้อมูลได้แทนรหัสผ่านที่ไม่ปลอดภัย
`,
           java: `import org.mindrot.jbcrypt.BCrypt;

public class PasswordHashingExample {
    public static void main(String[] args) {
        // ตัวอย่างรหัสผ่านจากผู้ใช้
        String password = "user_password123";

        // การเข้ารหัสรหัสผ่าน
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt(10));
        System.out.println("Hashed password: " + hashedPassword);

        // สามารถเก็บ hashedPassword ในฐานข้อมูลได้แทนรหัสผ่านที่ไม่ปลอดภัย
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const otplib = require('otplib');

// สร้าง OTP จาก secret key ที่ปลอดภัย
const secret = otplib.authenticator.generateSecret();
const otp = otplib.authenticator.generate(secret);

console.log('Generated OTP:', otp);

// ตรวจสอบ OTP ที่ผู้ใช้ป้อน
const userOtp = '123456'; // ตัวอย่าง OTP ที่ผู้ใช้ป้อน

const isValid = otplib.authenticator.check(userOtp, secret);
if (isValid) {
  console.log('OTP is valid!');
} else {
  console.log('Invalid OTP!');
}


`,
           python: `import pyotp

# สร้าง OTP จาก secret key ที่ปลอดภัย
secret = pyotp.random_base32()
totp = pyotp.TOTP(secret)
otp = totp.now()

print("Generated OTP:", otp)

# ตรวจสอบ OTP ที่ผู้ใช้ป้อน
user_otp = '123456'  # ตัวอย่าง OTP ที่ผู้ใช้ป้อน

is_valid = totp.verify(user_otp)
if is_valid:
    print("OTP is valid!")
else:
    print("Invalid OTP!")
`,
           java: `import com.eatthepath.otp.TimeBasedOneTimePasswordGenerator;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

public class OTPExample {
    public static void main(String[] args) throws Exception {
        // สร้าง secret key ที่ปลอดภัย
        TimeBasedOneTimePasswordGenerator totp = new TimeBasedOneTimePasswordGenerator();
        KeyGenerator keyGenerator = KeyGenerator.getInstance(totp.getAlgorithm());
        keyGenerator.init(160); // สร้างคีย์ขนาด 160 บิต
        SecretKey secretKey = keyGenerator.generateKey();

        // สร้าง OTP
        String otp = Integer.toString(totp.generateOneTimePassword(secretKey, Instant.now()));
        System.out.println("Generated OTP: " + otp);

        // ตรวจสอบ OTP ที่ผู้ใช้ป้อน
        String userOtp = "123456"; // ตัวอย่าง OTP ที่ผู้ใช้ป้อน
        Instant now = Instant.now();
        String currentOtp = Integer.toString(totp.generateOneTimePassword(secretKey, now));

        if (userOtp.equals(currentOtp)) {
            System.out.println("OTP is valid!");
        } else {
            System.out.println("Invalid OTP!");
        }
    }
}
`,
         };
   
    case 'Lesson3':
      return{
        javascript:`const express = require('express');
const app = express();

// ตัวอย่าง middleware เพื่อตรวจสอบการเข้าสู่ระบบ
function authenticate(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // ตรวจสอบ token (สมมุติว่าเรามีการยืนยัน JWT หรือวิธีการอื่นๆ)
  if (token === 'valid_token') {
    next();  // ให้ดำเนินการต่อไปยัง route ถ้า token ถูกต้อง
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// การตั้งค่า route ที่ต้องการให้ผู้ใช้ที่ผ่านการยืนยันแล้วเท่านั้นสามารถเข้าถึง
app.get('/secure-data', authenticate, (req, res) => {
  res.json({ message: 'This is secured data' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
`,
python:`from flask import Flask, request, jsonify

app = Flask(__name__)

# ตัวอย่าง middleware เพื่อตรวจสอบการเข้าสู่ระบบ
def authenticate(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "No token provided"}), 403

        # ตรวจสอบ token (สมมติว่ามีการยืนยัน JWT หรือวิธีการอื่นๆ)
        if token == 'valid_token':
            return f(*args, **kwargs)
        else:
            return jsonify({"message": "Invalid token"}), 401
    wrapper.__name__ = f.__name__
    return wrapper

# การตั้งค่า route ที่ต้องการให้ผู้ใช้ที่ผ่านการยืนยันแล้วเท่านั้นสามารถเข้าถึง
@app.route('/secure-data', methods=['GET'])
@authenticate
def secure_data():
    return jsonify({"message": "This is secured data"})

if __name__ == '__main__':
    app.run(port=3000)
`,
java:`import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SpringBootApplication
public class SecureApplication {
    public static void main(String[] args) {
        SpringApplication.run(SecureApplication.class, args);
    }
}

// กำหนดการตั้งค่า Controller
@RestController
@RequestMapping("/secure-data")
class SecureController {

    @GetMapping
    public ResponseEntity<String> getSecureData() {
        return ResponseEntity.ok("This is secured data");
    }
}

// Middleware เพื่อตรวจสอบ token
@Component
class AuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = request.getHeader("Authorization");

        if (token == null) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.getWriter().write("{\"message\": \"No token provided\"}");
            return;
        }

        if ("valid_token".equals(token)) {
            filterChain.doFilter(request, response);  // ให้ดำเนินการต่อถ้า token ถูกต้อง
        } else {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("{\"message\": \"Invalid token\"}");
        }
    }
}
`
      }
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };