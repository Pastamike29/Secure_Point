
import { Javascript } from "@mui/icons-material";
import { CodeSnippets } from "../CodeSnippets";

export const getUserEnumerationCodeSnippets = (pageName: string): CodeSnippets => {
     switch (pageName) {
       case 'Lesson1':
         return {
           javascript: `function login(username, password) {
  // ตรวจสอบว่า ชื่อผู้ใช้ และ รหัสผ่านถูกต้องหรือไม่
  const user = getUserFromDatabase(username); // ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
  
  if (user && user.password === password) {
    // ถ้าข้อมูลถูกต้องให้เข้าสู่ระบบ
    return 'Login successful';
  } else {
    // ถ้าข้อมูลไม่ถูกต้องให้แสดงข้อความเดียวกันทั้งสองกรณี
    return 'Invalid username or password';
  }
}
`,
           python: `def login(username, password):
    # ตรวจสอบว่า ชื่อผู้ใช้ และ รหัสผ่านถูกต้องหรือไม่
    user = get_user_from_database(username)  # ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
    
    if user and user['password'] == password:
        # ถ้าข้อมูลถูกต้องให้เข้าสู่ระบบ
        return 'Login successful'
    else:
        # ถ้าข้อมูลไม่ถูกต้องให้แสดงข้อความเดียวกันทั้งสองกรณี
        return 'Invalid username or password'

# ฟังก์ชันสมมุติเพื่อดึงข้อมูลผู้ใช้
def get_user_from_database(username):
    # ตัวอย่างข้อมูลผู้ใช้
    users = {
        'admin': {'password': 'admin123'},
        'user1': {'password': 'user123'}
    }
    return users.get(username)
`,
           java: `public class LoginSystem {

    public static String login(String username, String password) {
        // ตรวจสอบว่า ชื่อผู้ใช้ และ รหัสผ่านถูกต้องหรือไม่
        User user = getUserFromDatabase(username);  // ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
        
        if (user != null && user.getPassword().equals(password)) {
            // ถ้าข้อมูลถูกต้องให้เข้าสู่ระบบ
            return "Login successful";
        } else {
            // ถ้าข้อมูลไม่ถูกต้องให้แสดงข้อความเดียวกันทั้งสองกรณี
            return "Invalid username or password";
        }
    }

    // ฟังก์ชันสมมุติเพื่อดึงข้อมูลผู้ใช้
    public static User getUserFromDatabase(String username) {
        // ตัวอย่างข้อมูลผู้ใช้
        if (username.equals("admin")) {
            return new User("admin", "admin123");
        } else if (username.equals("user1")) {
            return new User("user1", "user123");
        } else {
            return null;
        }
    }

    // คลาสผู้ใช้
    public static class User {
        private String username;
        private String password;

        public User(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }

    public static void main(String[] args) {
        System.out.println(login("admin", "admin123"));  // Login successful
        System.out.println(login("user1", "wrongpass")); // Invalid username or password
    }
}
`,
         };
       case 'Lesson2':
         return {
           javascript: `let loginAttempts = {};  // เก็บจำนวนการพยายามเข้าสู่ระบบ

function login(username, password) {
  const maxAttempts = 5;  // จำกัดจำนวนครั้งที่สามารถพยายามได้
  const lockTime = 30 * 1000;  // ล็อกการพยายามเป็นเวลา 30 วินาทีหลังจากพยายามครบจำนวน

  if (loginAttempts[username] && loginAttempts[username].attempts >= maxAttempts) {
    if (Date.now() - loginAttempts[username].lastAttempt < lockTime) {
      return 'Too many attempts. Please try again later.';
    } else {
      // รีเซ็ตการพยายามหลังจากเวลาผ่านไป
      loginAttempts[username] = { attempts: 0, lastAttempt: Date.now() };
    }
  }

  const user = getUserFromDatabase(username); // ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
  if (user && user.password === password) {
    loginAttempts[username] = { attempts: 0, lastAttempt: Date.now() }; // รีเซ็ตการพยายามเมื่อเข้าสู่ระบบสำเร็จ
    return 'Login successful';
  } else {
    // เพิ่มการพยายาม
    if (!loginAttempts[username]) {
      loginAttempts[username] = { attempts: 0, lastAttempt: Date.now() };
    }
    loginAttempts[username].attempts++;
    loginAttempts[username].lastAttempt = Date.now();
    return 'Invalid username or password';
  }
}
`,
           python: `import time

# เก็บจำนวนการพยายามเข้าสู่ระบบ
login_attempts = {}

def get_user_from_database(username):
    # ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
    users = {
        "user1": "password123",
        "user2": "password456"
    }
    return users.get(username)

def login(username, password):
    max_attempts = 5  # จำกัดจำนวนครั้งที่สามารถพยายามได้
    lock_time = 30  # ล็อกการพยายามเป็นเวลา 30 วินาทีหลังจากพยายามครบจำนวน (หน่วยเป็นวินาที)

    if username in login_attempts and login_attempts[username]['attempts'] >= max_attempts:
        if time.time() - login_attempts[username]['last_attempt'] < lock_time:
            return 'Too many attempts. Please try again later.'
        else:
            # รีเซ็ตการพยายามหลังจากเวลาผ่านไป
            login_attempts[username] = {'attempts': 0, 'last_attempt': time.time()}

    user_password = get_user_from_database(username)
    if user_password and user_password == password:
        login_attempts[username] = {'attempts': 0, 'last_attempt': time.time()}  # รีเซ็ตการพยายามเมื่อเข้าสู่ระบบสำเร็จ
        return 'Login successful'
    else:
        # เพิ่มการพยายาม
        if username not in login_attempts:
            login_attempts[username] = {'attempts': 0, 'last_attempt': time.time()}
        login_attempts[username]['attempts'] += 1
        login_attempts[username]['last_attempt'] = time.time()
        return 'Invalid username or password'

# ตัวอย่างการใช้งาน
print(login("user1", "password123"))  # Login successful
print(login("user1", "wrongpassword"))  # Invalid username or password
`,
           java: `import java.util.HashMap;
import java.util.Map;

public class LoginSystem {
    private static final Map<String, LoginAttempt> loginAttempts = new HashMap<>();

    private static final int MAX_ATTEMPTS = 5;  // จำกัดจำนวนครั้งที่สามารถพยายามได้
    private static final long LOCK_TIME = 30 * 1000;  // ล็อกการพยายามเป็นเวลา 30 วินาทีหลังจากพยายามครบจำนวน (มิลลิวินาที)

    public static void main(String[] args) {
        System.out.println(login("user1", "password123"));  // Login successful
        System.out.println(login("user1", "wrongpassword"));  // Invalid username or password
    }

    // ฟังก์ชันสมมุติในการดึงข้อมูลผู้ใช้จากฐานข้อมูล
    public static String getUserFromDatabase(String username) {
        Map<String, String> users = new HashMap<>();
        users.put("user1", "password123");
        users.put("user2", "password456");
        return users.get(username);
    }

    public static String login(String username, String password) {
        LoginAttempt attempt = loginAttempts.get(username);
        long currentTime = System.currentTimeMillis();

        if (attempt != null && attempt.getAttempts() >= MAX_ATTEMPTS) {
            if (currentTime - attempt.getLastAttempt() < LOCK_TIME) {
                return "Too many attempts. Please try again later.";
            } else {
                // รีเซ็ตการพยายามหลังจากเวลาผ่านไป
                loginAttempts.put(username, new LoginAttempt(0, currentTime));
            }
        }

        String userPassword = getUserFromDatabase(username);
        if (userPassword != null && userPassword.equals(password)) {
            loginAttempts.put(username, new LoginAttempt(0, currentTime));  // รีเซ็ตการพยายามเมื่อเข้าสู่ระบบสำเร็จ
            return "Login successful";
        } else {
            // เพิ่มการพยายาม
            if (attempt == null) {
                loginAttempts.put(username, new LoginAttempt(0, currentTime));
            }
            attempt = loginAttempts.get(username);
            attempt.setAttempts(attempt.getAttempts() + 1);
            attempt.setLastAttempt(currentTime);
            return "Invalid username or password";
        }
    }

    static class LoginAttempt {
        private int attempts;
        private long lastAttempt;

        public LoginAttempt(int attempts, long lastAttempt) {
            this.attempts = attempts;
            this.lastAttempt = lastAttempt;
        }

        public int getAttempts() {
            return attempts;
        }

        public void setAttempts(int attempts) {
            this.attempts = attempts;
        }

        public long getLastAttempt() {
            return lastAttempt;
        }

        public void setLastAttempt(long lastAttempt) {
            this.lastAttempt = lastAttempt;
        }
    }
}
`,
         };
   
      case 'Lesson3':
        return{
          javascript:`function login(username, password) {
  const user = getUserFromDatabase(username);  // ดึงข้อมูลจากฐานข้อมูล

  if (user && user.password === password) {
    // ถ้าข้อมูลรหัสผ่านถูกต้อง ให้ส่ง OTP
    const otp = generateOtp();  // ฟังก์ชันสมมุติในการสร้าง OTP
    sendOtpToUser(user.email, otp);  // ฟังก์ชันสมมุติในการส่ง OTP ไปยังอีเมล์ของผู้ใช้
    return 'Please enter the OTP sent to your email';
  } else {
    return 'Invalid username or password';
  }
}

function verifyOtp(userInputOtp) {
  // ตรวจสอบว่า OTP ที่ผู้ใช้ใส่มาถูกต้องหรือไม่
  const isValidOtp = checkOtp(userInputOtp);  // ฟังก์ชันในการตรวจสอบ OTP ที่ผู้ใช้กรอก
  if (isValidOtp) {
    return 'Login successful';
  } else {
    return 'Invalid OTP';
  }
}
`,
python:`import random
import smtplib

# ฟังก์ชันสมมุติในการดึงข้อมูลจากฐานข้อมูล
def get_user_from_database(username):
    # สำหรับตัวอย่างนี้จะใช้ข้อมูลสมมุติ
    return {"username": "user1", "password": "password123", "email": "user1@example.com"}

# ฟังก์ชันสมมุติในการสร้าง OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# ฟังก์ชันสมมุติในการส่ง OTP ไปยังอีเมล์
def send_otp_to_user(email, otp):
    print(f"Sending OTP {otp} to {email}")
    # ในการใช้งานจริงจะใช้บริการอีเมล์จริงๆ (เช่น smtplib)

# ฟังก์ชันตรวจสอบ OTP
def check_otp(user_input_otp):
    # ฟังก์ชันนี้จะตรวจสอบ OTP จริงๆ
    return user_input_otp == "123456"  # ตัวอย่าง OTP ที่ถูกต้อง

def login(username, password):
    user = get_user_from_database(username)
    if user and user['password'] == password:
        otp = generate_otp()
        send_otp_to_user(user['email'], otp)
        return 'Please enter the OTP sent to your email'
    else:
        return 'Invalid username or password'

def verify_otp(user_input_otp):
    is_valid_otp = check_otp(user_input_otp)
    if is_valid_otp:
        return 'Login successful'
    else:
        return 'Invalid OTP'

# ตัวอย่างการใช้งาน
print(login("user1", "password123"))  # เริ่มต้นกระบวนการเข้าสู่ระบบ
print(verify_otp("123456"))  # ตรวจสอบ OTP
`,
java:`import java.util.Random;

public class Main {

    // ฟังก์ชันสมมุติในการดึงข้อมูลจากฐานข้อมูล
    public static User getUserFromDatabase(String username) {
        // สำหรับตัวอย่างนี้จะใช้ข้อมูลสมมุติ
        if (username.equals("user1")) {
            return new User("user1", "password123", "user1@example.com");
        }
        return null;
    }

    // ฟังก์ชันสมมุติในการสร้าง OTP
    public static String generateOtp() {
        Random rand = new Random();
        return String.format("%06d", rand.nextInt(1000000));
    }

    // ฟังก์ชันสมมุติในการส่ง OTP ไปยังอีเมล์
    public static void sendOtpToUser(String email, String otp) {
        System.out.println("Sending OTP " + otp + " to " + email);
        // ในการใช้งานจริงจะใช้บริการอีเมล์จริงๆ (เช่น JavaMail API)
    }

    // ฟังก์ชันตรวจสอบ OTP
    public static boolean checkOtp(String userInputOtp) {
        return userInputOtp.equals("123456");  // ตัวอย่าง OTP ที่ถูกต้อง
    }

    public static String login(String username, String password) {
        User user = getUserFromDatabase(username);
        if (user != null && user.getPassword().equals(password)) {
            String otp = generateOtp();
            sendOtpToUser(user.getEmail(), otp);
            return "Please enter the OTP sent to your email";
        } else {
            return "Invalid username or password";
        }
    }

    public static String verifyOtp(String userInputOtp) {
        boolean isValidOtp = checkOtp(userInputOtp);
        if (isValidOtp) {
            return "Login successful";
        } else {
            return "Invalid OTP";
        }
    }

    public static void main(String[] args) {
        // ตัวอย่างการใช้งาน
        System.out.println(login("user1", "password123"));  // เริ่มต้นกระบวนการเข้าสู่ระบบ
        System.out.println(verifyOtp("123456"));  // ตรวจสอบ OTP
    }
}

// คลาสที่ใช้เก็บข้อมูลผู้ใช้
class User {
    private String username;
    private String password;
    private String email;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
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