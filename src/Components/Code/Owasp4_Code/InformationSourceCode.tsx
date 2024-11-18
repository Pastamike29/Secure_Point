
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getInformationLeakageCodeSnippet = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `try {
    // ตัวอย่างโค้ดที่อาจเกิดข้อผิดพลาด
    let result = someDatabaseQuery();
} catch (error) {
    // แสดงข้อความแสดงข้อผิดพลาดทั่วไปแทนที่จะเป็นข้อความที่มีข้อมูลสำคัญ
    console.error("Something went wrong. Please try again later.");
    // เก็บข้อผิดพลาดไว้ในระบบ log สำหรับการตรวจสอบในภายหลัง
    logError(error);
}
`,
           python: `try:
    # ตัวอย่างโค้ดที่อาจเกิดข้อผิดพลาด
    result = some_database_query()
except Exception as error:
    # แสดงข้อความแสดงข้อผิดพลาดทั่วไปแทนที่จะเป็นข้อความที่มีข้อมูลสำคัญ
    print("Something went wrong. Please try again later.")
    # เก็บข้อผิดพลาดไว้ในระบบ log สำหรับการตรวจสอบในภายหลัง
    log_error(error)
`,
           java: `try {
    // ตัวอย่างโค้ดที่อาจเกิดข้อผิดพลาด
    Object result = someDatabaseQuery();
} catch (Exception error) {
    // แสดงข้อความแสดงข้อผิดพลาดทั่วไปแทนที่จะเป็นข้อความที่มีข้อมูลสำคัญ
    System.out.println("Something went wrong. Please try again later.");
    // เก็บข้อผิดพลาดไว้ในระบบ log สำหรับการตรวจสอบในภายหลัง
    logError(error);
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `const crypto = require('crypto');

// ฟังก์ชั่นในการแฮชรหัสผ่าน
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex'); // สร้าง salt สำหรับการแฮช
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hashedPassword }; // ส่งกลับทั้ง salt และ hashed password
}

// ตัวอย่างการใช้
const password = 'mysecretpassword';
const { salt, hashedPassword } = hashPassword(password);

console.log('Salt:', salt);
console.log('Hashed Password:', hashedPassword);
`,
           python: `import hashlib
import os

# ฟังก์ชั่นในการแฮชรหัสผ่าน
def hash_password(password):
    # สร้าง salt ขนาด 16 ไบต์
    salt = os.urandom(16)
    # ใช้ pbkdf2_hmac ในการแฮชรหัสผ่าน โดยใช้ sha512
    hashed_password = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 1000)
    # แปลง salt และ hashed_password ให้อยู่ในรูปแบบ hex string
    return salt.hex(), hashed_password.hex()

# ตัวอย่างการใช้
password = 'mysecretpassword'
salt, hashed_password = hash_password(password)

print('Salt:', salt)
print('Hashed Password:', hashed_password)
`,
           java: `import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class PasswordHasher {
    // ฟังก์ชั่นในการแฮชรหัสผ่าน
    public static String[] hashPassword(String password) throws NoSuchAlgorithmException, InvalidKeySpecException {
        // สร้าง salt ขนาด 16 ไบต์
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        // ใช้ PBEKeySpec และ SecretKeyFactory ในการแฮชรหัสผ่านโดยใช้ sha512
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 1000, 512);
        SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        byte[] hashedPassword = skf.generateSecret(spec).getEncoded();

        // เข้ารหัส salt และ hashedPassword เป็น Base64 string สำหรับการจัดเก็บ
        String saltString = Base64.getEncoder().encodeToString(salt);
        String hashedPasswordString = Base64.getEncoder().encodeToString(hashedPassword);

        return new String[]{saltString, hashedPasswordString}; // คืนค่าทั้ง salt และ hashed password
    }

    public static void main(String[] args) {
        String password = "mysecretpassword";
        try {
            String[] result = hashPassword(password);
            System.out.println("Salt: " + result[0]);
            System.out.println("Hashed Password: " + result[1]);
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }
    }
}
`,
         };

         case 'Lesson3':
          return{
            Javascript:`function checkAccess(userRole, resource) {
    const accessControl = {
        'admin': ['user_data', 'system_logs', 'config'],
        'user': ['user_data']
    };

    // ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงข้อมูลหรือไม่
    if (accessControl[userRole] && accessControl[userRole].includes(resource)) {
        return true; // ให้เข้าถึงข้อมูลได้
    } else {
        return false; // ไม่อนุญาตให้เข้าถึง
    }
}

// ตัวอย่างการใช้
const userRole = 'user';
const resource = 'system_logs';

if (checkAccess(userRole, resource)) {
    console.log('Access granted');
} else {
    console.log('Access denied');
}
`,
python:`def check_access(user_role, resource):
    # Define access permissions for each role
    access_control = {
        'admin': ['user_data', 'system_logs', 'config'],
        'user': ['user_data']
    }
    
    # Check if the user's role has access to the specified resource
    if user_role in access_control and resource in access_control[user_role]:
        return True  # Access granted
    else:
        return False  # Access denied

# Example usage
user_role = 'user'
resource = 'system_logs'

if check_access(user_role, resource):
    print('Access granted')
else:
    print('Access denied')
`,
java:`import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AccessControl {

    public static boolean checkAccess(String userRole, String resource) {
        // Define access permissions for each role
        Map<String, List<String>> accessControl = new HashMap<>();
        accessControl.put("admin", List.of("user_data", "system_logs", "config"));
        accessControl.put("user", List.of("user_data"));

        // Check if the user's role has access to the specified resource
        if (accessControl.containsKey(userRole) && accessControl.get(userRole).contains(resource)) {
            return true; // Access granted
        } else {
            return false; // Access denied
        }
    }

    public static void main(String[] args) {
        String userRole = "user";
        String resource = "system_logs";

        if (checkAccess(userRole, resource)) {
            System.out.println("Access granted");
        } else {
            System.out.println("Access denied");
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