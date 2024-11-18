
import { CodeSnippets } from "../CodeSnippets";

export const getPasswordMismanagementCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `// ขั้นแรก: นำเข้าไลบรารีที่จำเป็น
const bcrypt = require('bcryptjs');  // ใช้ bcryptjs ในการแฮชรหัสผ่าน
const jwt = require('jsonwebtoken'); // ใช้ jsonwebtoken ในการสร้างและตรวจสอบ JWT

// ฟังก์ชันสำหรับการแฮชรหัสผ่าน
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);  // สร้าง Salt สำหรับการแฮช (10 รอบ)
    const hashedPassword = await bcrypt.hash(password, salt);  // แฮชรหัสผ่านด้วย Salt
    return hashedPassword;
}

// ฟังก์ชันสำหรับการตรวจสอบรหัสผ่าน
async function verifyPassword(storedHashedPassword, inputPassword) {
    const match = await bcrypt.compare(inputPassword, storedHashedPassword);  // เปรียบเทียบรหัสผ่านที่แฮชแล้ว
    return match;  // คืนค่าผลลัพธ์ว่าเหมือนกันหรือไม่
}

// ฟังก์ชันสำหรับการสร้าง JWT (Token) สำหรับการยืนยันตัวตน
function generateJWT(user) {
    const payload = {
        username: user.username,  // ข้อมูลที่ต้องการเก็บใน JWT
        role: user.role           // เช่น ชื่อผู้ใช้และบทบาท
    };

    // สร้าง JWT โดยใช้ Secret Key และกำหนดระยะเวลาในการหมดอายุของ Token
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });  // Token หมดอายุใน 1 ชั่วโมง
    return token;
}

// ตัวอย่างการใช้งาน
(async () => {
    const password = 'user1234';  // รหัสผ่านที่ผู้ใช้กรอก
    const hashedPassword = await hashPassword(password);  // แฮชรหัสผ่าน
    console.log('Hashed Password:', hashedPassword);  // แสดงผลรหัสผ่านที่แฮชแล้ว

    const inputPassword = 'user1234';  // รหัสผ่านที่ผู้ใช้กรอกสำหรับการตรวจสอบ
    const isValid = await verifyPassword(hashedPassword, inputPassword);  // ตรวจสอบรหัสผ่านที่แฮชแล้ว
    if (isValid) {
        console.log('Password is correct');
    } else {
        console.log('Password is incorrect');
    }

    // ตัวอย่างการสร้าง JWT (Token) สำหรับการยืนยันตัวตน
    const user = { username: 'user1', role: 'admin' };  // ข้อมูลผู้ใช้
    const token = generateJWT(user);  // สร้าง JWT
    console.log('Generated JWT Token:', token);  // แสดงผล JWT ที่สร้างขึ้น
})();
`,
           python: `import bcrypt
import jwt
import datetime

# Hashing a password with bcrypt
password = "my_secure_password"
salt = bcrypt.gensalt()
hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
print(f"Hashed Password: {hashed_password}")

# Verifying a password
password_check = "my_secure_password"
if bcrypt.checkpw(password_check.encode('utf-8'), hashed_password):
    print("Password matches!")
else:
    print("Invalid password")

# Creating a JWT token
secret_key = "my_secret_key"
payload = {
    "user_id": 123,
    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Expiration time
}

token = jwt.encode(payload, secret_key, algorithm="HS256")
print(f"JWT Token: {token}")

# Decoding the JWT token
try:
    decoded_token = jwt.decode(token, secret_key, algorithms=["HS256"])
    print(f"Decoded Token: {decoded_token}")
except jwt.ExpiredSignatureError:
    print("Token has expired")
except jwt.InvalidTokenError:
    print("Invalid token")
`,
           java: `import org.mindrot.jbcrypt.BCrypt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class AuthenticationExample {

    public static void main(String[] args) {
        // Hashing a password with bcrypt
        String password = "my_secure_password";
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        System.out.println("Hashed Password: " + hashedPassword);

        // Verifying the password
        String passwordToCheck = "my_secure_password";
        if (BCrypt.checkpw(passwordToCheck, hashedPassword)) {
            System.out.println("Password matches!");
        } else {
            System.out.println("Invalid password");
        }

        // Creating a JWT token
        String secretKey = "my_secret_key";
        String jwtToken = Jwts.builder()
                .setSubject("user123")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))  // 1 hour expiry
                .claim("user_id", 123)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        System.out.println("JWT Token: " + jwtToken);

        // Decoding the JWT token
        try {
            String decodedToken = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwtToken)
                    .getBody()
                    .getSubject();
            System.out.println("Decoded Token: " + decodedToken);
        } catch (Exception e) {
            System.out.println("Invalid or expired token");
        }
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ฟังก์ชันสำหรับการแฮชรหัสผ่าน
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);  // สร้าง Salt 10 รอบ
    const hashedPassword = await bcrypt.hash(password, salt);  // แฮชรหัสผ่าน
    return hashedPassword;
}

// ฟังก์ชันสำหรับการตรวจสอบรหัสผ่าน
async function verifyPassword(storedHashedPassword, inputPassword) {
    const match = await bcrypt.compare(inputPassword, storedHashedPassword);  // ตรวจสอบรหัสผ่านที่แฮชแล้ว
    return match;
}

// ฟังก์ชันสำหรับการสร้าง Token สำหรับการยืนยันตัวตน
function generateJWT(user) {
    const payload = {
        username: user.username,
        role: user.role
    };

    // สร้าง JWT โดยใช้ Secret Key (ในที่นี้คือ 'your_jwt_secret') และกำหนดระยะเวลาในการหมดอายุของ Token
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
}

// ตัวอย่างการใช้งาน
(async () => {
    // 1. การแฮชรหัสผ่านก่อนเก็บลงในฐานข้อมูล
    const password = 'user1234';
    const hashedPassword = await hashPassword(password);
    console.log('Hashed Password:', hashedPassword);

    // 2. การตรวจสอบรหัสผ่านที่ผู้ใช้กรอก
    const inputPassword = 'user1234';  // รหัสผ่านที่ผู้ใช้กรอก
    const isValid = await verifyPassword(hashedPassword, inputPassword);
    if (isValid) {
        console.log('Password is correct');
    } else {
        console.log('Password is incorrect');
    }

    // 3. การสร้าง JWT สำหรับการยืนยันตัวตน
    const user = { username: 'user1', role: 'admin' };
    const token = generateJWT(user);
    console.log('Generated JWT Token:', token);
})();
`,
           python: `import bcrypt
import jwt
from datetime import datetime, timedelta

# ฟังก์ชันสำหรับการแฮชรหัสผ่าน
def hash_password(password):
    salt = bcrypt.gensalt(rounds=10)  # สร้าง Salt 10 รอบ
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)  # แฮชรหัสผ่าน
    return hashed_password

# ฟังก์ชันสำหรับการตรวจสอบรหัสผ่าน
def verify_password(stored_hashed_password, input_password):
    match = bcrypt.checkpw(input_password.encode('utf-8'), stored_hashed_password)  # ตรวจสอบรหัสผ่านที่แฮชแล้ว
    return match

# ฟังก์ชันสำหรับการสร้าง Token สำหรับการยืนยันตัวตน
def generate_jwt(user):
    payload = {
        'username': user['username'],
        'role': user['role'],
        'exp': datetime.utcnow() + timedelta(hours=1)  # ตั้งระยะเวลาในการหมดอายุของ Token (1 ชั่วโมง)
    }
    token = jwt.encode(payload, 'your_jwt_secret', algorithm='HS256')  # สร้าง JWT โดยใช้ Secret Key
    return token

# ตัวอย่างการใช้งาน
if __name__ == '__main__':
    # 1. การแฮชรหัสผ่านก่อนเก็บลงในฐานข้อมูล
    password = 'user1234'
    hashed_password = hash_password(password)
    print('Hashed Password:', hashed_password)

    # 2. การตรวจสอบรหัสผ่านที่ผู้ใช้กรอก
    input_password = 'user1234'  # รหัสผ่านที่ผู้ใช้กรอก
    is_valid = verify_password(hashed_password, input_password)
    if is_valid:
        print('Password is correct')
    else:
        print('Password is incorrect')

    # 3. การสร้าง JWT สำหรับการยืนยันตัวตน
    user = {'username': 'user1', 'role': 'admin'}
    token = generate_jwt(user)
    print('Generated JWT Token:', token)
')`,
           java: `import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.mindrot.jbcrypt.BCrypt;

public class AuthExample {

    // ฟังก์ชันสำหรับการแฮชรหัสผ่าน
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(10));  // แฮชรหัสผ่าน
    }

    // ฟังก์ชันสำหรับการตรวจสอบรหัสผ่าน
    public static boolean verifyPassword(String storedHashedPassword, String inputPassword) {
        return BCrypt.checkpw(inputPassword, storedHashedPassword);  // ตรวจสอบรหัสผ่านที่แฮชแล้ว
    }

    // ฟังก์ชันสำหรับการสร้าง Token สำหรับการยืนยันตัวตน
    public static String generateJWT(String username, String role) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiryDate = new Date(nowMillis + 3600000);  // ตั้งระยะเวลาในการหมดอายุของ Token (1 ชั่วโมง)

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, "your_jwt_secret")
                .compact();  // สร้าง JWT โดยใช้ Secret Key
    }

    public static void main(String[] args) {
        try {
            // 1. การแฮชรหัสผ่านก่อนเก็บลงในฐานข้อมูล
            String password = "user1234";
            String hashedPassword = hashPassword(password);
            System.out.println("Hashed Password: " + hashedPassword);

            // 2. การตรวจสอบรหัสผ่านที่ผู้ใช้กรอก
            String inputPassword = "user1234";  // รหัสผ่านที่ผู้ใช้กรอก
            boolean isValid = verifyPassword(hashedPassword, inputPassword);
            if (isValid) {
                System.out.println("Password is correct");
            } else {
                System.out.println("Password is incorrect");
            }

            // 3. การสร้าง JWT สำหรับการยืนยันตัวตน
            String username = "user1";
            String role = "admin";
            String token = generateJWT(username, role);
            System.out.println("Generated JWT Token: " + token);

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