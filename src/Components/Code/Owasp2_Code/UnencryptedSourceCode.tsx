
import { CodeSnippets } from "../../../Components/Code/CodeSnippets";

export const getUnencryptedCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `const express = require('express');
const app = express();

// Redirect ทุกการร้องขอจาก HTTP ไปยัง HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    next(); // ถ้าเป็น HTTPS ให้ดำเนินการต่อ
  } else {
    res.redirect('https://'$'{req.headers.host}'$'{req.url}'); // ถ้าเป็น HTTP ให้เปลี่ยนไปใช้ HTTPS
  }
});

app.listen(80, () => {
  console.log('Listening on port 80 and redirecting to HTTPS');
});

`,
           python: `from flask import Flask, redirect, request

app = Flask(__name__)

# Redirect all HTTP requests to HTTPS
@app.before_request
def redirect_to_https():
    if request.is_secure:
        return None  # If the request is already using HTTPS, do nothing
    else:
        # Redirect to HTTPS, preserving the original host and URL
        return redirect(f'https://{request.headers["Host"]}{request.path}', code=301)

if __name__ == '__main__':
    # Run the app on port 80 (HTTP), it will redirect to HTTPS
    app.run(host='0.0.0.0', port=80)
`,
           java: `import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.http.HttpStatus;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    // This bean filters all HTTP requests and redirects them to HTTPS
    @Bean
    public Filter redirectHttpToHttps() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
                // Check if the request is not secure (HTTP)
                if ("http".equalsIgnoreCase(request.getScheme())) {
                    // Redirect to HTTPS with the same host and URL path
                    String redirectUrl = "https://" + request.getServerName() + request.getRequestURI();
                    response.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
                    response.setHeader("Location", redirectUrl);
                } else {
                    filterChain.doFilter(request, response); // If already HTTPS, continue with the request
                }
            }
        };
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const crypto = require('crypto');

// เข้ารหัสข้อมูลก่อนส่ง
function encryptData(data) {
  const cipher = crypto.createCipher('aes-256-cbc', 'your-secret-key');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// การใช้งาน
const sensitiveData = 'password123';
const encryptedData = encryptData(sensitiveData);
console.log('Encrypted Data: ', encryptedData);

`,
           python: `from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import hashlib

# เข้ารหัสข้อมูลก่อนส่ง
def encrypt_data(data):
    # สร้างคีย์จาก 'your-secret-key' โดยใช้ SHA256 เพื่อให้คีย์มีขนาด 256 บิต
    key = hashlib.sha256('your-secret-key'.encode()).digest()
    
    # กำหนด IV (Initialization Vector) สำหรับ CBC mode ต้องมีขนาด 16 ไบต์
    iv = b'0123456789abcdef'  # ใช้ IV ขนาด 16 ไบต์ที่คงที่ (ในจริงควรสุ่มและส่งไปพร้อมกัน)

    # สร้าง cipher object ด้วย AES และโหมด CBC
    cipher = AES.new(key, AES.MODE_CBC, iv)

    # เข้ารหัสข้อมูลโดยใช้ Padding ที่ต้องการเพื่อให้ข้อมูลมีขนาดที่เหมาะสม
    encrypted = cipher.encrypt(pad(data.encode(), AES.block_size))

    # แปลงข้อมูลที่เข้ารหัสเป็นค่า hexadecimal (สตริง)
    return encrypted.hex()

# การใช้งาน
sensitive_data = 'password123'
encrypted_data = encrypt_data(sensitive_data)
print('Encrypted Data: ', encrypted_data)
`,
           java: `import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import java.security.MessageDigest;
import java.util.Base64;

public class EncryptionExample {
    // เข้ารหัสข้อมูลก่อนส่ง
    public static String encryptData(String data) throws Exception {
        // สร้างคีย์จาก 'your-secret-key' โดยใช้ SHA-256
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] key = digest.digest("your-secret-key".getBytes("UTF-8"));
        
        // กำหนด IV (Initialization Vector) สำหรับ CBC mode
        byte[] iv = new byte[16]; // ใช้ IV ขนาด 16 ไบต์ที่คงที่ (ในจริงควรสุ่ม)

        // สร้าง Cipher ด้วย AES และ CBC mode
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        IvParameterSpec ivParams = new IvParameterSpec(iv);
        SecretKey secretKey = new javax.crypto.spec.SecretKeySpec(key, "AES");

        // สร้าง cipher สำหรับการเข้ารหัส
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParams);
        
        // เข้ารหัสข้อมูล
        byte[] encryptedData = cipher.doFinal(data.getBytes("UTF-8"));
        
        // แปลงข้อมูลที่เข้ารหัสเป็น Base64 String
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    public static void main(String[] args) {
        try {
            String sensitiveData = "password123";
            String encryptedData = encryptData(sensitiveData);
            System.out.println("Encrypted Data: " + encryptedData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`,
         };
   
      
   
       default:
         return {
           javascript: `console.log('Directory Traversal default code');`,
         };
     }
   };